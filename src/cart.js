// Handlekurv logikk (Håndterer LocalStorage og Slide-in UI)

let cart = JSON.parse(localStorage.getItem('russemerch_cart')) || [];

// Funksjon for å oppdatere localStorage
function saveCart() {
    localStorage.setItem('russemerch_cart', JSON.stringify(cart));
    updateCartUI();
}

// Funksjon for å legge til produkt i handlekurv
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        });
    }

    saveCart();
    openCart(); // Åpne handlekurven automatisk når man legger til noe
};

// Funksjon for å fjerne et helt produkt fra kurven
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
};

// Funksjon for å endre antall
window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
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

        html += `
            <div class="cart-item">
                <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} kr</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Fjern</button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    cartTotalElement.innerText = `${totalPrice} kr`;
}

// Initialiser når DOM er klar
document.addEventListener('DOMContentLoaded', () => {
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