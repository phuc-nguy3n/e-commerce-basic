import { products } from "../data.js";

// Biến trạng thái giỏ hàng (sẽ được tải từ Local Storage)
let cart = [];

const CART_STORAGE_KEY = "ecom_cart_items"; // 💡 Nên dùng biến hằng số để tránh lỗi chính tả

/**
 * 💾 Lưu trạng thái giỏ hàng hiện tại vào Local Storage.
 */
export function saveCart() {
  // 1. Chuyển đổi mảng 'cart' (Array) thành chuỗi JSON (String)
  const cartDataString = JSON.stringify(cart);

  // 2. Lưu chuỗi dữ liệu đó vào Local Storage
  localStorage.setItem(CART_STORAGE_KEY, cartDataString);

  console.log("Giỏ hàng đã được lưu vào Local Storage.");
}

export function loadCart() {
  // 1. Lấy chuỗi dữ liệu giỏ hàng từ Local Storage
  const cartDataString = localStorage.getItem(CART_STORAGE_KEY);

  // 2. Xử lý dữ liệu
  // Nếu cartDataString là NULL (chưa có gì được lưu), chúng ta sẽ trả về mảng rỗng []
  // Nếu có dữ liệu, chúng ta dùng JSON.parse để chuyển đổi.
  if (cartDataString) {
    // CHUYỂN ĐỔI CHUỖI JSON SANG MẢNG JS BẰNG PHƯƠNG THỨC JSON.parse()
    cart = JSON.parse(cartDataString);
  } else {
    // TRẢ VỀ MẢNG RỖNG NẾU KHÔNG CÓ DỮ LIỆU
    cart = [];
  }

  return cart;
}

// 💡 Hàm khởi tạo giỏ hàng: Cần gọi loadCart() ngay lập tức
loadCart();

export function addItemToCart(productId) {
  // 1. Tìm kiếm sản phẩm trong giỏ hàng hiện tại (cart)
  const existingItem = cart.find((item) => item.id === productId);

  // 2. Quyết định: Cập nhật hay Thêm mới?
  if (existingItem) {
    // Nếu đã có: Tăng số lượng
    existingItem.quantity++;
  } else {
    // Nếu chưa có: Thêm sản phẩm mới vào giỏ
    const productDetails = products.find((product) => product.id === productId);

    // Đối tượng mới tối thiểu cần có ID, và số lượng (quantity: 1)
    cart.push({
      ...productDetails,
      // Cần thêm các thuộc tính khác như name, price, v.v. để hiển thị
      quantity: 1,
    });
  }

  // 3. Lưu trạng thái mới vào Local Storage
  saveCart();
  updateCartDisplay();
}

/**
 * Cập nhật giao diện Giỏ hàng (số lượng item).
 */
export function updateCartDisplay() {
  //  Tính tổng số lượng sản phẩm
  const totalQuantity = cart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  // Cập nhật danh sách sản phẩm trong giỏ hàng (Giả sử có element id='cart-list')
  const cartListContainer = document.getElementById("cart-list");
  if (cartListContainer) {
    cartListContainer.innerHTML = renderCartItems();
  }

  // Cập nhật giao diện (Giả sử có element id='cart-count')
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }

  // Cập nhật tổng tiền
  const cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
    const cartTotal = cart.reduce((accumulator, item) => {
      // Giá trị cần trả về là: TỔNG TIỀN ĐÃ TÍCH LŨY + (item.price * item.quantity)
      return accumulator + item.price * item.quantity;
    }, 0);
    cartTotalElement.textContent = cartTotal.toLocaleString("vi-VN") + " VND";
  }
}

updateCartDisplay();

/**
 * Xóa một sản phẩm khỏi giỏ hàng.
 * @param {number} productId - ID sản phẩm cần xóa.
 */
export function removeItemFromCart(productId) {
  // 1. Lọc mảng 'cart' để loại bỏ sản phẩm có ID trùng khớp.
  cart = cart.filter((item) => item.id !== productId);

  // 2. Lưu trạng thái mới
  saveCart();

  // 3. Cập nhật giao diện
  updateCartDisplay();
}

/**
 * Tạo chuỗi HTML cho danh sách sản phẩm trong giỏ hàng.
 */
function renderCartItems() {
  // Nếu giỏ hàng rỗng, hiển thị thông báo.
  if (cart.length === 0) {
    return '<p class="cart-empty-message">Giỏ hàng của bạn đang trống.</p>';
  }

  // Dùng map để chuyển đổi mảng giỏ hàng sang mảng chuỗi HTML
  return cart
    .map((item) => {
      // Tính tổng tiền cho từng sản phẩm (subtotal)
      const subtotal = item.price * item.quantity;

      return `
            <div class="cart-item" data-id="${item.id}">
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">Số lượng: ${item.quantity}</span>
                <span class="item-price">Giá: ${subtotal.toLocaleString(
                  "vi-VN"
                )} VND</span>
                <button class="remove-item-btn" data-id="${
                  item.id
                }">Xóa</button>
            </div>
        `;
    })
    .join(""); // Nối mảng chuỗi HTML lại
}

export function updateCartQuantity(productId, quantity) {
  /* ... */
}
