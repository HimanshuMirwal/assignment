import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import styles from "../styles/Layout.module.scss";
import NavbarSection from "./NavbarSection";
function Layout(props: { children: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }){
    return <div className={styles.container}>
        <NavbarSection/>
        {props.children}
    </div>
}

export default Layout;