'use strict';

/* Mock Product Data */
const PRODUCTS = [
    {
        id: 1,
        title: 'Minimalist Watch',
        price: 129.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 2,
        title: 'Premium Headphones',
        price: 249.50,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 3,
        title: 'Classic Sunglasses',
        price: 89.00,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 4,
        title: 'Leather Bag',
        price: 45.00,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 5,
        title: 'Ceramic Coffee Mug',
        price: 24.99,
        category: 'Home',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 6,
        title: 'Travel Backpack',
        price: 79.99,
        category: 'Travel',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 7,
        title: 'Running Shoes',
        price: 110.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 8,
        title: 'Instax Camera',
        price: 69.95,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80'
    }
];

/* State */
let cart = [];

/* DOM Elements */
const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartOverlay = document.getElementById('cart-overlay');

/* Initialization */
function init() {
    renderProducts();
    setupEventListeners();
}

/* Render Products */
function renderProducts() {
    productGrid.innerHTML = PRODUCTS.map(product => `
        <article class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                        <i class="ri-shopping-cart-2-line"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

/* Cart Logic */
function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    openCart(); // Optional: Auto-open cart on add
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at index
    updateCartUI();
}

function updateCartUI() {
    // Update Count
    cartCount.innerText = cart.length;

    // Update Total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalPrice.innerText = '$' + total.toFixed(2);

    // Render Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your bag is empty.</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `).join('');
    }
}

/* Event Listeners */
function setupEventListeners() {
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Toggle Cart
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    
    // Close on overlay click
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) closeCart();
    });

    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your purchase! (Mock Checkout)');
        cart = []; // Clear cart
        updateCartUI();
        closeCart();
    });
}

function openCart() {
    cartOverlay.classList.add('open');
}

function closeCart() {
    cartOverlay.classList.remove('open');
}

// Global scope exposure for onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

// Start
document.addEventListener('DOMContentLoaded', init);
