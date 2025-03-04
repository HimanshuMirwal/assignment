import styles from "../styles/Layout.module.scss";

function NavbarSection(){
    return <div>
        <img 
            className={styles.navLogo}
            src="/assests/website/logo.png"
        />
    </div>
}
export default NavbarSection;