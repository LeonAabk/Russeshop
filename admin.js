document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    const productListContainer = document.getElementById('admin-product-list');

    // Funksjon for å oppdatere produktlisten i admin
    function renderAdminProductList() {
        if (!productListContainer) return;

        const allProducts = typeof getProducts === 'function' ? getProducts() : (typeof products !== 'undefined' ? products : []);

        if (allProducts.length === 0) {
            productListContainer.innerHTML = '<p>Ingen produkter funnet.</p>';
            return;
        }

        let html = '';
        allProducts.forEach(product => {
            html += `
                <div class="product-list-item">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img src="${product.imageUrl}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <div style="font-weight: bold;">${product.name}</div>
                            <div style="color: var(--text-secondary); font-size: 0.9rem;">${product.category} - ${product.price} kr</div>
                        </div>
                    </div>
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-secondary); background: var(--bg-color); padding: 5px 10px; border-radius: 20px;">ID: ${product.id}</span>
                    </div>
                </div>
            `;
        });

        productListContainer.innerHTML = html;
    }

    renderAdminProductList();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Hent verdier
            const name = document.getElementById('product-name').value;
            const price = parseInt(document.getElementById('product-price').value, 10);
            const category = document.getElementById('product-category').value;
            const desc = document.getElementById('product-desc').value;
            const imageUrl = document.getElementById('product-image').value;

            // Hent valgte størrelser
            const sizeCheckboxes = document.querySelectorAll('input[name="size"]:checked');
            const sizes = Array.from(sizeCheckboxes).map(cb => cb.value);

            // Generer ny ID (finn høyeste id og legg til 1)
            const currentProducts = typeof getProducts === 'function' ? getProducts() : (typeof products !== 'undefined' ? products : []);
            let maxId = 0;
            currentProducts.forEach(p => {
                if (p.id > maxId) maxId = p.id;
            });
            const newId = maxId + 1;

            const newProduct = {
                id: newId,
                name: name,
                price: price,
                category: category,
                description: desc,
                sizes: sizes,
                imageUrl: imageUrl
            };

            // Lagre i localStorage
            let customProducts = [];
            try {
                const stored = localStorage.getItem('customProducts');
                if (stored) {
                    customProducts = JSON.parse(stored);
                }
            } catch (err) {
                console.error("Error reading customProducts", err);
            }

            customProducts.push(newProduct);
            localStorage.setItem('customProducts', JSON.stringify(customProducts));

            // Reset form og oppdater liste
            form.reset();
            alert('Produktet ble lagt til!');
            renderAdminProductList();
        });
    }
});