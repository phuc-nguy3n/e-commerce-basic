/**
 * Product Schema (Giả định):
 * {
 * id: string,
 * name: string,
 * category: string,
 * price: number,
 * oldPrice: number | null,
 * isNew: boolean,
 * isSale: boolean,
 * images: string[], // [main_image_url, thumbnail_1, thumbnail_2, ...]
 * }
 */

/**
 * Render danh sách sản phẩm vào một container.
 * @param {Array<Object>} products - Mảng các đối tượng sản phẩm.
 * @param {string} containerId - ID của thẻ HTML container (ví dụ: 'newArrivalsContainer').
 */
export default function renderProducts(products, containerId) {
  // 1. Dùng map để tạo mảng chuỗi HTML
  const productHTML = products
    .map((product) => {
      // Xử lý hiển thị giá cũ và giá hiện tại
      const oldPriceHtml =
        product.isSale && product.oldPrice
          ? `<span class="old-price text-secondary text-decoration-line-through me-2">$${product.oldPrice.toFixed(
              2
            )}</span>`
          : "";

      // Xử lý badge (Ưu tiên SALE, sau đó là NEW)
      let badgeHtml = "";
      if (product.isSale) {
        badgeHtml = `<span class="sale-badge">SALE</span>`;
      } else if (product.isNew) {
        badgeHtml = `<span class="new-badge">NEW</span>`;
      }

      // 2. CHÈN CODE CỦA BẠN VÀO ĐÂY: Sử dụng Template Literal (dấu ``)
      // SỬ DỤNG CẤU TRÚC PRODUCT-CARD CHUẨN CỦA DỰ ÁN E-COMMERCE
      return `
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <a href="product-detail.html?id=${
                      product.id
                    }" class="text-decoration-none text-dark">
                        <div class="product-card">
                            <div class="product-image-container">
                                <img src="${
                                  product.images[0]
                                }" class="img-fluid" alt="${
        product.name
      }" onerror="this.onerror=null;this.src='https://placehold.co/400x400/CCCCCC/333333?text=No+Image';">
                                ${badgeHtml}
                                <div class="product-hover-overlay">
                                    <!-- Nút thêm vào giỏ hàng với data-id -->
                                    <button data-id="${
                                      product.id
                                    }" class="btn-action add-to-cart-btn"><i class="fas fa-shopping-cart"></i></button>
                                    <a href="#" class="btn-action"><i class="fas fa-heart"></i></a>
                                </div>
                            </div>
                            
                            <div class="product-info text-center mt-3">
                                <span class="product-category text-secondary">${
                                  product.category
                                }</span>
                                <h4 class="product-name">${product.name}</h4>
                                <p class="product-price">
                                    ${oldPriceHtml}
                                    <span class="current-price text-danger fw-bold">$${product.price.toFixed(
                                      2
                                    )}</span>
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
    })
    .join(""); // 3. Nối các chuỗi lại

  // Tìm container và chèn HTML (DOM Manipulation)
  const productListContainer = document.getElementById(containerId);

  // 💡 Tại sao dùng innerHTML? (Vì đây là lần đầu render)
  if (productListContainer) {
    // Thay thế toàn bộ nội dung trong container bằng các sản phẩm mới
    productListContainer.innerHTML = productHTML;
  } else {
    console.error(`Container with ID "${containerId}" not found.`);
  }
}
