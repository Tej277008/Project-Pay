import { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Cart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Cart / Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product List */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Available Products</h3>
          <ul className="space-y-2">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{product.name} - ${product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Cart Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <>
              <ul className="space-y-2 mb-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <div>
                      <span className="mr-4">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <h4 className="text-lg font-bold mb-2">Total: ${total.toFixed(2)}</h4>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Process Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
