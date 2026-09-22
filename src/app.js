// Sjekk at products arrayet er tilgjengelig fra data.js
if (typeof products !== 'undefined') {

    // Funksjon for å generere HTML for et produktkort
    function createProductCard(product) {
        return `
            <div class="product-card">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price} kr</div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Legg i handlekurv</button>
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

        // Hent de 3 første produktene
        const featuredProducts = products.slice(0, 3);

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
    console.error('products-data ble ikke lastet riktig fra data.js');
}
