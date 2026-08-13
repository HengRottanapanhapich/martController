import React, { useState } from 'react';
import styles from "../pageStyle/Inventory.module.css";

const CATEGORIES = ['Soda', 'Dairy', 'Bake-goods', 'Tea', 'Ice cream', 'Chip'];

const SUPPLIERS = ['kellybakery', 'sodaSupplyCo', 'dairyFarmDirect'];

// In a real app this would come from your Inventory page's shared product list/state.
const INVENTORY_ITEMS = [
  'Coke cola (can)',
  'Loaf of bread',
  'Cheese',
  'Cup noodle',
  'Chip',
];

const emptyItemRow = () => ({ item: '', orderAmount: '', unitAmount: '' });

// Each order now holds its own line items so a shipment can be received/tracked per item.
const INITIAL_ORDERS = [
  {
    id: '#0210',
    supplier: 'DairyDairy',
    category: 'Soda',
    orderDate: 'July 26',
    items: [
      { product: 'kellybakery', ordered: 100, received: 50, unitCost: 0.25 },
      { product: 'Coke cola (can)', ordered: 100, received: 50, unitCost: 0.25 },
      { product: 'Coke cola (can)', ordered: 100, received: 50, unitCost: 0.25 },
    ],
  },
  {
    id: '#0211',
    supplier: 'kellybakery',
    category: 'Soda',
    orderDate: 'July 26',
    items: [
      { product: 'Coke cola (can)', ordered: 100, received: 0, unitCost: 0.25 },
    ],
  },
  {
    id: '#0212',
    supplier: 'kellybakery',
    category: 'Soda',
    orderDate: 'July 26',
    items: [
      { product: 'Coke cola (can)', ordered: 100, received: 100, unitCost: 0.25 },
    ],
  },
];

function getItemStatus(item) {
  if (item.received <= 0) return 'Pending';
  if (item.received < item.ordered) return 'Partially received';
  return 'Received';
}

function getOrderStatus(order) {
  const statuses = order.items.map(getItemStatus);
  if (statuses.every((s) => s === 'Received')) return 'Received';
  if (statuses.every((s) => s === 'Pending')) return 'Pending';
  return 'Partially received';
}

function statusBadgeClass(status) {
  if (status === 'Received') return styles.badge_received;
  if (status === 'Partially received') return styles.badge_partial;
  return styles.badge_pending;
}

