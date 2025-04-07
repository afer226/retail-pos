import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialProducts } from '../data/products';

function SellingPage() {
  const [products, setProducts] = useLocalStorage('products', initialProducts);
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [currentCart, setCurrentCart] = useState([]); // Items in the current sale: { product: {...}, quantity: x }

  // Calculate total whenever cart changes
  const total = currentCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (productToAdd) => {
    setCurrentCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === productToAdd.id);
      if (existingItemIndex > -1) {
        // Increase quantity if item already exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Add new item
        return [...prevCart, { product: productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
     setCurrentCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    const quantityNum = parseInt(newQuantity, 10);
    if (quantityNum <= 0) {
        removeFromCart(productId); // Remove if quantity is 0 or less
    } else {
        setCurrentCart(prevCart =>
            prevCart.map(item =>
                item.product.id === productId ? { ...item, quantity: quantityNum } : item
            )
        );
    }
  };


  const handleCheckout = () => {
    if (currentCart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const newTransaction = {
      id: `T${Date.now()}`, // Simple unique ID
      timestamp: new Date().toISOString(),
      items: currentCart,
      total: total
    };

    // Update transactions in local storage
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);

    // Clear the current cart
    setCurrentCart([]);

    alert(`Transaction Complete! Total: $${total.toFixed(2)}`);
    // In a real app: update stock levels, send data to backend, print receipt etc.
  };

  const clearCart = () => {
    setCurrentCart([]);
  }

  return (
    <div>
      <h2>Sell Screen</h2>
      <div className="selling-layout">
        {/* Product List */}
        <div className="product-list">
          <h3>Available Products</h3>
          {products.map(product => (
            <div key={product.id} className="product-item">
              <span>{product.name} - ${product.price.toFixed(2)}</span>
              <button onClick={() => addToCart(product)}>Add</button>
            </div>
          ))}
        </div>

        {/* Current Sale / Cart */}
        <div className="current-sale">
          <h2>Current Sale</h2>
          {currentCart.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            <>
              {currentCart.map(item => (
                <div key={item.product.id} className="cart-item">
                  <span>{item.product.name}</span>
                  <div>
                    Qty:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, e.target.value)}
                      min="1"
                      style={{ width: '50px', margin: '0 10px' }}
                     />
                    (${(item.product.price * item.quantity).toFixed(2)})
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.product.id)}>Remove</button>
                </div>
              ))}
              <div className="total-section">
                <h3>Total: ${total.toFixed(2)}</h3>
                <button onClick={handleCheckout}>Checkout</button>
                <button onClick={clearCart} className="remove-btn">Clear Cart</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellingPage;