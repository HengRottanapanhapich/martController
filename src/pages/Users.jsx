import styles from "../pageStyle/Inventory.module.css";

import React, { useState } from 'react';

const ROLES = ['Admin', 'Inventory manager', 'Cashier'];

const INITIAL_USERS = [
  { id: '#U001', username: 'Sokkhim', email: 'Sokkhim123@gmail.com', password: '123456', role: 'Admin' },
  { id: '#U001', username: 'Sokkhim', email: 'Sokkhim123@gmail.com', password: '123456', role: 'Admin' },
  { id: '#U001', username: 'Sokkhim', email: 'Sokkhim123@gmail.com', password: '123456', role: 'Admin' },
  { id: '#U001', username: 'Sokkhim', email: 'Sokkhim123@gmail.com', password: '123456', role: 'Admin' },
  { id: '#U001', username: 'Sokkhim', email: 'Sokkhim123@gmail.com', password: '123456', role: 'Admin' },
  { id: '#U001', username: 'Sokkhim', email: 'Sokkhim123@gmail.com', password: '123456', role: 'Admin' },
  { id: '#U001', username: 'Sokkhim', email: 'Sokkhim123@gmail.com', password: '123456', role: 'Admin' },
  { id: '#U001', username: 'Sokkhim', email: 'Sokkhim123@gmail.com', password: '123456', role: 'Admin' },
];

export default function Users() {
  const [view, setView] = useState('table'); // 'table' | 'add'
  const [searchTerm, setSearchTerm] = useState('');

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: '',
    email: '',
  });

  const handleNewUserChange = (field) => (e) => {
    setNewUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddUser = () => {
    // Wire this up to your user state / API as needed.
    setView('table');
    setNewUser({ username: '', password: '', role: '', email: '' });
  };

  const filteredUsers = INITIAL_USERS.filter((u) => {
    const matchesSearch =
      !searchTerm ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (view === 'add') {
    return (
      <div className={styles.content}>
        <div>
          <h1 className={styles.pageTitleAccent}>Add a new user</h1>
          <p className={styles.pageSubtitle}>Fill out the required information for the user</p>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formSectionTitle}>User information</h2>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <input
                type="text"
                placeholder="Username"
                className={styles.formInput}
                value={newUser.username}
                onChange={handleNewUserChange('username')}
              />
            </div>

            <div className={styles.formField}>
              <input
                type="password"
                placeholder="Password"
                className={styles.formInput}
                value={newUser.password}
                onChange={handleNewUserChange('password')}
              />
            </div>

            <div className={styles.formField}>
              <select
                className={styles.formSelect}
                value={newUser.role}
                onChange={handleNewUserChange('role')}
              >
                <option value="" disabled>
                  User role
                </option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <input
                type="email"
                placeholder="User email"
                className={styles.formInput}
                value={newUser.email}
                onChange={handleNewUserChange('email')}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setView('table')}>
              Cancel
            </button>
            <button type="button" className={styles.addProductBtn} onClick={handleAddUser}>
              Add user
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Users</h1>
        <button type="button" className={styles.outlineBtn} onClick={() => setView('add')}>
          Add Users
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or ID"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={idx}>
                <td className={styles.muted}>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}