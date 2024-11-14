document.addEventListener('DOMContentLoaded', () => {
    const getImagePath = (cardName) => {
        return `/images/${cardName.replace(/\s+/g, '-')}.jpg`;
    };

    // Fetch Magic cards HTML
    fetch('/api/magic-cards')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            const container = document.getElementById('magic-container');
            container.innerHTML = html;

            // Update Magic card links with correct URLs
            const cardLinks = container.querySelectorAll('a');
            cardLinks.forEach((link, index) => {
                link.href = `/cardDetails.html?type=magic&id=${index}`;
            });
        })
        .catch(error => {
            console.error('Error loading magic cards:', error);
            document.getElementById('magic-container').innerHTML = 
                '<div class="error-message">Error loading magic cards. Please try again later.</div>';
        });

    // Fetch Pokemon cards JSON
    fetch('/api/pokemon-cards')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(cards => {
            const container = document.getElementById('pokemon-container');
            cards.forEach(card => {
                const cardLink = document.createElement('a');
                cardLink.href = `/cardDetails.html?type=pokemon&id=${card.id}`;
                cardLink.style.textDecoration = 'none';
                cardLink.style.color = 'inherit';

                const cardElement = document.createElement('div');
                cardElement.className = 'card';

                const rarityClass = `rarity-${card.rarity.toLowerCase().replace(/\s+/g, '-')}`;

                cardElement.innerHTML = `
                    <div class="card-image">
                        <img src="${getImagePath(card.name)}" 
                             alt="${card.name}"
                             loading="lazy"
                             onerror="this.onerror=null; this.src='/api/placeholder/300/400';">
                    </div>
                    <h3>${card.name}</h3>
                    <div class="card-info">
                        <p><span>Set:</span> ${card.set}</p>
                        <p><span>Condition:</span> ${card.condition}</p>
                        <p><span>Year:</span> ${card.year}</p>
                        <p><span>Cost:</span> ${card.cost}</p>
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
