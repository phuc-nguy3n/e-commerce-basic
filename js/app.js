// js/app.js - File Khởi động Ứng dụng (Entry Point)

// 1. IMPORT CÁC MODULE CẦN THIẾT
import { products } from "./data.js"; // Named Import cho dữ liệu
import renderProducts from "./modules/product.js"; // Default Import cho hàm hiển thị
import { addItemToCart, removeItemFromCart } from "./modules/cart.js"; // Named Import cho chức năng Giỏ hàng

/**
 * Thiết lập các trình lắng nghe sự kiện (Event Listeners) cho các nút tương tác.
 */
function setupEventListeners() {
  // Lấy tất cả các nút 'Thêm vào giỏ'
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  // Lặp qua từng nút và gắn sự kiện click
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Lấy ID sản phẩm từ thuộc tính data-id
      const productId = parseInt(event.currentTarget.dataset.id);

      // Gọi hàm logic từ module Giỏ hàng
      addItemToCart(productId);
    });
  });

  // xóa item
  // Lấy ra phần tử cha (Delegation Point). Giả sử ID là 'cart-list'
  const cartListContainer = document.getElementById("cart-list");

  if (cartListContainer) {
    cartListContainer.addEventListener("click", (event) => {
      // Kiểm tra xem event.target CÓ PHẢI là nút xóa (.remove-item-btn) không
      if (event.target.classList.contains("remove-item-btn")) {
        // Lấy ID sản phẩm từ data-id của nút Xóa
        const productId = parseInt(event.target.dataset.id);

        // Gọi hàm logic xóa
        removeItemFromCart(productId);

        // Ngăn chặn hành vi mặc định (ví dụ: nếu nút là thẻ <a>)
        event.preventDefault();
      }
    });
  }
}

// Đảm bảo DOM đã tải xong trước khi thiết lập sự kiện
document.addEventListener("DOMContentLoaded", () => {
  // 2. KHỞI CHẠY ỨNG DỤNG
  // Đảm bảo hàm renderProducts được gọi trước để các nút tồn tại trong DOM
  renderProducts(products);

  // Sau khi sản phẩm được hiển thị, thiết lập trình lắng nghe
  setupEventListeners();
});
