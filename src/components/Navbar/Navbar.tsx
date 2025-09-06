import {Component, For, Show} from 'solid-js';
import { createSignal } from 'solid-js';
import styles from './Navbar.module.css';
import {useFishProvider} from "../../context/DataContext";

interface NavbarProps {
  onNavigate: (region: string) => void;
}

const Navbar: Component<NavbarProps> = (props) => {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const regions = useFishProvider();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen());
  };

  const handleNavigation = (region: string) => {
    props.onNavigate(region);
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => handleNavigation('home')}>
        Fish Facts
      </div>
      <button className={styles.menuIcon} onClick={toggleMenu} aria-label="Toggle menu">
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </button>
      <ul classList={{[styles.navLinks]: true, [styles.mobile]: menuOpen()}}>
        <li>
          <a onClick={() => handleNavigation('home')}>Home</a>
        </li>
        <Show when={!regions.loading} fallback={<li><a>Loading Regions...</a></li>}>
          <For each={Object.keys(regions() || {})}>
            {(region) => (
              <li>
                <a onClick={() => handleNavigation(region)}>{region}</a>
              </li>
            )}
          </For>
        </Show>
      </ul>
    </nav>
  );
};

export default Navbar;
