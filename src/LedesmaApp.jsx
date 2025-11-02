import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

// JD’s Coffee Shop

const bannerImages = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80", // Latte art top view
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80", // Coffee beans and cup
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&q=80", // Cozy mug close-up
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1600&q=80", // Caramel latte swirl
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1600&q=80", // Coffee setup with pastries
];

const defaultProducts = [
  {
    id: "c1",
    name: "Caramel Latte",
    category: "Hot Coffee",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/072/616/562/small/a-warm-and-inviting-caramel-latte-with-intricate-latte-art-served-with-a-spoon-on-a-folded-napkin-photo.jpg",
    price: 150,
    quantity: 5,
    rating: 4.8,
    description: "Espresso with steamed milk and caramel syrup.",
    specs: "Espresso · Steamed Milk · Caramel Syrup",
  },
  {
    id: "c2",
    name: "Iced Americano",
    category: "Iced Coffee",
    image:
      "https://en.petitchef.com/imgupl/recipe/tiramisu-style-iced-americano-coffee--lg-469035p752451.webp",
    price: 120,
    quantity: 8,
    rating: 4.6,
    description: "Strong espresso poured over ice for a refreshing kick.",
    specs: "Espresso · Cold Water · Ice",
  },
  {
    id: "c3",
    name: "Mocha Frappe",
    category: "Blended",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2024/11/Copycat-McDonalds-Mocha-Frappe_TOHD24_22961_JenaCarlin_6.jpg?fit=700%2C1024",
    price: 180,
    quantity: 3,
    rating: 4.9,
    description: "Blended chocolate and espresso drink topped with cream.",
    specs: "Espresso · Chocolate · Ice · Whipped Cream",
  },
  {
    id: "c4",
    name: "Spanish Latte",
    category: "Iced Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPAYX3SU9zfj3nnmB7waHNvrVsvWKhnSF6bw&s",
    price: 160,
    quantity: 6,
    rating: 4.7,
    description:
      "Smooth espresso mixed with milk and a hint of condensed milk sweetness.",
    specs: "Espresso · Milk · Condensed Milk",
  },
  {
    id: "c5",
    name: "Salted Caramel Latte",
    category: "Iced Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewWwQGyIZDG0LtfCCteKnm4D-hDHdqH0j7w&s",
    price: 165,
    quantity: 4,
    rating: 4.8,
    description:
      "Rich caramel latte topped with a sprinkle of sea salt for balance.",
    specs: "Espresso · Steamed Milk · Caramel · Sea Salt",
  },
  {
    id: "c6",
    name: "Hot Chocolate",
    category: "Non-Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR5qZzSXNqg1h_g2WBn7iZZlpUlK90KIMhbg&s",
    price: 130,
    quantity: 10,
    rating: 4.9,
    description:
      "Classic cocoa drink topped with whipped cream and chocolate drizzle.",
    specs: "Cocoa · Milk · Whipped Cream",
  },
  {
    id: "c7",
    name: "Vanilla Latte (Hot)",
    category: "Hot Coffee",
    image:
      "https://cdn.shopify.com/s/files/1/0187/0338/files/vanilla_latte_on_a_blue_plate.jpg?v=1616171556",
    price: 150,
    quantity: 7,
    rating: 4.6,
    description: "Velvety espresso with steamed milk and a touch of vanilla.",
    specs: "Espresso · Vanilla Syrup · Milk",
  },
  {
    id: "c8",
    name: "Matcha Crème Frappuccino",
    category: "Blended",
    image:
      "https://celebratingsweets.com/wp-content/uploads/2018/12/Homemade-Hot-Chocolate-4.jpg",
    price: 190,
    quantity: 5,
    rating: 4.8,
    description:
      "Blended Japanese matcha green tea with milk and cream — smooth and refreshing.",
    specs: "Matcha · Milk · Ice · Cream",
  },
  {
    id: "c9",
    name: "Java Chip Frappuccino",
    category: "Blended",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgspIfnjg-5q0-IGB7IOW_iqQ2aqfIuEnwtQ&s",
    price: 200,
    quantity: 4,
    rating: 4.9,
    description:
      "Coffee, chocolate chips, and milk blended into icy perfection.",
    specs: "Espresso · Chocolate Chips · Ice · Whipped Cream",
  },
];


