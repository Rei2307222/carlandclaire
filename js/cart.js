// Menambahkan produk ke keranjang
function addToCart(productName, productPrice, quantity, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; 
    const existingProductIndex = cart.findIndex(item => item.name === productName); 

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity, image: productImage });
    }

   
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Data keranjang disimpan: ", cart); 
}


function showCartPopup(product) {
    const cartPopup = document.querySelector('.cart-popup');
    if (!cartPopup) return;

    // Menampilkan data produk dalam pop-up
    document.getElementById('cart-product-name').textContent = product.name;
    document.getElementById('cart-product-price').textContent = product.price;
    document.getElementById('cart-product-image').src = product.image;
    document.getElementById('cart-quantity').textContent = `Jumlah: ${product.quantity}`;

    const subtotal = product.quantity * parseInt(product.price.replace(/[^\d]/g, '')); 
    document.getElementById('cart-subtotal').textContent = 'Rp ' + subtotal.toLocaleString();
    cartPopup.classList.add('active'); 
}


document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.querySelector('.add-to-cart');
    const quantityInput = document.getElementById('quantity');

    if (!addToCartButton || !quantityInput) return; 

    addToCartButton.addEventListener('click', function () {
        const productName = document.querySelector('.product-details h1').textContent || ''; 
        const productPrice = document.querySelector('.price').textContent || ''; 
        const productImage = document.getElementById('main-image').src || ''; 
        const quantity = parseInt(quantityInput.value) || 1; 

        const product = { name: productName, price: productPrice, image: productImage, quantity: quantity };

      
        addToCart(product.name, product.price, product.quantity, product.image);
        showCartPopup(product); 
    });

    // Event untuk menutup pop-up
    document.querySelector('.cart-popup-close').addEventListener('click', function () {
        const cartPopup = document.querySelector('.cart-popup');
        if (cartPopup) cartPopup.classList.remove('active');
    });

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    if (cartContainer) { 
        if (cart.length > 0) {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>${item.price}</p>
                        <p>Jumlah: ${item.quantity}</p>
                    </div>
                `;
                cartContainer.appendChild(cartItem);
            });
        } else {
            cartContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
        }
    }

   
    document.getElementById('view-cart')?.addEventListener('click', function () {
        window.location.href = 'cart.html'; 
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const increaseBtn = item.querySelector('.quantity-controls .increase');
        const decreaseBtn = item.querySelector('.quantity-controls .decrease');
        const quantityDisplay = item.querySelector('.quantity-controls span');
        let quantity = parseInt(quantityDisplay.textContent);

        increaseBtn.addEventListener('click', function() {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateSubtotal(item); 
        });

        decreaseBtn.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateSubtotal(item); 
            }
        });
    });
});
function updateSubtotal(item) {
    const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('.quantity-controls span').textContent);
    const subtotal = price * quantity;
    const subtotalDisplay = document.querySelector('.cart-subtotal-row .subtotal');
    subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
}

function updateCartQuantity(change) {
    const quantityDisplay = document.getElementById('cart-quantity');
    const subtotalDisplay = document.getElementById('cart-subtotal');
    const productName = document.getElementById('cart-product-name').textContent;
    const productPrice = parseInt(document.getElementById('cart-product-price').textContent.replace(/[^\d]/g, ''));
    let currentQuantity = parseInt(quantityDisplay.textContent);
    let newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    quantityDisplay.textContent = newQuantity;
    const newSubtotal = productPrice * newQuantity;
    subtotalDisplay.textContent = 'Rp ' + newSubtotal.toLocaleString();
    updateCartProductQuantity(productName, newQuantity);
}
function updateCartProductQuantity(productName, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        cart[productIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Keranjang diperbarui:', cart);
    }
}
function showCartPopup(product) {
    const cartPopup = document.querySelector('.cart-popup');
    if (!cartPopup) return;
    document.getElementById('cart-product-name').textContent = product.name;
    document.getElementById('cart-product-price').textContent = product.price;
    document.getElementById('cart-product-image').src = product.image;

    const quantityDisplay = document.getElementById('cart-quantity');
    quantityDisplay.textContent = product.quantity;

    const pricePerItem = parseInt(product.price.replace(/[^\d]/g, ''));
    const subtotalDisplay = document.getElementById('cart-subtotal');
    subtotalDisplay.textContent = 'Rp ' + (pricePerItem * product.quantity).toLocaleString();
    cartPopup.classList.add('active');
}