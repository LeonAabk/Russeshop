// Sjekk at products arrayet er tilgjengelig fra data.js
if (typeof getProducts !== 'undefined' || typeof products !== 'undefined') {

    const productList = typeof getProducts === 'function' ? getProducts() : products;

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
                    <a href="product.html?id=${product.id}" class="btn btn-primary" style="text-align: center; display: block; margin-top: 10px;">Se produkt</a>
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
        const featuredProducts = productList.slice(0, 3);

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
