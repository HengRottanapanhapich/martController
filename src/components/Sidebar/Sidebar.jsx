import styles from "./Sidebar.module.css"

function Sidebar() {

const NAV_ITEMS = [
    { label: 'Dashboard', active: true },
    { label: 'Inventory' },
    { label: 'Checkout' },
    { label: 'Purchase orders' },
    { label: 'Supplier' },
    { label: 'Users' },
    ];

    return(
        <aside className={styles.sidebar}>
            <div className={styles.brand}>Mart controller</div>
            <nav className={styles.nav}>
                {NAV_ITEMS.map((item) => (
                    <button key={item.label} type="button" className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}>{item.label}</button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;