export default function ProductManagementApp() {
  const [products, setProducts] = useState(defaultProducts);
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const addProduct = (product) => setProducts((prev) => [product, ...prev]);

  const updateQuantity = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(0, p.quantity + delta) }
          : p
      )
    );
  };

  const computeSubtotal = (p) => Number((p.price * p.quantity).toFixed(2));

  const overallTotal = useMemo(() => {
    return products
      .reduce((sum, p) => sum + p.price * p.quantity, 0)
      .toFixed(2);
  }, [products]);

  const filtered = products.filter((p) =>
    filterCategory === "All" ? true : p.category === filterCategory
  );

  return (
    <Router>
      <div className="min-h-screen bg-[#f8f3ee] text-[#4b2e05]">
        {/* Header */}
        <header className="bg-[#fff7ed] border-b border-[#e2c9a6]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-2xl"></div>
              <h1 className="text-xl font-bold tracking-wide">
                JD’s Coffee Shop
              </h1>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link to="/" className="hover:underline">
                Menu
              </Link>
              <Link to="/add" className="hover:underline">
                Add Coffee
              </Link>
              <div>
                Total: <b>₱{overallTotal}</b>
              </div>
            </nav>
          </div>
        </header>

        {/* Slideshow */}
        <div className="relative w-full h-60 overflow-hidden">
          {bannerImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl font-semibold drop-shadow-lg">
              Welcome to JD's Coffee Shop
            </h2>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <HomeView
                  products={filtered}
                  categories={categories}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  updateQuantity={updateQuantity}
                  computeSubtotal={computeSubtotal}
                  overallTotal={overallTotal}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetailView
                  products={products}
                  updateQuantity={updateQuantity}
                />
              }
            />
            <Route path="/add" element={<AddProductView onAdd={addProduct} />} />
          </Routes>
        </main>

        <footer className="bg-[#fff7ed] border-t border-[#e2c9a6] mt-8">
          <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-center text-[#6b4a1e]">
            © 2025 JD’s Coffee Shop — Freshly brewed every day.
          </div>
        </footer>
      </div>
    </Router>
  );
}

// ---------- Home ----------
function HomeView({
  products,
  categories,
  filterCategory,
  setFilterCategory,
  updateQuantity,
  computeSubtotal,
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Our Coffee Menu</h2>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded px-2 py-1 text-sm bg-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.length === 0 ? (
          <div className="p-6 bg-white rounded text-center">No coffee found.</div>
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              onUpdateQty={updateQuantity}
              computeSubtotal={computeSubtotal}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ---------- Product Card ----------
function ProductCard({ p, onUpdateQty, computeSubtotal }) {
  return (
    <div className="bg-white border border-[#e2c9a6] rounded-lg p-4 flex flex-col">
      <Link to={`/product/${p.id}`}>
        <img
          src={p.image}
          alt={p.name}
          className="h-40 w-full object-cover rounded mb-3"
        />
      </Link>
      <h3 className="text-lg font-semibold">{p.name}</h3>
      <p className="text-sm text-gray-600">{p.category}</p>
      <div className="mt-2 flex justify-between items-center text-sm">
        <span>₱{p.price}</span>
        <span className="text-gray-500">
          Subtotal: ₱{computeSubtotal(p)}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQty(p.id, -1)}
            className="px-2 py-1 border rounded text-sm"
            disabled={p.quantity <= 0}
          >
            -
          </button>
          <span className="text-sm">{p.quantity}</span>
          <button
            onClick={() => onUpdateQty(p.id, 1)}
            className="px-2 py-1 border rounded text-sm"
          >
            +
          </button>
        </div>
        {p.quantity < 5 && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
            Low Stock
          </span>
        )}
      </div>
    </div>
  );
}

// ---------- Product Detail ----------
function ProductDetailView({ products, updateQuantity }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="bg-white p-6 rounded text-center">
        <p>Coffee not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm mt-3 text-brown-700 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2 text-sm text-gray-600">₱{product.price}</p>
      <p className="text-sm text-gray-500">Stock: {product.quantity}</p>
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => updateQuantity(product.id, -1)}
          className="px-3 py-1 border rounded"
          disabled={product.quantity <= 0}
        >
          -
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, 1)}
          className="px-3 py-1 border rounded"
        >
          +
        </button>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 text-sm text-brown-700 underline"
      >
        Back to menu
      </button>
    </div>
  );
}

// ---------- Add Product ----------
function AddProductView({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    quantity: "",
    rating: "",
    description: "",
    specs: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    for (const k in form) if (!form[k]) return `${k} is required`;
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);

    const newProduct = {
      id: `c_${Date.now()}`,
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      rating: Number(form.rating),
    };
    onAdd(newProduct);
    navigate("/");
  };

  return (
    <div className="bg-white p-6 rounded max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Coffee</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        {[
          ["name", "Coffee Name"],
          ["category", "Category"],
          ["image", "Image URL"],
          ["price", "Price (₱)"],
          ["quantity", "Quantity"],
          ["rating", "Rating (0–5)"],
          ["description", "Description"],
          ["specs", "Ingredients"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm text-gray-600 mb-1">{label}</label>
            <input
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
        ))}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-3 mt-3">
          <button
            type="submit"
            className="px-4 py-2 bg-[#4b2e05] text-white rounded text-sm"
          >
            Add Coffee
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 border rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
