document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.card-detail-container');
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const id = parseInt(urlParams.get('id'));

    if (type === 'magic') {
        try {
            const response = await fetch('/api/featured-cards');
            const html = await response.text();
            
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            
            const cardElement = tempContainer.querySelectorAll('a')[id];
            
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
        try {
            const response = await fetch('/api/cards');
            const cards = await response.json();
            const card = cards.find(c => c.id === id);

            if (!card) {
                container.innerHTML = '<p>Pokemon card not found</p>';
                return;
            }

            container.innerHTML = `
                <div class="card-detail">
                    <div class="card-detail-image">
                        <img src="/images/${card.name.replace(/\s+/g, '-')}.jpg" alt="${card.name}" loading="lazy">
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
