import { Link } from "react-router";
import { useState } from "react";

import "./header.css";

export function Header({ cart, setSearchQuery }) {
  const [input, setInput] = useState("");

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const handleSearch = () => {
    setSearchQuery(input);
  };

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link" onClick={() => setSearchQuery("")}>
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button className="search-button" onClick={handleSearch}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link to="/orders" className="orders-link header-link">
          <span className="orders-text">Orders</span>
        </Link>

        <Link to="/checkout" className="cart-link header-link">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
