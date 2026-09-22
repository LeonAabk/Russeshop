// Sjekk at getProducts er tilgjengelig
if (typeof getProducts === 'function') {

    const shopContainer = document.getElementById('shop-products');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Gjenbruk funksjon for å lage produktkort (oppdatert med linker til produktside)
    function createProductCard(product) {
        return `
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                </a>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <a href="product.html?id=${product.id}">
                        <h3 class="product-title">${product.name}</h3>
                    </a>
                    <div class="product-price">${product.price} kr</div>
                    <button class="btn btn-primary" onclick="window.location.href='product.html?id=${product.id}'">Kjøp / Velg Størrelse</button>
                </div>
            </div>
        `;
    }

    // Render produkter basert på kategori
    function renderProducts(category = 'all') {
        if (!shopContainer) return;

        const allProducts = getProducts();
        let filteredProducts = allProducts;

        if (category !== 'all') {
            filteredProducts = allProducts.filter(p => p.category === category);
        }

        let html = '';
        if (filteredProducts.length === 0) {
            html = '<p style="grid-column: 1 / -1; text-align: center;">Ingen produkter funnet i denne kategorien.</p>';
        } else {
            filteredProducts.forEach(product => {
                html += createProductCard(product);
            });
        }

        shopContainer.innerHTML = html;
    }

    // Sett opp filter-knapper
    function setupFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Fjern active klasse fra alle
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Legg til active på klikket knapp
                button.classList.add('active');

                // Hent filter-verdi og render
                const filterValue = button.getAttribute('data-filter');
                renderProducts(filterValue);
            });
        });
    }

    // Init
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts(); // Render alle produkter ved start
        setupFilters();
    });

} else {
    console.error('getProducts-funksjonen ble ikke lastet riktig fra data.js');
}
