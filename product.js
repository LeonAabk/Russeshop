document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    // Hent ID fra URL
    const params = new URLSearchParams(window.location.search);
    const productIdStr = params.get('id');

    if (!productIdStr) {
        container.innerHTML = '<p>Produkt-ID mangler i URL.</p>';
        return;
    }

    const productId = parseInt(productIdStr, 10);
    const productList = typeof getProducts === 'function' ? getProducts() : (typeof products !== 'undefined' ? products : []);
    const product = productList.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = '<p>Fant ikke produktet.</p>';
        return;
    }

    // Bygg HTML for størrelser hvis tilgjengelig
    let sizesHtml = '';
    if (product.sizes && product.sizes.length > 0) {
        let options = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');
        sizesHtml = `
            <div style="margin-bottom: var(--spacing-sm);">
                <label for="size-select" style="display: block; margin-bottom: 5px; color: var(--text-secondary);">Velg størrelse:</label>
                <select id="size-select" style="padding: 10px; width: 100%; max-width: 200px; background-color: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--text-secondary); border-radius: var(--border-radius);">
                    ${options}
                </select>
            </div>
        `;
    }

    container.innerHTML = `
        <div style="flex: 1; min-width: 300px;">
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; border-radius: var(--border-radius); object-fit: cover;">
        </div>
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; justify-content: center;">
            <span style="color: var(--accent-color); font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${product.category}</span>
            <h1 style="font-size: 3rem; margin-bottom: var(--spacing-xs);">${product.name}</h1>
            <p style="font-size: 1.5rem; color: var(--text-secondary); margin-bottom: var(--spacing-md);">${product.price} kr</p>
            <p style="margin-bottom: var(--spacing-md); color: var(--text-secondary);">Dette er en premium vare designet spesielt for russetiden. Den tilbyr høy kvalitet, komfort og et unikt design.</p>

            ${sizesHtml}

            <button class="btn btn-primary" id="add-to-cart-btn" style="width: 100%; max-width: 300px;">Legg i handlekurv</button>
        </div>
    `;

    // Handle add to cart click
    const btn = document.getElementById('add-to-cart-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const sizeSelect = document.getElementById('size-select');
            const size = sizeSelect ? sizeSelect.value : null;
            if (typeof addToCart === 'function') {
                addToCart(product.id, size);
            } else {
                console.error("addToCart function is not defined.");
            }
        });
    }
});