import styles from "./Topbar.module.css"

function Topbar() {
    return(
        <header className={styles.topbar}>
            <div className={styles.profile}>
                <div className={styles.avatar} aria-hidden="true" />
                <div className={styles.profileText}>
                    <span className={styles.profileName}>Coco</span>
                    <span className={styles.profileRole}>admin</span>
                </div>
                <span className={styles.chevron}>⌄</span>
            </div>
        </header>
    );
}

export default Topbar;