import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
    { label: "Dashboard", path: "/" },
    { label: "Inventory", path: "/inventory" },
    { label: "Checkout", path: "/checkout" },
    { label: "Purchase orders", path: "/purchase-orders" },
    { label: "Supplier", path: "/supplier" },
    { label: "Users", path: "/users" },
];

function Sidebar() {
    return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>Mart controller</div>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;