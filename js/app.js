// js/app.js - File Khởi động Ứng dụng (Entry Point)

// 1. IMPORT CÁC MODULE CẦN THIẾT
import "./modules/componentLoader.js"; // Tự động tải mini-cart.html
import { products } from "./data.js";
import renderProducts from "./modules/product.js";
import {
  initCart, // <-- Import hàm khởi tạo
  addItemToCart,
  removeItemFromCart,
} from "./modules/cart.js";

/**
 * Thiết lập các trình lắng nghe sự kiện (Event Listeners) cho các nút tương tác.
 */
function setupEventListeners() {
  // A. Lắng nghe sự kiện cho các nút "Add to Cart" trên thẻ sản phẩm
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.currentTarget.dataset.id);
      addItemToCart(productId);
    });
  });

  // B. Lắng nghe sự kiện XÓA sản phẩm từ MINI-CART (Sử dụng Event Delegation)
  const cartDropdown = document.querySelector('.cart-dropdown');
  if (cartDropdown) {
      cartDropdown.addEventListener('click', (event) => {
          // Kiểm tra xem phần tử được click có phải là nút xóa hoặc icon bên trong nó không
          const removeButton = event.target.closest('.btn-remove');
          if (removeButton) {
              event.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
              const productId = parseInt(removeButton.dataset.id);
              if (productId) {
                  removeItemFromCart(productId);
              }
          }
      });
  }
}

// Hàm khởi động chính của ứng dụng
function initializeApp() {
  // 1. Hiển thị sản phẩm (nếu có container trên trang)
  renderProducts(products, "newArrivalsContainer");
  renderProducts(products, "shopContainer");

  // 2. Khởi tạo giỏ hàng (tải dữ liệu từ localStorage và render lần đầu)
  // Phải được gọi SAU KHI component loader đã chạy xong (DOMContentLoaded đảm bảo điều này)
  initCart();
  
  // 3. Thiết lập các trình lắng nghe sự kiện cho các nút
  setupEventListeners();
}

// Đảm bảo DOM đã tải xong hoàn toàn trước khi khởi chạy ứng dụng.
document.addEventListener("DOMContentLoaded", initializeApp);