export default function PurchaseOrders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [view, setView] = useState('table'); // 'table' | 'add' | 'detail'
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState(CATEGORIES[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const [supplier, setSupplier] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderItems, setOrderItems] = useState([emptyItemRow()]);

  const handleItemFieldChange = (index, field) => (e) => {
    const value = e.target.value;
    setOrderItems((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const handleAddItemRow = () => {
    setOrderItems((prev) => [...prev, emptyItemRow()]);
  };

  const handleDeleteItemRow = (index) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const total = orderItems.reduce((sum, row) => {
    const qty = parseFloat(row.orderAmount) || 0;
    const unit = parseFloat(row.unitAmount) || 0;
    return sum + qty * unit;
  }, 0);

  const resetForm = () => {
    setSupplier('');
    setOrderDate('');
    setOrderItems([emptyItemRow()]);
  };

  const handleAddOrder = () => {
    // Wire this up to your purchase order state / API as needed.
    setView('table');
    resetForm();
  };

  const filteredOrders = orders.filter((o) => {
    const matchesCategory = !categoryFilter || o.category === categoryFilter;
    const matchesSearch =
      !searchTerm ||
      o.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;

  const openOrderDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setView('detail');
  };

  const handleReceivedChange = (itemIndex, nextValue) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== selectedOrderId) return order;
        return {
          ...order,
          items: order.items.map((item, i) => {
            if (i !== itemIndex) return item;
            const clamped = Math.max(0, Math.min(item.ordered, nextValue));
            return { ...item, received: clamped };
          }),
        };
      })
    );
  };

  const handleReceivedStep = (itemIndex, delta) => {
    const item = selectedOrder.items[itemIndex];
    handleReceivedChange(itemIndex, item.received + delta);
  };

  const shipmentCost = selectedOrder
    ? selectedOrder.items.reduce((sum, item) => sum + item.received * item.unitCost, 0)
    : 0;

  const closeDetail = () => {
    setView('table');
    setSelectedOrderId(null);
  };

  const confirmShipment = () => {
    // Wire this up to persist the received quantities to your backend/state.
    closeDetail();
  };

  if (view === 'add') {
    return (
      <div className={styles.content}>
        <div>
          <h1 className={styles.pageTitleAccent}>Add a new order</h1>
          <p className={styles.pageSubtitle}>Fill out the required information below</p>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formSectionTitle}>New order information</h2>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Supplier</label>
              <select
                className={styles.formSelect}
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              >
                <option value="" disabled>
                  supplier
                </option>
                {SUPPLIERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Order date</label>
              <input
                type="date"
                placeholder="orderDate"
                className={styles.formInput}
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.itemRowsWrapper}>
            {orderItems.map((row, index) => (
              <div className={styles.itemRow} key={index}>
                <div className={styles.itemRowGrid}>
                  <div className={styles.formField}>
                    {index === 0 && <label className={styles.formLabel}>Item</label>}
                    <select
                      className={styles.formSelect}
                      value={row.item}
                      onChange={handleItemFieldChange(index, 'item')}
                    >
                      <option value="" disabled>
                        item
                      </option>
                      {INVENTORY_ITEMS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formField}>
                    {index === 0 && <label className={styles.formLabel}>Order amount</label>}
                    <input
                      type="number"
                      placeholder="Reorder level for product"
                      className={styles.formInput}
                      value={row.orderAmount}
                      onChange={handleItemFieldChange(index, 'orderAmount')}
                    />
                  </div>

                  <div className={styles.formField}>
                    {index === 0 && <label className={styles.formLabel}>Unit amount</label>}
                    <input
                      type="number"
                      placeholder="Reorder level for product"
                      className={styles.formInput}
                      value={row.unitAmount}
                      onChange={handleItemFieldChange(index, 'unitAmount')}
                    />
                  </div>
                </div>

                {orderItems.length > 1 && (
                  <button
                    type="button"
                    className={styles.itemDeleteBtn}
                    onClick={() => handleDeleteItemRow(index)}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="button" className={styles.addCategoryBtn} onClick={handleAddItemRow}>
            add item
          </button>

          <p className={styles.totalText}>Total: ${total.toFixed(2)}</p>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setView('table')}>
              Cancel
            </button>
            <button type="button" className={styles.addProductBtn} onClick={handleAddOrder}>
              Add product
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'detail' && selectedOrder) {
    return (
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>Purchase orders</h1>
          <button type="button" className={styles.outlineBtn} onClick={() => setView('add')}>
            Add orders
          </button>
        </div>

        <div className={styles.formCard} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px 0' }}>
            <h2 className={styles.formSectionTitle} style={{ marginBottom: 2 }}>
              Receive shipment
            </h2>
            <p className={styles.pageSubtitle} style={{ margin: '0 0 16px' }}>
              {selectedOrder.supplier} · ordered {selectedOrder.orderDate}
            </p>
          </div>

          <div className={styles.panel} style={{ margin: '0 24px', border: '1px solid #ececec' }}>
            <p className={styles.pageSubtitle} style={{ margin: '4px 0 8px' }}>
              Purchase order items
            </p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Ordered</th>
                  <th>Received</th>
                  <th>Unit cost</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.product}</td>
                    <td className={styles.muted}>{item.ordered}</td>
                    <td>
                      <div className={styles.counter}>
                        <button
                          type="button"
                          className={styles.counterBtn}
                          onClick={() => handleReceivedStep(idx, -1)}
                          aria-label="Decrease received"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          className={styles.counterInput}
                          value={item.received}
                          min={0}
                          max={item.ordered}
                          onChange={(e) => handleReceivedChange(idx, Number(e.target.value))}
                        />
                        <button
                          type="button"
                          className={styles.counterBtn}
                          onClick={() => handleReceivedStep(idx, 1)}
                          aria-label="Increase received"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className={styles.muted}>${item.unitCost.toFixed(2)}</td>
                    <td>${(item.received * item.unitCost).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.shipmentCostBar}>
            <span>Shipment cost</span>
            <span>{shipmentCost.toFixed(2)}$</span>
          </div>

          <div className={styles.formActions} style={{ padding: '20px 24px' }}>
            <button type="button" className={styles.cancelBtn} onClick={closeDetail}>
              Cancel
            </button>
            <button type="button" className={styles.confirmBtn} onClick={confirmShipment}>
              confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Purchase orders</h1>
        <button type="button" className={styles.outlineBtn} onClick={() => setView('add')}>
          Add orders
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
              <th>Supplier</th>
              <th>Category</th>
              <th>order Date</th>
              <th>Received</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const status = getOrderStatus(order);
              const totalOrdered = order.items.reduce((s, i) => s + i.ordered, 0);
              const totalReceived = order.items.reduce((s, i) => s + i.received, 0);
              return (
                <tr
                  key={order.id}
                  className={styles.clickableRow}
                  onClick={() => openOrderDetail(order.id)}
                >
                  <td className={styles.muted}>{order.id}</td>
                  <td>{order.supplier}</td>
                  <td>{order.category}</td>
                  <td>{order.orderDate}</td>
                  <td className={styles.muted}>
                    {totalReceived}/{totalOrdered}
                  </td>
                  <td>
                    <span className={`${styles.badge} ${statusBadgeClass(status)}`}>{status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}