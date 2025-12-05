/**
 * Product Schema:
 * {
 * id: string,
 * name: string,
 * category: string,
 * price: number,
 * oldPrice: number | null,
 * isNew: boolean,
 * isSale: boolean,
 * images: string[], // [main_image_url, thumbnail_1, thumbnail_2, ...]
 * description: string,
 * sku: string,
 * rating: number, // 1 - 5
 * }
 */

// Định nghĩa dữ liệu sản phẩm của bạn
export const products = [
  {
    id: "p001",
    name: "Floral Kirby Dress",
    category: "Women's Fashion",
    price: 329.1,
    oldPrice: 420.0,
    isNew: true,
    isSale: true,
    images: [
      "../assets/images/products/product-1.jpg",
      "../assets/images/products/product-2.jpg",
      "../assets/images/products/product-3.jpg",
    ],
    description:
      "Dolores sed ut tempora sit amet, consectetur adipiscing elit.",
    sku: "PD19010",
    rating: 4.5,
  },
  {
    id: "p002",
    name: "Open Knit Sweater",
    category: "Women's Fashion",
    price: 29.1,
    oldPrice: null,
    isNew: true,
    isSale: false,
    images: [
      "../assets/images/products/product-2.jpg",
      "../assets/images/products/product-3.jpg",
      "../assets/images/products/product-4.jpg",
    ],
    description:
      "Comfortable and stylish open knit design, perfect for any season.",
    sku: "PD19011",
    rating: 4.0,
  },
  {
    id: "p003",
    name: "Blue Solid Top",
    category: "Men's Fashion",
    price: 89.99,
    oldPrice: 120.0,
    isNew: true,
    isSale: true,
    images: [
      "../assets/images/products/product-3.jpg",
      "../assets/images/products/product-4.jpg",
      "../assets/images/products/product-1.jpg",
    ],
    description: "A classic blue top made from premium cotton fabric.",
    sku: "PD19012",
    rating: 5.0,
  },
  {
    id: "p004",
    name: "Slim Fit Trousers",
    category: "Men's Fashion",
    price: 85.0,
    oldPrice: null,
    isNew: true,
    isSale: false,
    images: [
      "../assets/images/products/product-4.jpg",
      "../assets/images/products/product-1.jpg",
      "../assets/images/products/product-2.jpg",
    ],
    description: "High quality slim fit trousers for a sharp look.",
    sku: "PD19013",
    rating: 4.5,
  },
];
