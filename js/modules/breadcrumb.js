/**
 * Cập nhật thanh Breadcrumb (Home > Shop > Category > Product Name).
 * Giả định Home và Shop đã có sẵn trong cấu trúc HTML.
 * @param {Object} product - Đối tượng sản phẩm hiện tại (có category và name).
 */
export function updateBreadcrumb(product) {
  const breadcrumbContainer = document.getElementById("productBreadcrumb");

  if (!breadcrumbContainer) {
    console.error("Breadcrumb container ID 'productBreadcrumb' not found.");
    return;
  }

  // Mục tiêu: Chỉ giữ lại các mục tĩnh (Home, Shop) và xóa các mục động đã có
  // Giả định Home là children[0] và Shop là children[1].
  // Xóa các mục từ vị trí 2 trở đi (Category, Product Name cũ)
  while (breadcrumbContainer.children.length > 2) {
    breadcrumbContainer.removeChild(breadcrumbContainer.lastChild);
  }

  //   1. Thêm Category (Link)
  //   const categoryItem = document.createElement("li");
  //   categoryItem.className = "breadcrumb-item";
  //   // Link Category đến trang shop, lọc theo category
  //   categoryItem.innerHTML = `<a href="shop.html?category=${product.category}" class="text-secondary text-decoration-none">${product.category}</a>`;
  //   breadcrumbContainer.appendChild(categoryItem);

  // 2. Thêm Product Name (Active/Current Page)
  const productItem = document.createElement("li");
  productItem.className = "breadcrumb-item active";
  productItem.setAttribute("aria-current", "page");
  productItem.textContent = product.name; // Không cần link
  breadcrumbContainer.appendChild(productItem);
}
