import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { getProducts, createProduct } from './services/productService';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopping_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });
  const [formData, setFormData] = useState({ name: '', price: '', imageUrl: '' });
  const [formError, setFormError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const fetchProducts = async () => {
    setLoading(true);
    setApiError('');
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setApiError('Failed to fetch products. Ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormError('');
    setApiError('');

    const trimmedName = formData.name.trim();
    const parsedPrice = parseFloat(formData.price);

    if (!trimmedName) {
      setFormError('Product name is required.');
      return;
    }

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setFormError('Price must be greater than 0.');
      return;
    }

    try {
      const response = await createProduct({
        name: trimmedName,
        price: parsedPrice,
        imageUrl: formData.imageUrl.trim() || undefined
      });
      setProducts((prev) => [...prev, response.data]);
      setFormData({ name: '', price: '', imageUrl: '' });
      setIsModalOpen(false);
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Failed to save product to the database.'
      );
    }
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const nextQty = item.quantity - 1;
          return { ...item, quantity: nextQty < 1 ? 1 : nextQty };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCart = () => {
    const el = document.getElementById('cart-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar
        cartCount={totalCartCount}
        onCartClick={scrollToCart}
        onAddProductClick={() => setIsModalOpen(true)}
      />

      {/* Hero Banner */}
      <section className="store-hero">
        <div className="store-hero-content">
          <span className="hero-pill">Official Store Catalog</span>
          <h1 className="hero-heading">Explore High-Performance Tech & Accessories</h1>
          <p className="hero-subtext">Premium electronics with live inventory updates and instantaneous cart calculations.</p>
        </div>
      </section>

      <main className="main-content">
        {apiError && <div className="alert alert-error">{apiError}</div>}

        <div className="catalog-toolbar">
          <div className="catalog-toolbar-title">
            <h2>Available Products</h2>
            <span className="products-count-chip">{filteredProducts.length} items</span>
          </div>

          <div className="catalog-search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="store-layout">
          <div className="catalog-grid-area">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Fetching inventory from database...</p>
              </div>
            ) : (
              <ProductList
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            )}
          </div>

          <aside className="cart-sidebar-area" id="cart-section">
            <Cart
              cartItems={cartItems}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
              onRemove={handleRemoveFromCart}
            />
          </aside>
        </div>
      </main>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="product-form">
              <div className="form-group">
                <label htmlFor="product-name">Product Name *</label>
                <input
                  id="product-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Ultra-Wide Curved Monitor"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="product-price">Price ($) *</label>
                <input
                  id="product-price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="299.99"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="product-image">Image URL (Optional)</label>
                <input
                  id="product-image"
                  name="imageUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </div>

              {formError && <p className="field-error">{formError}</p>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

