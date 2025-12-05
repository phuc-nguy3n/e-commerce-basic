// 1. Import các module cần thiết
import { updateBreadcrumb } from "./modules/breadcrumb.js";
import { products } from "./data.js";
import { renderProductDetail } from "./modules/productDetailLogic.js";

/**
 * Hàm khởi tạo chính của trang chi tiết sản phẩm.
 * Chạy khi DOM đã sẵn sàng.
 */
function initializeProductDetailPage() {
  // 1. Lấy ID sản phẩm từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Dữ liệu sản phẩm toàn cục từ data.js
  const allProducts = products || [];
  const product = allProducts.find((p) => p.id === productId);

  console.log("allProducts: ", allProducts);
  console.log("product: ", product);

  if (!product) {
    // Xử lý trường hợp không tìm thấy sản phẩm
    const container = document.getElementById("productDetailContainer");
    if (container) {
      container.innerHTML = `<h1 class="text-center text-danger">Không tìm thấy Sản phẩm có ID: ${productId}</h1>`;
    }
    return; // Dừng lại nếu không có sản phẩm
  }

  // 2. Cập nhật Breadcrumb (Sử dụng module riêng biệt)
  updateBreadcrumb(product);

  //   // 3. Render chi tiết sản phẩm (Sử dụng logic riêng biệt)
  //   // Tên hàm này được đặt là renderProductDetail, nhưng chúng ta sẽ đổi tên file logic.js ở bước 3.
  renderProductDetail(product);

  //   // 4. Render các sản phẩm liên quan (Sẽ phát triển sau)
  //   renderRelatedProducts(product, allProducts);
}

// Chạy hàm khởi tạo khi DOM đã load xong
document.addEventListener("DOMContentLoaded", initializeProductDetailPage);
