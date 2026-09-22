// Handlekurv logikk (Håndterer LocalStorage og Slide-in UI)

let cart = JSON.parse(localStorage.getItem('russemerch_cart')) || [];

// Funksjon for å oppdatere localStorage
function saveCart() {
    localStorage.setItem('russemerch_cart', JSON.stringify(cart));
    updateCartUI();
}

// Hjelpefunksjon for å generere en unik id for handlekurv-items
function getCartItemId(productId, size) {
    return size ? `${productId}-${size}` : `${productId}`;
}

// Funksjon for å legge til produkt i handlekurv
window.addToCart = function(productId, size = null) {
    // Bruk getProducts() hvis tilgjengelig, ellers fallback til products
    const productList = typeof getProducts === 'function' ? getProducts() : products;
    const product = productList.find(p => p.id === productId);
    if (!product) return;

    const cartItemId = getCartItemId(productId, size);
    const existingItem = cart.find(item => item.cartItemId === cartItemId || (item.id === productId && item.size === size));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            cartItemId: cartItemId, // Unik ID for kombinasjonen
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            size: size,
            quantity: 1
        });
    }

    saveCart();
    openCart(); // Åpne handlekurven automatisk når man legger til noe
};

// Funksjon for å fjerne et helt produkt fra kurven
window.removeFromCart = function(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId && item.id !== cartItemId);
    saveCart();
};

// Funksjon for å endre antall
window.updateQuantity = function(cartItemId, change) {
    const item = cart.find(item => item.cartItemId === cartItemId || item.id === cartItemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(item.cartItemId || item.id);
        } else {
            saveCart();
        }
    }
};

// UI: Åpne/lukke handlekurv
window.openCart = function() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.add('open');
};

window.closeCart = function() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.remove('open');
};

// Oppdater Handlekurv UI og Badge
function updateCartUI() {
    // 1. Oppdater Badge
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
        if (totalItems > 0) {
            badge.classList.add('visible');
        } else {
            badge.classList.remove('visible');
        }
    }

    // 2. Oppdater innhold i Sidebar
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');

    if (!cartItemsContainer || !cartTotalElement) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Handlekurven din er tom.</p>';
        cartTotalElement.innerText = '0 kr';
        return;
    }

    let html = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        const sizeText = item.size ? ` (Str: ${item.size})` : '';
        const idToUse = item.cartItemId ? `'${item.cartItemId}'` : item.id; // Fallback for gamle items

        html += `
            <div class="cart-item">
                <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}${sizeText}</div>
                    <div class="cart-item-price">${item.price} kr</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${idToUse}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${idToUse}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${idToUse})">Fjern</button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    cartTotalElement.innerText = `${totalPrice} kr`;
}

// Initialiser når DOM er klar
document.addEventListener('DOMContentLoaded', () => {
    // Pass på at alle gamle varer i localStorage får en cartItemId
    let needsSave = false;
    cart.forEach(item => {
        if (!item.cartItemId) {
            item.cartItemId = getCartItemId(item.id, item.size);
            needsSave = true;
        }
    });
    if (needsSave) saveCart();

    updateCartUI();

    // Legg til event listener for å lukke handlekurv ved klikk utenfor sidebar
    const overlay = document.getElementById('cart-overlay');
    if(overlay) {
        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) {
                closeCart();
            }
        });
    }
});