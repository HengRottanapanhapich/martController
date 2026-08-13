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

const emptyProductForm = () => ({
  name: '',
  category: '',
  price: '',
  stock: '',
  reorderLevel: '',
});

export default function Inventory() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [view, setView] = useState('table'); // 'table' | 'add' | 'edit'
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAisle, setNewCategoryAisle] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(categories[0]?.name ?? '');
  const [searchTerm, setSearchTerm] = useState('');

  const [productForm, setProductForm] = useState(emptyProductForm());
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [categoryDeleteTarget, setCategoryDeleteTarget] = useState(null);

  const handleProductFieldChange = (field) => (e) => {
    setProductForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const openAddProduct = () => {
    setProductForm(emptyProductForm());
    setEditingIndex(null);
    setView('add');
  };

  const openEditProduct = (index) => {
    const product = products[index];
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      reorderLevel: product.reorderLevel,
    });
    setEditingIndex(index);
    setView('edit');
  };

  const handleSaveProduct = () => {
    if (editingIndex !== null) {
      // Editing an existing product — keep its id/status, update the rest.
      setProducts((prev) =>
        prev.map((p, i) => (i === editingIndex ? { ...p, ...productForm } : p))
      );
    } else {
      // Wire this up to your product state / API as needed for a real id/status.
      setProducts((prev) => [...prev, { id: '#new', status: 'Critical', ...productForm }]);
    }
    setView('table');
    setProductForm(emptyProductForm());
    setEditingIndex(null);
  };

  const cancelProductForm = () => {
    setView('table');
    setProductForm(emptyProductForm());
    setEditingIndex(null);
  };

  const requestDeleteProduct = (index) => {
    setDeleteTargetIndex(index);
  };

  const cancelDeleteProduct = () => {
    setDeleteTargetIndex(null);
  };

  const confirmDeleteProduct = () => {
    setProducts((prev) => prev.filter((_, i) => i !== deleteTargetIndex));
    setDeleteTargetIndex(null);
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    setCategories((prev) => [...prev, { name: trimmed, aisle: newCategoryAisle.trim() }]);
    setNewCategoryName('');
    setNewCategoryAisle('');
    setShowAddCategoryForm(false);
  };

  const requestDeleteCategory = (name) => {
    setCategoryDeleteTarget(name);
  };

  const cancelDeleteCategory = () => {
    setCategoryDeleteTarget(null);
  };

  const confirmDeleteCategory = () => {
    setCategories((prev) => prev.filter((c) => c.name !== categoryDeleteTarget));
    setCategoryDeleteTarget(null);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setShowAddCategoryForm(false);
    setNewCategoryName('');
    setNewCategoryAisle('');
  };

  const filteredProducts = products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => {
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  if (view === 'add' || view === 'edit') {
    const isEdit = view === 'edit';
    return (
      <div className={styles.content}>
        <div>
          <h1 className={styles.pageTitleAccent}>{isEdit ? 'Edit product' : 'Add a new product'}</h1>
          <p className={styles.pageSubtitle}>Fill out the required information for the product</p>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formSectionTitle}>
            {isEdit ? 'Edit product information' : 'Product information'}
          </h2>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Product</label>
              <input
                type="text"
                placeholder="Product name"
                className={styles.formInput}
                value={productForm.name}
                onChange={handleProductFieldChange('name')}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Category</label>
              <select
                className={styles.formSelect}
                value={productForm.category}
                onChange={handleProductFieldChange('category')}
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
                value={productForm.price}
                onChange={handleProductFieldChange('price')}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Stock</label>
              <input
                type="text"
                placeholder="Product stock"
                className={styles.formInput}
                value={productForm.stock}
                onChange={handleProductFieldChange('stock')}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Reorder level</label>
              <input
                type="text"
                placeholder="Reorder level for product"
                className={styles.formInput}
                value={productForm.reorderLevel}
                onChange={handleProductFieldChange('reorderLevel')}
              />
            </div>
          </div>

          <div className={styles.imageSection}>
            <h2 className={styles.formSectionTitle}>{isEdit ? 'Edit product image' : 'Add product image'}</h2>
            <button type="button" className={styles.imageUpload} aria-label="Product image">
              +
            </button>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={cancelProductForm}>
              Cancel
            </button>
            <button type="button" className={styles.addProductBtn} onClick={handleSaveProduct}>
              {isEdit ? 'confirm' : 'Add product'}
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
        <button type="button" className={styles.outlineBtn} onClick={openAddProduct}>
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
            {filteredProducts.map(({ product, index }) => (
              <tr key={index}>
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
                    <button type="button" className={styles.editBtn} onClick={() => openEditProduct(index)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.deleteIconBtn}
                      onClick={() => requestDeleteProduct(index)}
                      aria-label={`Delete ${product.name}`}
                    >
                      ✕
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
                    onClick={() => requestDeleteCategory(c.name)}
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

      {deleteTargetIndex !== null && (
        <div className={styles.modalOverlay} onClick={cancelDeleteProduct}>
          <div className={styles.confirmCard} onClick={(e) => e.stopPropagation()}>
            <p className={styles.confirmQuestion}>Do you want to delete this?</p>
            <div className={styles.confirmActions}>
              <button type="button" className={styles.cancelBtn} onClick={cancelDeleteProduct}>
                Cancel
              </button>
              <button type="button" className={styles.deleteConfirmBtn} onClick={confirmDeleteProduct}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {categoryDeleteTarget !== null && (
        <div className={styles.modalOverlay} onClick={cancelDeleteCategory}>
          <div className={styles.confirmCard} onClick={(e) => e.stopPropagation()}>
            <p className={styles.confirmQuestion}>Do you want to delete this?</p>
            <div className={styles.confirmActions}>
              <button type="button" className={styles.cancelBtn} onClick={cancelDeleteCategory}>
                Cancel
              </button>
              <button type="button" className={styles.deleteConfirmBtn} onClick={confirmDeleteCategory}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}