document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-details-container');

    // Hent ID fra URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const productIdParam = urlParams.get('id');

    if (!productIdParam) {
        container.innerHTML = '<p>Ugyldig produkt-ID.</p>';
        return;
    }

    const productId = parseInt(productIdParam, 10);
    const allProducts = typeof getProducts === 'function' ? getProducts() : products;
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = '<p>Produktet ble ikke funnet.</p>';
        return;
    }

    // Oppdater sidetittel
    document.title = `${product.name} - Premium Russemerch`;

    // Bygg størrelse-options (hvis produktet ikke har sizes, gi en standard-option)
    let sizeOptionsHtml = '';
    const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['One Size'];
    sizes.forEach(size => {
        sizeOptionsHtml += `<option value="${size}">${size}</option>`;
    });

    const descHtml = product.description ? `<p class="product-detail-description">${product.description}</p>` : '';

    // Render HTML
    const html = `
        <div class="product-detail-image-wrapper">
            <img src="${product.imageUrl}" alt="${product.name}" class="product-detail-image">
        </div>
        <div class="product-detail-info">
            <div class="product-detail-category">${product.category}</div>
            <h1 class="product-detail-title">${product.name}</h1>
            <div class="product-detail-price">${product.price} kr</div>

            ${descHtml}

            <div class="product-options">
                <label for="size-select">Velg størrelse</label>
                <select id="size-select" class="product-size-select">
                    ${sizeOptionsHtml}
                </select>
            </div>

            <button id="add-to-cart-btn" class="btn btn-primary" style="max-width: 300px;">Legg i handlekurv</button>
        </div>
    `;

    container.innerHTML = html;

    // Legg til event listener for knappen
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const selectedSize = document.getElementById('size-select').value;
        // Vi bruker addToCart fra cart.js (som vi har utvidet til å støtte size)
        if (typeof window.addToCart === 'function') {
            window.addToCart(product.id, selectedSize);
        }
    });
});
