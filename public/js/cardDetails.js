document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.card-detail-container');
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const id = parseInt(urlParams.get('id'));

    if (type === 'magic') {
        try {
            // For magic cards - fetch from HTML
            const response = await fetch('/html/magic.html');
            const html = await response.text();
            
            // Create a temporary container to parse HTML
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            
            // Find the specific card
            const cardElement = tempContainer.querySelector(`a[href="/cardDetails.html?type=magic&id=${id}"]`);
            
            if (!cardElement) {
                container.innerHTML = '<p>Magic card not found</p>';
                return;
            }

            const cardInfo = {
                name: cardElement.querySelector('h3').textContent,
                image: cardElement.querySelector('img').src,
                set: cardElement.querySelector('.card-info p:nth-child(1)').textContent.split(':')[1].trim(),
                condition: cardElement.querySelector('.card-info p:nth-child(2)').textContent.split(':')[1].trim(),
                year: cardElement.querySelector('.card-info p:nth-child(3)').textContent.split(':')[1].trim(),
                rarity: cardElement.querySelector('.rarity-label').textContent
            };

            // Display the card details
            container.innerHTML = `
                <div class="card-detail">
                    <div class="card-detail-image">
                        <img src="${cardInfo.image}" alt="${cardInfo.name}" loading="lazy">
                    </div>
                    <div class="card-detail-info">
                        <h2>${cardInfo.name}</h2>
                        <div class="info-grid">
                            <p><strong>Set:</strong> ${cardInfo.set}</p>
                            <p><strong>Condition:</strong> ${cardInfo.condition}</p>
                            <p><strong>Year:</strong> ${cardInfo.year}</p>
                            <p><strong>Rarity:</strong> ${cardInfo.rarity}</p>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error loading magic card details:', error);
            container.innerHTML = '<p>Error loading magic card details</p>';
        }
    } else if (type === 'pokemon') {
        // For pokemon cards - fetch from JSON
        try {
            const response = await fetch('/data/pokemon.json');
            const cards = await response.json();
            
            const card = cards.find(c => c.id === id);
            
            if (!card) {
                container.innerHTML = '<p>Pokemon card not found</p>';
                return;
            }

            container.innerHTML = `
                <div class="card-detail">
                    <div class="card-detail-image">
                        <img src="/images/${card.image}" alt="${card.name}" loading="lazy">
                    </div>
                    <div class="card-detail-info">
                        <h2>${card.name}</h2>
                        <div class="info-grid">
                            <p><strong>Set:</strong> ${card.set}</p>
                            <p><strong>Condition:</strong> ${card.condition}</p>
                            <p><strong>Year:</strong> ${card.year}</p>
                            <p><strong>Rarity:</strong> ${card.rarity}</p>
                            <p><strong>Cost:</strong> ${card.cost}</p>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error loading pokemon card details:', error);
            container.innerHTML = '<p>Error loading pokemon card details</p>';
        }
    }
});