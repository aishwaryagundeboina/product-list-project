import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, onIncrease, onDecrease, onRemove, onClose }) => {
  const overallTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-card">
      <div className="cart-header">
        <div className="cart-title-group">
          <h2 className="cart-heading">Your Cart</h2>
          <span className="cart-items-counter">({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
        </div>
        {onClose && (
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            &times;
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart-state">
          <div className="empty-cart-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <p className="empty-cart-title">Your shopping cart is empty</p>
          <p className="empty-cart-subtitle">Browse our catalog and add items to your cart.</p>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>

          <div className="cart-order-summary">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-val">${overallTotal}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Standard Shipping</span>
              <span className="summary-free">FREE</span>
            </div>
            <div className="summary-row summary-total-row">
              <span className="total-title">Total</span>
              <span className="total-price">${overallTotal}</span>
            </div>
            <button className="btn-checkout-primary" onClick={() => alert('Proceeding to Checkout!')}>
              Checkout (${overallTotal})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

