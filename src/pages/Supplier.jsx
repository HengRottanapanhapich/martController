import React, { useState } from 'react';
import styles from "../pageStyle/Inventory.module.css";

const CATEGORIES = ['Soda', 'Dairy', 'Bake-goods', 'Tea', 'Ice cream', 'Chip'];

const INITIAL_SUPPLIERS = [
  { id: '#S001', name: 'kellybakery', category: 'Bake-goods', contact: '023 456 789', email: 'Kellybakery123@gmail.com' },
  { id: '#S001', name: 'kellybakery', category: 'Bake-goods', contact: '023 456 789', email: 'Kellybakery123@gmail.com' },
  { id: '#S001', name: 'kellybakery', category: 'Bake-goods', contact: '023 456 789', email: 'Kellybakery123@gmail.com' },
  { id: '#S001', name: 'kellybakery', category: 'Bake-goods', contact: '023 456 789', email: 'Kellybakery123@gmail.com' },
  { id: '#S001', name: 'kellybakery', category: 'Bake-goods', contact: '023 456 789', email: 'Kellybakery123@gmail.com' },
  { id: '#S001', name: 'kellybakery', category: 'Bake-goods', contact: '023 456 789', email: 'Kellybakery123@gmail.com' },
  { id: '#S001', name: 'kellybakery', category: 'Bake-goods', contact: '023 456 789', email: 'Kellybakery123@gmail.com' },
  { id: '#S001', name: 'kellybakery', category: 'Bake-goods', contact: '023 456 789', email: 'Kellybakery123@gmail.com' },
];

export default function Supplier() {
  const [view, setView] = useState('table'); // 'table' | 'add'
  const [categoryFilter, setCategoryFilter] = useState(CATEGORIES[2]);
  const [searchTerm, setSearchTerm] = useState('');

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    category: '',
    phone: '',
    email: '',
  });

  const handleNewSupplierChange = (field) => (e) => {
    setNewSupplier((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddSupplier = () => {
    // Wire this up to your supplier state / API as needed.
    setView('table');
    setNewSupplier({ name: '', category: '', phone: '', email: '' });
  };

  const filteredSuppliers = INITIAL_SUPPLIERS.filter((s) => {
    const matchesCategory = !categoryFilter || s.category === categoryFilter;
    const matchesSearch =
      !searchTerm ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (view === 'add') {
    return (
      <div className={styles.content}>
        <div>
          <h1 className={styles.pageTitleAccent}>Add a new supplier</h1>
          <p className={styles.pageSubtitle}>Fill out the required information for the supplier</p>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formSectionTitle}>Supplier information</h2>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <input
                type="text"
                placeholder="Supplier name"
                className={styles.formInput}
                value={newSupplier.name}
                onChange={handleNewSupplierChange('name')}
              />
            </div>

            <div className={styles.formField}>
              <select
                className={styles.formSelect}
                value={newSupplier.category}
                onChange={handleNewSupplierChange('category')}
              >
                <option value="" disabled>
                  Product category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <input
                type="text"
                placeholder="Supplier phone number"
                className={styles.formInput}
                value={newSupplier.phone}
                onChange={handleNewSupplierChange('phone')}
              />
            </div>

            <div className={styles.formField}>
              <input
                type="email"
                placeholder="Supplier email"
                className={styles.formInput}
                value={newSupplier.email}
                onChange={handleNewSupplierChange('email')}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setView('table')}>
              Cancel
            </button>
            <button type="button" className={styles.addProductBtn} onClick={handleAddSupplier}>
              Add supplier
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Supplier</h1>
        <button type="button" className={styles.outlineBtn} onClick={() => setView('add')}>
          Add supplier
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
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>supplier</th>
              <th>Category</th>
              <th>Contact</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier, idx) => (
              <tr key={idx}>
                <td className={styles.muted}>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.category}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}