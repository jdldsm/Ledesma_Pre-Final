import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

// JD’s Coffee Shop
const bannerImages = [
  "https://media.istockphoto.com/id/1587154942/photo/summer-vacation-and-iced-coffees-on-the-beach.jpg?s=612x612&w=0&k=20&c=Hwpy_k6edfbr1QZouuIPJsKeFAw7xSOmh6-sJiqV3JU=",
  "https://media.istockphoto.com/id/1354172796/photo/city-cafe-terrace-near-the-river-in-the-rainy-autumn-evening-in-the-lantern-light-raindrops.jpg?s=612x612&w=0&k=20&c=4xYgGxWSO9Y5C8NAvy41FaSwsZLLlsdPfes_Ud-03LY=",
  "https://i.ytimg.com/vi/DFzFNDQiQSE/maxresdefault.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfD1bYWc1V8ZtWd3-IlgDV9oAbocfxnrvVeg&s",
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
    description: "Espresso with steamed milk and caramel syrup.",
  },
  {
    id: "c2",
    name: "Iced Americano",
    category: "Cold Coffee",
    image:
      "https://en.petitchef.com/imgupl/recipe/tiramisu-style-iced-americano-coffee--lg-469035p752451.webp",
    price: 120,
    quantity: 8,
    description: "Strong espresso poured over ice for a refreshing kick.",
  },
  {
    id: "c3",
    name: "Mocha Frappe",
    category: "Blended",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2024/11/Copycat-McDonalds-Mocha-Frappe_TOHD24_22961_JenaCarlin_6.jpg?fit=700%2C1024",
    price: 180,
    quantity: 3,
    description: "Blended chocolate and espresso drink topped with cream.",
  },
  {
    id: "c4",
    name: "Spanish Latte",
    category: "Cold Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPAYX3SU9zfj3nnmB7waHNvrVsvWKhnSF6bw&s",
    price: 160,
    quantity: 6,
    description:
      "Smooth espresso mixed with milk and a hint of condensed milk sweetness.",
  },
  {
    id: "c5",
    name: "Salted Caramel Latte",
    category: "Cold Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewWwQGyIZDG0LtfCCteKnm4D-hDHdqH0j7w&s",
    price: 165,
    quantity: 4,
    description:
      "Rich caramel latte topped with a sprinkle of sea salt for balance.",
  },
  {
    id: "c6",
    name: "Hot Chocolate",
    category: "Non-Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR5qZzSXNqg1h_g2WBn7iZZlpUlK90KIMhbg&s",
    price: 130,
    quantity: 10,
    description: "Classic cocoa drink topped with whipped cream and chocolate drizzle.",
  },
  {
    id: "c7",
    name: "Vanilla Latte (Hot)",
    category: "Hot Coffee",
    image:
      "https://cdn.shopify.com/s/files/1/0187/0338/files/vanilla_latte_on_a_blue_plate.jpg?v=1616171556",
    price: 150,
    quantity: 7,
    description: "Velvety espresso with steamed milk and a touch of vanilla.",
  },
];

