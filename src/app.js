// Sjekk at getProducts funksjonen er tilgjengelig fra data.js
if (typeof getProducts === 'function') {

    // Funksjon for å generere HTML for et produktkort
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

    // Funksjon for å rendre de utvalgte produktene
    function renderFeaturedProducts() {
        const featuredContainer = document.getElementById('featured-products');

        if (!featuredContainer) {
            console.error('Kunne ikke finne beholderen for utvalgte produkter (#featured-products)');
            return;
        }

        // Hent alle produkter via getProducts()
        const allProducts = getProducts();

        // Hent de 3 første produktene
        const featuredProducts = allProducts.slice(0, 3);

        // Generer HTML og sett inn i containeren
        let html = '';
        featuredProducts.forEach(product => {
            html += createProductCard(product);
        });

        featuredContainer.innerHTML = html;
    }

    // Kjør funksjonen når DOM er lastet
    document.addEventListener('DOMContentLoaded', renderFeaturedProducts);

} else {
    console.error('getProducts-funksjonen ble ikke lastet riktig fra data.js');
}
