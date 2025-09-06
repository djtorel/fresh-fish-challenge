import type { Component, JSX } from 'solid-js';
import styles from './Layout.module.css';
import Navbar from "../Navbar/Navbar";

/*
  The Layout component provides the basic structure for all pages.
  It includes the persistent Navbar at the top and a main content
  area where page components (its children) are rendered.
*/

// Define the type for the component's props.
// It accepts 'children' which can be any valid JSX element.
type LayoutProps = {
  children: JSX.Element;
  onNavigate: (region: string) => void;
};

const Layout: Component<LayoutProps> = (props) => {
  return (
    <div class={styles.layout}>
      <Navbar onNavigate={props.onNavigate} />
      <main class={styles.mainContent}>{props.children}</main>
    </div>
  );
};

export default Layout;
