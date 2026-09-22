// data.js - Midlertidig database for russemerch

const mockProducts = [
    {
        id: "prod_001",
        name: "Premium Russegenser",
        description: "Tjukk og behagelig hettegenser av høy kvalitet. Perfekt for kalde kvelder på rulling.",
        price: 899,
        category: "Gensere",
        sizes: ["S", "M", "L", "XL"],
        images: ["placeholder-hoodie-front.jpg", "placeholder-hoodie-back.jpg"],
        inStock: true
    },
    {
        id: "prod_002",
        name: "Klassisk Russebukse",
        description: "Slitesterk snekkerbukse med god plass til strykemerker og signaturer.",
        price: 1199,
        category: "Bukser",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: ["placeholder-pants.jpg"],
        inStock: true
    },
    {
        id: "prod_003",
        name: "Gull-fløyte",
        description: "Gjør deg hørt! Standardutstyr for enhver buss.",
        price: 149,
        category: "Tilbehør",
        sizes: ["One-size"],
        images: ["placeholder-whistle.jpg"],
        inStock: true
    }
];

// Funksjon for å hente produkter (simulerer et API-kall)
function getProducts() {
    // Sjekker om admin har lagt til nye produkter i LocalStorage
    const localProducts = JSON.parse(localStorage.getItem('customProducts')) || [];
    return [...mockProducts, ...localProducts];
}
