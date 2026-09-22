const products = [
  {
    id: 1,
    name: "Premium Russegenser",
    price: 699,
    category: "Gensere",
    sizes: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Premium+Genser"
  },
  {
    id: 2,
    name: "Streetwear Hoodie",
    price: 899,
    category: "Hettegensere",
    sizes: ["M", "L", "XL", "XXL"],
    imageUrl: "https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Streetwear+Hoodie"
  },
  {
    id: 3,
    name: "Classic Russebukse",
    price: 1099,
    category: "Bukser",
    sizes: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Russebukse"
  },
  {
    id: 4,
    name: "Signature Cap",
    price: 299,
    category: "Tilbehør",
    sizes: ["One Size"],
    imageUrl: "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Signature+Cap"
  },
  {
    id: 5,
    name: "Russejakke Pro",
    price: 1499,
    category: "Jakker",
    sizes: ["M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Russejakke+Pro"
  }
];

// Exporting the products array to be used in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products };
} else {
  window.products = products;
}
