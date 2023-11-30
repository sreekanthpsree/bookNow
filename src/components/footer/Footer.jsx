import Link from "next/link";
import React from "react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer
      className={`p-4 flex relative  flex-wrap justify-content-between align-items-center py-3 my-4 ms-3 ${styles.footer}`}
    >
      <p className="col-md-4 mb-0 ">© 2023 bookNow, Inc</p>
      <ul className="nav col-md-4 justify-content-end">
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
