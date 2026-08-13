import React, { useState, useMemo } from 'react';
import styles from '../pageStyle/Checkout.module.css';

const CATEGORIES = ['Soda', 'Dairy', 'Bake-goods', 'Tea', 'Chips', 'Ice cream'];

// Placeholder catalog — swap for your real inventory data/API when ready.
// Fill in `image` for each product (e.g. an imported asset or a URL) once you have them.
const PRODUCTS = [
  { id: 'p1', name: 'Coke cola (can)', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p2', name: 'Fanta (can)', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p3', name: 'Sprite (can)', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p4', name: 'Pepsi (can)', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p5', name: 'Coca cola (can)', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p6', name: 'Dr pepper (can)', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p7', name: 'Mountain dew (can)', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p8', name: 'Bottled water', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p9', name: 'Flavored water', price: 0.5, stock: 150, category: 'Soda', image: '' },
  { id: 'p10', name: 'Milk carton', price: 0.75, stock: 90, category: 'Dairy', image: '' },
  { id: 'p11', name: 'Cheese slice', price: 1.2, stock: 60, category: 'Dairy', image: '' },
  { id: 'p12', name: 'Yogurt cup', price: 0.9, stock: 80, category: 'Dairy', image: '' },
  { id: 'p13', name: 'Loaf of bread', price: 1.5, stock: 40, category: 'Bake-goods', image: '' },
  { id: 'p14', name: 'Croissant', price: 1.1, stock: 35, category: 'Bake-goods', image: '' },
  { id: 'p15', name: 'Green tea bottle', price: 0.8, stock: 70, category: 'Tea', image: '' },
  { id: 'p16', name: 'Iced tea can', price: 0.6, stock: 100, category: 'Tea', image: '' },
  { id: 'p17', name: 'Potato chips', price: 1.0, stock: 120, category: 'Chips', image: '' },
  { id: 'p18', name: 'Tortilla chips', price: 1.2, stock: 95, category: 'Chips', image: '' },
  { id: 'p19', name: 'Vanilla ice cream', price: 2.5, stock: 25, category: 'Ice cream', image: '' },
  { id: 'p20', name: 'Chocolate ice cream', price: 2.5, stock: 25, category: 'Ice cream', image: '' },
];

const ORDER_NUMBER = '#001010';

export default function Checkout() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]); // [{ id, qty }]

  const itemCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((c) => {
      counts[c] = PRODUCTS.filter((p) => p.category === c).length;
    });
    return counts;
  }, []);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = p.category === activeCategory;
    const matchesSearch =
      !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === productId);
      if (existing) {
        return prev.map((line) => (line.id === productId ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...prev, { id: productId, qty: 1 }];
    });
  };

  const changeQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((line) => (line.id === productId ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0)
    );
  };

  const cartLines = cart
    .map((line) => {
      const product = PRODUCTS.find((p) => p.id === line.id);
      if (!product) return null;
      return { ...product, qty: line.qty };
    })
    .filter(Boolean);

  const total = cartLines.reduce((sum, line) => sum + line.price * line.qty, 0);

  const handlePlaceOrder = () => {
    // Wire this up to your orders/checkout API as needed.
    setCart([]);
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.pageTitle}>Checkout</h1>

      <div className={styles.layout}>
        <div className={styles.catalogColumn}>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.categoryTile} ${activeCategory === category ? styles.categoryTileActive : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                <span className={styles.categoryName}>{category}</span>
                <span className={styles.categoryCount}>{itemCounts[category]} items</span>
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by name or ID"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                className={styles.productCard}
                onClick={() => addToCart(product.id)}
              >
                <div className={styles.productImage}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className={styles.productImageEl} />
                  ) : null}
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.productName}>{product.name}</span>
                  <div className={styles.productMetaRow}>
                    <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
                    <span className={styles.stockPill}>{product.stock} left</span>
                  </div>
                </div>
              </button>
            ))}
            {filteredProducts.length === 0 && (
              <p className={styles.emptyState}>No products match your search.</p>
            )}
          </div>
        </div>

        <div className={styles.orderColumn}>
          <div className={styles.orderPanel}>
            <div className={styles.orderNumberBar}>Order number: {ORDER_NUMBER}</div>

            <div className={styles.cartList}>
              {cartLines.length === 0 && <p className={styles.emptyState}>No items yet — tap a product to add it.</p>}
              {cartLines.map((line) => (
                <div className={styles.cartLine} key={line.id}>
                  <div className={styles.cartLineImage}>
                    {line.image ? (
                      <img src={line.image} alt={line.name} className={styles.cartLineImageEl} />
                    ) : null}
                  </div>
                  <div className={styles.cartLineInfo}>
                    <span className={styles.cartLineName}>{line.name}</span>
                    <span className={styles.cartLinePrice}>${line.price.toFixed(2)}</span>
                  </div>
                  <div className={styles.counter}>
                    <button
                      type="button"
                      className={styles.counterBtn}
                      onClick={() => changeQty(line.id, -1)}
                      aria-label={`Decrease ${line.name}`}
                    >
                      −
                    </button>
                    <span className={styles.counterValue}>{line.qty}</span>
                    <button
                      type="button"
                      className={styles.counterBtn}
                      onClick={() => changeQty(line.id, 1)}
                      aria-label={`Increase ${line.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.paymentCard}>
              <h2 className={styles.paymentTitle}>Payment</h2>
              <div className={styles.paymentLines}>
                {cartLines.map((line) => (
                  <div className={styles.paymentRow} key={line.id}>
                    <span>
                      {line.name} x{line.qty}
                    </span>
                    <span>${(line.price * line.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.paymentTotalRow}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                className={styles.placeOrderBtn}
                onClick={handlePlaceOrder}
                disabled={cartLines.length === 0}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}