export default function ProductManagementApp() {
  const [products, setProducts] = useState(defaultProducts);
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const addNewProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: `c${Date.now()}` }]);
  };

  const cartTotal = cart
    .reduce((sum, item) => sum + item.qty * item.price, 0)
    .toFixed(2);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = products.filter((p) =>
    filterCategory === "All" ? true : p.category === filterCategory
  );

  return (
    <Router>
      <div className="min-h-screen bg-[#f8f3ee] text-[#4b2e05]">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 bg-[#fff7ed]/95 border-b border-[#e2c9a6] backdrop-blur-md shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-wide text-[#4b2e05]">
                JD's Coffee Shop
              </h1>
            </Link>
            <nav className="flex items-center gap-6 text-base font-semibold text-[#4b2e05]">
              <Link to="/" className="hover:underline">
                Menu
              </Link>
              <Link to="/add" className="hover:underline">
                Add New Product
              </Link>
              <Link to="/cart" className="hover:underline">
                Cart ({cart.length})
              </Link>
              <div className="flex items-center gap-1">
                <span>Total:</span> <b className="text-lg">₱{cartTotal}</b>
              </div>
            </nav>
          </div>
        </header>

        {/* Slideshow */}
        <div className="relative w-full h-96 overflow-hidden">
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
            <h2 className="text-white text-5xl font-extrabold drop-shadow-lg">
              Welcome to JD's Coffee Shop
            </h2>
          </div>
        </div>

        {/* Routes */}
        <main className="max-w-6xl mx-auto px-6 py-8 pt-28">
          <Routes>
            <Route
              path="/"
              element={
                <HomeView
                  products={filtered}
                  addToCart={addToCart}
                  categories={categories}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartView
                  cart={cart}
                  updateCartQty={updateCartQty}
                  cartTotal={cartTotal}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetails products={products} addToCart={addToCart} />}
            />
            <Route path="/add" element={<AddProductView onAdd={addNewProduct} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-[#fff7ed] border-t border-[#e2c9a6] mt-8">
          <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-center text-[#6b4a1e]">
            © 2025 JD's Coffee Shop — Freshly brewed every day.
          </div>
        </footer>
      </div>
    </Router>
  );
}

// ---------- Home ----------
function HomeView({
  products,
  addToCart,
  categories,
  filterCategory,
  setFilterCategory,
}) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-6">Our Coffee Menu</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded border text-sm ${
              filterCategory === cat
                ? "bg-[#4b2e05] text-white"
                : "bg-white text-[#4b2e05]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-[#e2c9a6] rounded-lg p-4 flex flex-col"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.category}</p>
            <span className="text-sm mt-2">₱{p.price}</span>
            {p.quantity < 5 && (
              <span className="mt-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded w-fit">
                Low Stock
              </span>
            )}
            <div className="flex gap-2 mt-3">
              <Link
                to={`/product/${p.id}`}
                className="flex-1 text-center border border-[#4b2e05] text-[#4b2e05] py-2 rounded text-sm hover:bg-[#4b2e05] hover:text-white"
              >
                View
              </Link>
              <button
                onClick={() => addToCart(p)}
                className="flex-1 bg-[#4b2e05] text-white py-2 rounded text-sm hover:bg-[#3a2504]"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Product Details ----------
function ProductDetails({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  if (!product)
    return (
      <div className="bg-white p-6 rounded text-center">
        <p>Product not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-3 underline text-[#4b2e05]"
        >
          Back to Menu
        </button>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded max-w-lg mx-auto shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <p className="mb-2">{product.description}</p>
      <p className="font-semibold text-lg mb-2">₱{product.price}</p>
      {product.quantity < 5 && (
        <p className="text-yellow-700 bg-yellow-100 px-2 py-1 inline-block rounded mb-2">
          Low Stock
        </p>
      )}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-[#4b2e05] text-white py-2 rounded hover:bg-[#3a2504]"
        >
          Add to Cart
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex-1 border border-[#4b2e05] text-[#4b2e05] py-2 rounded hover:bg-[#4b2e05] hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
}

// ---------- Cart ----------
function CartView({ cart, updateCartQty, cartTotal, clearCart }) {
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <div className="bg-white p-6 rounded text-center">
        <p>Your cart is empty ☕</p>
        <button
          onClick={() => navigate("/")}
          className="mt-3 text-sm underline text-[#4b2e05]"
        >
          Back to Menu
        </button>
      </div>
    );

  const handleCheckout = () => {
    alert(`✅ Thank you for your order!\nTotal: ₱${cartTotal}`);
    clearCart();
    navigate("/");
  };

  return (
    <div className="bg-white p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">₱{item.price}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateCartQty(item.id, -1)}
              className="px-2 py-1 border rounded text-sm"
            >
              -
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => updateCartQty(item.id, 1)}
              className="px-2 py-1 border rounded text-sm"
            >
              +
            </button>
          </div>
          <span className="font-semibold">
            ₱{(item.qty * item.price).toFixed(2)}
          </span>
        </div>
      ))}
      <div className="mt-6 text-right font-bold text-lg">
        Total: ₱{cartTotal}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleCheckout}
          className="bg-[#4b2e05] text-white px-5 py-2 rounded hover:bg-[#3a2504]"
        >
          Checkout
        </button>
      </div>
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
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image)
      return alert("Please fill in all fields!");
    onAdd({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    navigate("/");
  };

  return (
    <div className="bg-white p-6 rounded max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        {["name", "category", "image", "price", "quantity", "description"].map(
          (key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border rounded px-2 py-1 text-sm"
            />
          )
        )}
        <button
          type="submit"
          className="bg-[#4b2e05] text-white py-2 rounded hover:bg-[#3a2504]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
