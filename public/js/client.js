document.addEventListener('DOMContentLoaded', () => {
    // Function to convert card name to image filename
    const getImagePath = (cardName) => {
        return `/images/${cardName.replace(/\s+/g, '-')}.jpg`;
    };

    // Fetch Magic cards HTML
    fetch('/api/featured-cards')
        .then(response => response.text())
        .then(html => {
            document.getElementById('magic-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading magic cards:', error);
            document.getElementById('magic-container').innerHTML = 
                '<div class="error-message">Error loading magic cards. Please try again later.</div>';
        });

    // Fetch Pokemon cards JSON
    fetch('/api/cards')
        .then(response => response.json())
        .then(cards => {
            const container = document.getElementById('pokemon-container');
            cards.forEach((card, index) => {
                const cardLink = document.createElement('a');
                cardLink.href = `/cardDetails.html?id=${index}`;
                cardLink.style.textDecoration = 'none';
                cardLink.style.color = 'inherit';

                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                
                const rarityClass = `rarity-${card.rarity.toLowerCase().replace(/\s+/g, '-')}`;
                const imagePath = getImagePath(card.name);
                
                cardElement.innerHTML = `
                    <div class="card-image">
                        <img src="${imagePath}" 
                             alt="${card.name}"
                             loading="lazy"
                             onerror="this.onerror=null; this.src='/api/placeholder/300/400';">
                    </div>
                    <h3>${card.name}</h3>
                    <div class="card-info">
                        <p><span>Set:</span> ${card.set}</p>
                        <p><span>Condition:</span> ${card.condition}</p>
                        <p><span>Year:</span> ${card.year}</p>
                        <div class="rarity-label ${rarityClass}">
                            ${card.rarity}
                        </div>
                    </div>
                `;
                
                cardLink.appendChild(cardElement);
                container.appendChild(cardLink);
            });
        })
        .catch(error => {
            console.error('Error loading pokemon cards:', error);
            document.getElementById('pokemon-container').innerHTML = 
                '<div class="error-message">Error loading pokemon card collection. Please try again later.</div>';
        });
});