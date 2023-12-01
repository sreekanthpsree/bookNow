import Link from "next/link";
import React from "react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={` flex justify-between ${styles.footer}`}>
      <p className="col-md-4 px-2  m-4">© 2023 bookNow, Inc</p>
      <ul className="nav col-md-4 m-4 justify-content-end">
        <li className="nav-item">
          <Link href="#" className={`${styles.navLink} px-2`}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link href="#" className={`${styles.navLink} px-2`}>
            Features
          </Link>
        </li>
        <li className="nav-item">
          <Link href="#" className={`${styles.navLink} px-2`}>
            Pricing
          </Link>
        </li>
        <li className="nav-item">
          <Link href="#" className={`${styles.navLink} px-2`}>
            FAQs
          </Link>
        </li>
        <li className="nav-item">
          <Link href="#" className={`${styles.navLink} px-2`}>
            About
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
