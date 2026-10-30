import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60';

  return (
    <div className="product-card">
      <div className="product-badge">In Stock</div>
      <div className="product-image-container">
        <img
          src={product.imageUrl || fallbackImage}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      </div>
      <div className="product-card-body">
        <span className="product-category">Electronics & Tech</span>
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        <div className="product-pricing-row">
          <div>
            <span className="price-currency">$</span>
            <span className="price-amount">{Number(product.price).toFixed(2)}</span>
          </div>
          <span className="free-shipping-tag">Free Delivery</span>
        </div>
      </div>
      <button
        className="btn-add-cart"
        onClick={() => onAddToCart(product)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductCard;

