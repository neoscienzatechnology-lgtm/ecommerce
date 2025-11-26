/**
 * ModernShop - E-commerce JavaScript
 * Handles product loading, cart management, and UI interactions
 */

// ==========================================
// Cart State
// ==========================================
let cart = [];

// ==========================================
// DOM Elements
// ==========================================
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartCount = document.getElementById('cart-count');
const cartTotalValue = document.getElementById('cart-total-value');
const cartFooter = document.getElementById('cart-footer');
const checkoutBtn = document.getElementById('checkout-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ==========================================
// Initialize App
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCartFromStorage();
    setupEventListeners();
});

// ==========================================
// Event Listeners
// ==========================================
function setupEventListeners() {
    // Cart modal
    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Close cart with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal.classList.contains('active')) {
            closeCart();
        }
    });
}

// ==========================================
// Product Loading
// ==========================================
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error('Failed to load products');
        }
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-light);">
                <p>Erro ao carregar os produtos. Por favor, tente novamente mais tarde.</p>
            </div>
        `;
    }
}

function renderProducts(products) {
    productsGrid.innerHTML = products.map(product => `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Adicionar
                    </button>
                </div>
            </div>
        </article>
    `).join('');
    
    // Store products globally for cart operations
    window.products = products;
}

// ==========================================
// Cart Operations
// ==========================================
function addToCart(productId) {
    const product = window.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showToast(`${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

function updateCart() {
    saveCartToStorage();
    renderCart();
    updateCartCount();
    updateCartTotal();
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartEmpty.classList.add('active');
        cartFooter.style.display = 'none';
    } else {
        cartItems.style.display = 'block';
        cartEmpty.classList.remove('active');
        cartFooter.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div>
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">${formatPrice(item.price)}</p>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Diminuir quantidade">−</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Aumentar quantidade">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalValue.textContent = formatPrice(total);
}

// ==========================================
// Cart Modal
// ==========================================
function openCart() {
    cartModal.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartModal.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// Checkout
// ==========================================
function handleCheckout() {
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // In a real application, this would redirect to a checkout page
    // For this demo, we'll show a success message and clear the cart
    showToast('Pedido realizado com sucesso! Obrigado pela compra.');
    cart = [];
    updateCart();
    closeCart();
}

// ==========================================
// Mobile Menu
// ==========================================
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
}

// ==========================================
// Toast Notification
// ==========================================
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ==========================================
// Local Storage
// ==========================================
function saveCartToStorage() {
    localStorage.setItem('modernshop-cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('modernshop-cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCart();
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            cart = [];
        }
    }
}

// ==========================================
// Utility Functions
// ==========================================
function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
