import styles from "../pageStyle/Inventory.module.css";

import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
  { id: '#0210', name: 'Coke cola (can)', category: 'Soda', price: '$0.50', stock: 90, reorderLevel: 100, status: 'Critical' },
];

const INITIAL_CATEGORIES = [
  { name: 'Soda', aisle: 'aisle1' },
  { name: 'Dairy', aisle: 'aisle2' },
  { name: 'Bake-goods', aisle: 'aisle3' },
  { name: 'Tea', aisle: 'aisle4' },
  { name: 'Ice cream', aisle: 'aisle5' },
  { name: 'Chip', aisle: 'aisle6' },
];

export default function Inventory() {
  const [view, setView] = useState('table'); // 'table' | 'add'
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAisle, setNewCategoryAisle] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(categories[0]?.name ?? '');
  const [searchTerm, setSearchTerm] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    reorderLevel: '',
  });

  const handleNewProductChange = (field) => (e) => {
    setNewProduct((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddProduct = () => {
    // Wire this up to your product state / API as needed.
    setView('table');
    setNewProduct({ name: '', category: '', price: '', stock: '', reorderLevel: '' });
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    setCategories((prev) => [...prev, { name: trimmed, aisle: newCategoryAisle.trim() }]);
    setNewCategoryName('');
    setNewCategoryAisle('');
    setShowAddCategoryForm(false);
  };

  const handleDeleteCategory = (name) => {
    setCategories((prev) => prev.filter((c) => c.name !== name));
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setShowAddCategoryForm(false);
    setNewCategoryName('');
    setNewCategoryAisle('');
  };

  const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (view === 'add') {
    return (
      <div className={styles.content}>
        <div>
          <h1 className={styles.pageTitleAccent}>Add a new product</h1>
          <p className={styles.pageSubtitle}>Fill out the required information for the product</p>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formSectionTitle}>Product information</h2>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Product</label>
              <input
                type="text"
                placeholder="Product name"
                className={styles.formInput}
                value={newProduct.name}
                onChange={handleNewProductChange('name')}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Category</label>
              <select
                className={styles.formSelect}
                value={newProduct.category}
                onChange={handleNewProductChange('category')}
              >
                <option value="" disabled>
                  Product category
                </option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>price</label>
              <input
                type="text"
                placeholder="Product price"
                className={styles.formInput}
                value={newProduct.price}
                onChange={handleNewProductChange('price')}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Stock</label>
              <input
                type="text"
                placeholder="Product stock"
                className={styles.formInput}
                value={newProduct.stock}
                onChange={handleNewProductChange('stock')}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Reorder level</label>
              <input
                type="text"
                placeholder="Reorder level for product"
                className={styles.formInput}
                value={newProduct.reorderLevel}
                onChange={handleNewProductChange('reorderLevel')}
              />
            </div>
          </div>

          <div className={styles.imageSection}>
            <h2 className={styles.formSectionTitle}>Add product image</h2>
            <button type="button" className={styles.imageUpload} aria-label="Add product image">
              +
            </button>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setView('table')}>
              Cancel
            </button>
            <button type="button" className={styles.addProductBtn} onClick={handleAddProduct}>
              Add product
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Inventory</h1>
        <button type="button" className={styles.outlineBtn} onClick={() => setView('add')}>
          Add product
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or ID"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.filterRow}>
        <select
          className={styles.categorySelect}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="button" className={styles.outlineBtn} onClick={() => setShowCategoryModal(true)}>
          Manage category
        </button>
      </div>

      <div className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Reorder level</th>
              <th>status</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, idx) => (
              <tr key={idx}>
                <td className={styles.muted}>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.reorderLevel}</td>
                <td>
                  <span className={`${styles.badge} ${styles[`badge_${product.status.toLowerCase()}`]}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className={styles.activityCell}>
                    <button type="button" className={styles.editBtn}>
                      Edit
                    </button>
                    <button type="button" className={styles.moreBtn} aria-label="More actions">
                      ⋮
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCategoryModal && (
        <div className={styles.modalOverlay} onClick={closeCategoryModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>Manage categories</h2>
                <p className={styles.modalSubtitle}>Add or delete category</p>
              </div>
              <button type="button" className={styles.modalClose} onClick={closeCategoryModal} aria-label="Close">
                ✕
              </button>
            </div>

            <ul className={styles.categoryList}>
              {categories.map((c) => (
                <li key={c.name} className={styles.categoryRow}>
                  <span>
                    <strong>{c.name}</strong>
                    {c.aisle ? `: ${c.aisle}` : ''}
                  </span>
                  <button
                    type="button"
                    className={styles.categoryDelete}
                    onClick={() => handleDeleteCategory(c.name)}
                    aria-label={`Delete ${c.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            {!showAddCategoryForm ? (
              <button
                type="button"
                className={styles.addCategoryBtn}
                onClick={() => setShowAddCategoryForm(true)}
              >
                add category
              </button>
            ) : (
              <div className={styles.addCategoryForm}>
                <input
                  type="text"
                  placeholder="Category name"
                  className={styles.formInput}
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Aisle"
                  className={styles.formInput}
                  value={newCategoryAisle}
                  onChange={(e) => setNewCategoryAisle(e.target.value)}
                />
                <button type="button" className={styles.addBtn} onClick={handleAddCategory}>
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}