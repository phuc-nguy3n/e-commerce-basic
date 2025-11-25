export default function renderProducts(products) {
  // 1. Dùng map để tạo mảng chuỗi HTML
  const productHTML = products
    .map((product) => {
      // 2. CHÈN CODE CỦA BẠN VÀO ĐÂY: Sử dụng Template Literal (dấu ``)
      return `
            <div class="product-item">
                <h2>${/* Tên sản phẩm */ product.name}</h2>
                <p>Giá: ${/* Giá sản phẩm */ product.price} VND</p>
                <button data-id="${
                  product.id
                }" class="add-to-cart-btn">Thêm vào giỏ</button>
            </div>
        `;
    })
    .join(""); // 3. Nối các chuỗi lại

  // Tìm container và chèn HTML (DOM Manipulation)
  const productListContainer = document.getElementById("product-list");

  // 💡 Tại sao dùng innerHTML? (Vì đây là lần đầu render)
  if (productListContainer) {
    productListContainer.innerHTML = productHTML;
  }
}
