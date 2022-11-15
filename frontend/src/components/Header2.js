import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../static/css/Header2.module.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.headerBody}>
        <section className={styles.logo} onClick={() => navigate("/")}>
          UNIVMENT
        </section>
      </div>
    </>
  );
};

export default Header;
