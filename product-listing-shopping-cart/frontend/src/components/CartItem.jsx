import React from 'react';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const itemTotal = (item.price * item.quantity).toFixed(2);
  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60';

  return (
    <div className="cart-item">
      <div className="cart-item-thumb">
        <img
          src={item.imageUrl || fallbackImage}
          alt={item.name}
          className="cart-thumb-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      </div>

      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.name}</h4>
        <p className="cart-item-rate">
          ${Number(item.price).toFixed(2)} each
        </p>

        <div className="cart-item-controls-mobile">
          <div className="cart-item-controls">
            <button
              className="btn-qty"
              onClick={() => onDecrease(item.id)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="cart-item-quantity">{item.quantity}</span>
            <button
              className="btn-qty"
              onClick={() => onIncrease(item.id)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="cart-item-price-col">
        <div className="cart-item-total">
          ${itemTotal}
        </div>
        <button
          className="btn-remove"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
          title="Remove from cart"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;

