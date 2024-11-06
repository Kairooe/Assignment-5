document.addEventListener('DOMContentLoaded', () => {
    // Function to handle image loading errors
    const handleImageError = (img) => {
        img.onerror = null; // Prevent infinite loop
        img.src = '/api/placeholder/300/400'; // Fallback to placeholder
        img.alt = 'Card image placeholder';
    };

    // Fetch featured cards HTML
    fetch('/api/featured-cards')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('featured-cards-container').innerHTML = html;
            // Add error handling for featured card images after they're inserted
            const featuredImages = document.querySelectorAll('#featured-cards-container img');
            featuredImages.forEach(img => {
                img.onerror = () => handleImageError(img);
            });
        })
        .catch(error => {
            console.error('Error loading featured cards:', error);
            document.getElementById('featured-cards-container').innerHTML = 
                '<div class="error-message">Error loading featured cards. Please try again later.</div>';
        });

    // Fetch full collection JSON
    fetch('/api/cards')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cards => {
            const container = document.getElementById('cards-container');
            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                
                // Create rarity class name
                const rarityClass = `rarity-${card.rarity.toLowerCase().replace(/\s+/g, '-')}`;
                
                // Build card HTML
                cardElement.innerHTML = `
                    <div class="card-image">
                        <img src="${card.image || '/api/placeholder/300/400'}" 
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
                container.appendChild(cardElement);
            });
        })
        .catch(error => {
            console.error('Error loading cards:', error);
            document.getElementById('cards-container').innerHTML = 
                '<div class="error-message">Error loading card collection. Please try again later.</div>';
        });

    // Optional: Add loading states
    const featuredContainer = document.getElementById('featured-cards-container');
    const cardsContainer = document.getElementById('cards-container');
    
    featuredContainer.innerHTML = '<div class="loading">Loading featured cards...</div>';
    cardsContainer.innerHTML = '<div class="loading">Loading collection...</div>';

    // Optional: Add sorting functionality
    const sortCards = (criteria) => {
        const container = document.getElementById('cards-container');
        const cards = Array.from(container.getElementsByClassName('card'));
        
        cards.sort((a, b) => {
            const valueA = a.querySelector(criteria).textContent;
            const valueB = b.querySelector(criteria).textContent;
            return valueA.localeCompare(valueB);
        });
        
        cards.forEach(card => container.appendChild(card));
    };

    // Optional: Add filtering functionality
    const filterCards = (criteria, value) => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardValue = card.querySelector(criteria).textContent.toLowerCase();
            card.style.display = cardValue.includes(value.toLowerCase()) ? 'block' : 'none';
        });
    };

    // Optional: Add search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search cards...';
    searchInput.className = 'search-input';
    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const cardName = card.querySelector('h3').textContent.toLowerCase();
            const cardSet = card.querySelector('.card-info p:first-child').textContent.toLowerCase();
            const isVisible = cardName.includes(searchValue) || cardSet.includes(searchValue);
            card.style.display = isVisible ? 'block' : 'none';
        });
    });

    // Insert search input before the featured cards section
    document.querySelector('#featured').insertBefore(searchInput, document.querySelector('#featured-cards-container'));
});