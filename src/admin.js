document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    const productListContainer = document.getElementById('admin-product-list');

    // Funksjon for å rendre listen over alle produkter
    function renderProductList() {
        if (!productListContainer) return;

        const allProducts = typeof getProducts === 'function' ? getProducts() : defaultProducts;
        let html = '';

        allProducts.forEach(product => {
            html += `
                <div class="admin-list-item">
                    <img src="${product.imageUrl}" alt="${product.name}" class="admin-list-img">
                    <div class="admin-list-info">
                        <div class="admin-list-title">${product.name}</div>
                        <div class="admin-list-meta">${product.category} | ${product.price} kr | ID: ${product.id}</div>
                    </div>
                </div>
            `;
        });

        productListContainer.innerHTML = html;
    }

    // Håndter skjema-innsending
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Hent verdier
            const name = document.getElementById('p-name').value;
            const price = parseInt(document.getElementById('p-price').value, 10);
            const category = document.getElementById('p-category').value;
            const description = document.getElementById('p-desc').value;
            const imageUrl = document.getElementById('p-image').value;

            // Hent valgte størrelser
            const sizeCheckboxes = document.querySelectorAll('input[name="sizes"]:checked');
            const sizes = Array.from(sizeCheckboxes).map(cb => cb.value);

            // Validering
            if (sizes.length === 0) {
                alert("Vennligst velg minst én størrelse.");
                return;
            }

            // Hent eksisterende custom products for å finne neste ID
            let customProducts = [];
            try {
                const stored = localStorage.getItem('russemerch_custom_products');
                if (stored) customProducts = JSON.parse(stored);
            } catch (e) {
                console.error("Kunne ikke lese custom produkter", e);
            }

            // Generer en ny unik ID (tar utgangspunkt i default produktene og evt andre custom)
            const allProducts = getProducts();
            const maxId = allProducts.reduce((max, p) => (p.id > max ? p.id : max), 0);
            const newId = maxId + 1;

            // Opprett nytt produkt-objekt
            const newProduct = {
                id: newId,
                name: name,
                price: price,
                category: category,
                description: description,
                imageUrl: imageUrl,
                sizes: sizes
            };

            // Lagre i localStorage
            customProducts.push(newProduct);
            localStorage.setItem('russemerch_custom_products', JSON.stringify(customProducts));

            // Reset skjema
            form.reset();
            alert(`Suksess! "${newProduct.name}" er lagt til i butikken.`);

            // Oppdater listen visuelt
            renderProductList();
        });
    }

    // Init
    renderProductList();
});
