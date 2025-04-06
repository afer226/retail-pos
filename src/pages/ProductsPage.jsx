import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialProducts } from '../data/products';

function ProductsPage() {
  // Typically you'd fetch/manage products here, maybe add/edit/delete
  // For simplicity, we just display the list from local storage (or initial if empty)
  const [products, setProducts] = useLocalStorage('products', initialProducts);

  // --- Placeholder functions for future implementation ---
  const addProduct = () => alert('Add product functionality not implemented.');
  const editProduct = (id) => alert(`Edit product ${id} functionality not implemented.`);
  const deleteProduct = (id) => alert(`Delete product ${id} functionality not implemented.`);
  // ----------------------------------------------------

  return (
    <div>
      <h1>Product Management</h1>
      <button onClick={addProduct} style={{ marginBottom: '1rem' }}>Add New Product</button>
      <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Total Products Listed: {products.length}
      </p>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => editProduct(product.id)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;