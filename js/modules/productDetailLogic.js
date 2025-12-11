import { addItemToCart as addToCart } from "./cart.js";

/**
 * Render chi tiết sản phẩm vào container chính.
 * @param {Object} product - Đối tượng sản phẩm hiện tại.
 */
export function renderProductDetail(product) {
  const container = document.getElementById("productDetailContainer");
  if (container) {
    // Tạo HTML cho các ảnh thumbnail
    // Giả định product.images là một mảng các URL ảnh
    const thumbnailHTML = product.images
      .map(
        (image, index) => `
            <div class="col-3">
                <img
                    src="${image}"
                    class="img-thumbnail w-100 p-2 ${
                      index === 0 ? "active-thumb" : ""
                    }"
                    alt="Thumbnail ${index + 1}"
                    data-index="${index}"
                    style="cursor: pointer;"
                />
            </div>
        `
      )
      .join("");

    // Giá giả định: Cần trường oldPrice và discountPercent trong product data
    const oldPrice = product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : "";
    const discountPercent = product.discountPercent
      ? `${product.discountPercent}% Off`
      : "";

    // Tùy chọn kích thước giả định: Cần trường sizes là mảng ['S', 'M', 'L', 'XL'] trong product data
    const sizes = product.sizes || ["S", "M", "L", "XL"];
    const sizeOptionsHTML = sizes
      .map(
        (size, index) => `
            <span
                class="size-swatch border px-3 py-1 rounded ${
                  index === 1 ? "active-option" : ""
                }"
                data-size="${size}"
                style="cursor: pointer;"
                >${size}</span
            >
        `
      )
      .join("");

    container.innerHTML = `
            <div class="row gx-5">
                <!-- Cột 1 (lg-5): PRODUCT GALLERY -->
                <div class="col-lg-5 mb-5 mb-lg-0">
                    <div class="product-gallery">
                        <!-- Ảnh Chính (Main Image) -->
                        <div
                            class="main-image mb-4 border rounded"
                            style="padding: 20px"
                        >
                            <img
                                id="mainProductImage"
                                src="${product.images[0]}"
                                class="img-fluid w-100 rounded"
                                alt="${product.name} Main Image"
                            />
                        </div>

                        <!-- Ảnh Thumbnails (Gallery) -->
                        <div class="row g-3" id="productThumbnails">
                            ${thumbnailHTML}
                        </div>
                    </div>
                </div>

                <!-- Cột 2 (lg-7): PRODUCT INFO & ACTIONS -->
                <div class="col-lg-7">
                    <div class="product-info-details">
                        <h1 class="display-5 fw-bold mb-3">${product.name}</h1>

                        <!-- Đánh giá và SKU -->
                        <div class="d-flex align-items-center mb-3">
                            <div class="rating text-warning me-3">
                                <!-- Giả định: 4/5 sao -->
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span class="ms-2 text-secondary">(4 Reviews)</span>
                            </div>
                            <!-- Giả định SKU là product.id -->
                            <span class="text-secondary">SKU: ${product.id.toUpperCase()}</span> 
                        </div>

                        <!-- Giá -->
                        <div class="price-section mb-4">
                            <span class="current-price fs-2 fw-bold me-3 text-danger"
                                >$${product.price.toFixed(2)}</span
                            >
                            ${
                              oldPrice
                                ? `<span class="old-price text-secondary text-decoration-line-through fs-5">${oldPrice}</span>`
                                : ""
                            }
                            ${
                              discountPercent
                                ? `<span class="sale-percent text-success fw-bold ms-2">${discountPercent}</span>`
                                : ""
                            }
                        </div>

                        <!-- Mô tả ngắn -->
                        <p class="mb-4 text-secondary">
                            ${product.description}
                        </p>
                        
                        <!-- Tùy chọn Kích thước -->
                        <div class="product-options mb-4 pb-4 border-bottom">
                            <h6 class="fw-bold mb-2">
                                Size: <span class="selected-size text-dark" id="selectedSize">M</span>
                            </h6>
                            <div class="d-flex gap-2" id="sizeOptions">
                                ${sizeOptionsHTML}
                            </div>
                        </div>

                        <!-- Hành động: Số lượng và Nút -->
                        <div class="d-flex align-items-center mb-4">
                            <!-- Bộ điều chỉnh số lượng -->
                            <div
                                class="input-group quantity-input me-3"
                                style="width: 150px"
                            >
                                <button
                                    class="btn btn-outline-secondary"
                                    type="button"
                                    id="decreaseQuantity"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    class="form-control text-center"
                                    value="1"
                                    id="productQuantity"
                                    readonly
                                />
                                <button
                                    class="btn btn-outline-secondary"
                                    type="button"
                                    id="increaseQuantity"
                                >
                                    +
                                </button>
                            </div>

                            <!-- Nút Thêm vào giỏ hàng -->
                            <button class="btn btn-danger btn-lg me-3 btn-add-to-cart">
                                <i class="fas fa-shopping-cart me-2"></i> Add to Cart
                            </button>

                            <!-- Nút Thêm vào Yêu thích -->
                            <button class="btn btn-outline-secondary btn-lg btn-wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>

                        <!-- Shipping/Return Policy -->
                        <div class="mt-4 pt-4 border-top">
                             <p class="mb-1"><i class="fas fa-tag me-2 text-success"></i>Category: <strong>${
                               product.category
                             }</strong></p>
                             <p class="mb-1"><i class="fas fa-truck me-2 text-success"></i>Giao hàng miễn phí cho đơn trên $50</p>
                             <p class="mb-1"><i class="fas fa-undo me-2 text-primary"></i>Đổi trả trong 30 ngày</p>
                        </div>
                        
                        <!-- Social Share -->
                        <div class="social-share mt-4 pt-4 border-top">
                            <span class="fw-bold me-3">Share on:</span>
                            <a href="#" class="text-secondary me-3"
                                ><i class="fab fa-facebook-f"></i
                            ></a>
                            <a href="#" class="text-secondary me-3"
                                ><i class="fab fa-twitter"></i
                            ></a>
                            <a href="#" class="text-secondary"
                                ><i class="fab fa-instagram"></i
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Thêm logic tương tác cho gallery và quantity controls ngay sau khi render
    addInteractionListeners(product);
  }
}

/**
 * Thêm các listener cho gallery, bộ điều khiển số lượng và nút Add to Cart.
 * @param {Object} product - Đối tượng sản phẩm.
 */
function addInteractionListeners(product) {
  // Lấy các element cần thiết
  const quantityInput = document.getElementById("productQuantity");
  const increaseButton = document.getElementById("increaseQuantity");
  const decreaseButton = document.getElementById("decreaseQuantity");
  const sizeOptions = document.querySelectorAll("#sizeOptions .size-swatch");
  const selectedSizeDisplay = document.getElementById("selectedSize");
  const addToCartButton = document.getElementById("addToCartButton");
  const mainImage = document.getElementById("mainProductImage");
  const thumbnails = document.querySelectorAll("#productThumbnails img");

  let selectedSize = selectedSizeDisplay
    ? selectedSizeDisplay.textContent
    : "S";

  // 1. Gallery Interaction (Giữ nguyên)
  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        mainImage.src = this.src;
        thumbnails.forEach((t) => t.classList.remove("active-thumb"));
        this.classList.add("active-thumb");
      });
    });
  }

  // =========================================================================
  // 2. LOGIC TĂNG/GIẢM SỐ LƯỢNG SẢN PHẨM CHI TIẾT
  // =========================================================================
  if (quantityInput && increaseButton && decreaseButton) {
    const updateQuantity = (change) => {
      let currentVal = parseInt(quantityInput.value);
      let newVal = currentVal + change;

      // Đảm bảo số lượng không nhỏ hơn 1
      if (newVal >= 1) {
        quantityInput.value = newVal;
      } else {
        quantityInput.value = 1; // Giữ ở mức tối thiểu là 1
      }
    };

    // GẮN LISTENER CHO NÚT TĂNG
    increaseButton.addEventListener("click", () => updateQuantity(1));

    // GẮN LISTENER CHO NÚT GIẢM
    decreaseButton.addEventListener("click", () => updateQuantity(-1));
  }
  // =========================================================================

  // 3. Size Selection (Giữ nguyên)
  if (sizeOptions.length > 0) {
    sizeOptions.forEach((option) => {
      option.addEventListener("click", function () {
        sizeOptions.forEach((o) => o.classList.remove("active-option"));
        this.classList.add("active-option");

        selectedSize = this.getAttribute("data-size");
        if (selectedSizeDisplay) {
          selectedSizeDisplay.textContent = selectedSize;
        }
      });
    });
  }

  // 4. Add to Cart Logic (Gọi module giỏ hàng)
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value);

      // Gọi hàm thêm vào giỏ hàng với Quantity và Size đã chọn
      addToCart(product, quantity, selectedSize);

      // Hiệu ứng lắc
      const cartIcon = document.querySelector(".fa-shopping-cart").closest("a");
      if (cartIcon) {
        cartIcon.classList.add("shake-animation");
        setTimeout(() => {
          cartIcon.classList.remove("shake-animation");
        }, 500);
      }
    });
  }
}

/**
 * Tìm và render các sản phẩm liên quan.
 * Hiện tại, chỉ lọc theo Category.
 * @param {Object} currentProduct - Sản phẩm hiện tại.
 * @param {Array<Object>} allProducts - Toàn bộ danh sách sản phẩm.
 */
export function renderRelatedProducts(currentProduct, allProducts) {
  const relatedContainer = document.getElementById("relatedProductsContainer");

  // 1. Lọc các sản phẩm cùng Category, nhưng không phải chính nó
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.category === currentProduct.category && p.id !== currentProduct.id
    )
    .slice(0, 4); // Chỉ lấy tối đa 4 sản phẩm

  if (relatedContainer && relatedProducts.length > 0) {
    // Tái sử dụng logic render card sản phẩm nếu cần, hoặc tạo HTML đơn giản
    const relatedHTML = relatedProducts
      .map(
        (p) => `
            <div class="col-lg-3 col-md-6 col-sm-6 d-flex align-items-stretch">
                <a href="product-detail.html?id=${
                  p.id
                }" class="text-decoration-none text-dark w-100">
                    <div class="product-card text-center p-3">
                        <img src="${
                          p.images[0]
                        }" class="img-fluid rounded-3" alt="${
          p.name
        }" style="height: 200px; object-fit: cover;">
                        <h5 class="mt-3 mb-1">${p.name}</h5>
                        <p class="text-danger fw-bold">$${p.price.toFixed(
                          2
                        )}</p>
                    </div>
                </a>
            </div>
        `
      )
      .join("");

    relatedContainer.innerHTML = relatedHTML;
  } else if (relatedContainer) {
    relatedContainer.innerHTML = `<p class="text-center text-muted">Không có sản phẩm liên quan nào.</p>`;
  }
}
