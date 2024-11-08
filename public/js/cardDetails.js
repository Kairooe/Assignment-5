document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');
    
    // Function to convert card name to image filename
    const getImagePath = (cardName) => {
        return `/images/${cardName.replace(/\s+/g, '-')}.jpg`;
    };

    fetch(`/api/card/${cardId}`)
        .then(response => response.json())
        .then(card => {
            const container = document.querySelector('.card-detail-container');
            const imagePath = getImagePath(card.name);
            
            container.innerHTML = `
                <div class="card-detail-image">
                    <img src="${imagePath}" 
                         alt="${card.name}"
                         onerror="this.onerror=null; this.src='/api/placeholder/300/400';">
                </div>
                <div class="card-detail-info">
                    <h2>${card.name}</h2>
                    <p><span>Set:</span> ${card.set}</p>
                    <p><span>Condition:</span> ${card.condition}</p>
                    <p><span>Year:</span> ${card.year}</p>
                    <p><span>Rarity:</span> ${card.rarity}</p>
                    <div class="card-detail-cost">
                        <span>Cost:</span> ${card.cost || 'Price not available'}
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error loading card details:', error);
            document.querySelector('.card-detail-container').innerHTML = 
                '<div class="error-message">Error loading card details. Please try again later.</div>';
        });
});