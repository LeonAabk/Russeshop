const defaultProducts = [
  {
    id: 1,
    name: "Premium Russegenser",
    price: 699,
    category: "Gensere",
    sizes: ["S", "M", "L", "XL"],
    description: "Vår mest populære russegenser. Laget av tykk, behagelig bomullsblanding (80% bomull, 20% polyester) for maksimal komfort under hele russetiden. Broderte detaljer og slitesterke sømmer.",
    imageUrl: "https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Premium+Genser"
  },
  {
    id: 2,
    name: "Streetwear Hoodie",
    price: 899,
    category: "Hettegensere",
    sizes: ["M", "L", "XL", "XXL"],
    description: "Urban hettegenser med oversized passform. Dyp hette og kengurulomme. Perfekt for kalde mainetter. Heavyweight stoff som holder formen uansett hvor hardt du feirer.",
    imageUrl: "https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Streetwear+Hoodie"
  },
  {
    id: 3,
    name: "Classic Russebukse",
    price: 1099,
    category: "Bukser",
    sizes: ["S", "M", "L", "XL"],
    description: "Den ultimate russebuksen. Slitesterk canvas med stretch-paneler for optimal bevegelsesfrihet. Utstyrt med ekstra dype lommer, forsterkede knær og plass til alle strykemerker.",
    imageUrl: "https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Russebukse"
  },
  {
    id: 4,
    name: "Signature Cap",
    price: 299,
    category: "Tilbehør",
    sizes: ["One Size"],
    description: "Fullfør looken med vår signatur-cap. Justerbar snapback-lukking bak. Brodert 3D-logo i front. Pustende materiale som holder hodet kaldt.",
    imageUrl: "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Signature+Cap"
  },
  {
    id: 5,
    name: "Russejakke Pro",
    price: 1499,
    category: "Jakker",
    sizes: ["M", "L", "XL"],
    description: "Eksklusiv russejakke for de som vil skille seg ut. Vann- og vindavvisende yttermateriale. Innerlomme med glidelås. Minimalistisk og stilrent design.",
    imageUrl: "https://via.placeholder.com/400x500/1a1a1a/ffffff?text=Russejakke+Pro"
  }
];

// Funksjon for å hente alle produkter (standard + custom fra admin)
function getProducts() {
    let customProducts = [];
    try {
        const stored = localStorage.getItem('russemerch_custom_products');
        if (stored) {
            customProducts = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Kunne ikke lese custom produkter", e);
    }

    // Slå sammen arrays. Bruker defaultProducts først, deretter customProducts.
    return [...defaultProducts, ...customProducts];
}

// For bakoverkompatibilitet og for å unngå å knekke ting som forventer "products" variablen før de har byttet til getProducts()
const products = defaultProducts;

// Exporting the products array to be used in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultProducts, getProducts, products };
} else {
  window.defaultProducts = defaultProducts;
  window.getProducts = getProducts;
  window.products = products; // Beholdes midlertidig
}
