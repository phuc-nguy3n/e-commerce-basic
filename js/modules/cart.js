import { products } from "../data.js";

// Trạng thái giỏ hàng, được quản lý nội bộ trong module
let cart = [];
const CART_STORAGE_KEY = "ecom_cart_items";

// =========================================================================
// HÀM NỘI BỘ (Private Functions)
// =========================================================================

/**
 * Render (vẽ) lại toàn bộ giao diện mini-cart dựa trên trạng thái `cart` hiện tại.
 */
function renderMiniCart() {
  const miniCartComponent = document.querySelector('.mini-cart');
  if (!miniCartComponent) {
    // Nếu component chưa được tải, không làm gì cả.
    // Việc này tránh lỗi xảy ra khi cart.js thực thi trước componentLoader.
    return;
  }

  // Lấy các element con bên trong component
  const itemsContainer = miniCartComponent.querySelector('.mini-cart-items-container');
  const cartFooter = miniCartComponent.querySelector('.mini-cart-footer');
  const totalElement = miniCartComponent.querySelector('#mini-cart-total');
  const cartCountBadge = document.querySelector('.cart-count'); // Badge số lượng trên icon

  // Reset container
  itemsContainer.innerHTML = '';

  if (cart.length === 0) {
    // 1. Nếu giỏ hàng trống
    itemsContainer.innerHTML = '<p class="text-center text-secondary my-3">Giỏ hàng của bạn đang trống</p>';
    cartFooter.style.display = 'none'; // Ẩn footer
    if (cartCountBadge) cartCountBadge.textContent = '0';
  } else {
    // 2. Nếu giỏ hàng có sản phẩm
    // Tạo HTML cho từng sản phẩm
    cart.forEach(item => {
      const itemHTML = `
        <div class="cart-item d-flex align-items-center mb-3 pb-3 border-bottom" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3" />
          <div class="cart-item-info flex-grow-1">
            <h6 class="mb-0 fs-6">${item.name}</h6>
            <small class="text-secondary">${item.quantity} &times; $${item.price.toFixed(2)}</small>
          </div>
          <a href="#" class="btn-remove text-danger" data-id="${item.id}">
             <i class="fas fa-times" data-id="${item.id}"></i>
          </a>
        </div>
      `;
      itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Tính toán và cập nhật tổng tiền
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalElement.textContent = `$${total.toFixed(2)}`;
    cartFooter.style.display = 'block'; // Hiển thị footer

    // Cập nhật badge số lượng
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) cartCountBadge.textContent = totalQuantity;
  }
}


/**
 * Lưu trạng thái giỏ hàng vào localStorage.
 */
function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Tải giỏ hàng từ localStorage.
 */
function loadCart() {
  const cartDataString = localStorage.getItem(CART_STORAGE_KEY);
  cart = cartDataString ? JSON.parse(cartDataString) : [];
}

// =========================================================================
// HÀM CÔNG KHAI (Public API) - Được export ra ngoài
// =========================================================================

/**
 * Khởi tạo giỏ hàng: tải dữ liệu và render lần đầu.
 * Hàm này sẽ được gọi từ app.js
 */
export function initCart() {
  loadCart();
  renderMiniCart();
}

/**
 * Thêm một sản phẩm vào giỏ hàng hoặc tăng số lượng nếu đã có.
 * @param {string} productId - ID của sản phẩm cần thêm.
 * @param {number} quantity - Số lượng sản phẩm cần thêm.
 */
export function addItemToCart(productId, quantity = 1) {
  const productData = products.find(p => p.id === productId);
  if (!productData) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.image,
      quantity: quantity,
    });
  }

  saveCart();
  renderMiniCart();
}

/**
 * Xóa một sản phẩm khỏi giỏ hàng.
 * @param {number} productId - ID của sản phẩm cần xóa.
 */
export function removeItemFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderMiniCart();
}

/**
 * Cập nhật số lượng của một sản phẩm. Nếu số lượng <= 0, xóa sản phẩm.
 * @param {number} productId - ID của sản phẩm cần cập nhật.
 * @param {number} change - Lượng thay đổi (+1 hoặc -1).
 */
export function updateItemQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            // Nếu số lượng là 0 hoặc ít hơn, xóa sản phẩm
            cart.splice(itemIndex, 1);
        }
    }
    saveCart();
    renderMiniCart();
}