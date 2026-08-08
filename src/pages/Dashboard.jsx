import React from 'react';
import styles from '../pageStyle/Dashboard.module.css';

const SUMMARY_CARDS = [
  {
    label: 'SALES TODAY',
    value: '$1550.75',
    sub: '30 orders',
    variant: 'default',
  },
  {
    label: 'NEED REORDERING SOON',
    value: '10',
    sub: 'Products near threshold',
    variant: 'warning',
  },
  {
    label: 'CRITICAL STOCK',
    value: '2',
    sub: 'Below reorder level',
    variant: 'danger',
  },
  {
    label: 'Purchase orders',
    value: '2',
    sub: 'Waiting for arrival',
    variant: 'default',
  },
];

const STOCK_STATUS = [
  { id: '#00213', name: 'Loaf of bread', onHand: 9, status: 'Critical' },
  { id: '#00212', name: 'Cheese', onHand: 9, status: 'Critical' },
  { id: '#00211', name: 'Cup noodle', onHand: 9, status: 'Critical' },
  { id: '#00210', name: 'Coca Cola', onHand: 9, status: 'Critical' },
  { id: '#00209', name: 'Chip', onHand: 9, status: 'Critical' },
];

const RECENT_RECEIPTS = [
  { order: '#01101', method: 'QR', total: '$6.80' },
  { order: '#01101', method: 'QR', total: '$6.80' },
  { order: '#01101', method: 'QR', total: '$6.80' },
  { order: '#01101', method: 'QR', total: '$6.80' },
  { order: '#01101', method: 'QR', total: '$6.80' },
  { order: '#01101', method: 'QR', total: '$6.80' },
];

export default function Dashboard() {
  return (
    <div className={styles.page}>
      

      <div className={styles.main}>
        

        <main className={styles.content}>
          <h1 className={styles.pageTitle}>Store overview</h1>

          <section className={styles.cardGrid}>
            {SUMMARY_CARDS.map((card) => (
              <div
                key={card.label}
                className={`${styles.summaryCard} ${styles[`summaryCard_${card.variant}`]}`}
              >
                <span className={styles.summaryLabel}>{card.label}</span>
                <span className={styles.summaryValue}>{card.value}</span>
                <span className={styles.summarySub}>{card.sub}</span>
              </div>
            ))}
          </section>

          <section className={styles.panelGrid}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Stock status</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>On hand</th>
                    <th>Gauge</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {STOCK_STATUS.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className={styles.productName}>{item.name}</div>
                        <div className={styles.productId}>{item.id}</div>
                      </td>
                      <td className={styles.muted}>{item.onHand}</td>
                      <td>
                        <div className={styles.gauge} aria-hidden="true" />
                      </td>
                      <td>
                        <span
                          className={`${styles.badge} ${styles[`badge_${item.status.toLowerCase()}`]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Recent receipts</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Method</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_RECEIPTS.map((receipt, idx) => (
                    <tr key={idx}>
                      <td>{receipt.order}</td>
                      <td className={styles.muted}>{receipt.method}</td>
                      <td>{receipt.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}