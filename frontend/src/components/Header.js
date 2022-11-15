import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "../static/css/Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const move = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <div className={styles.headerBody}>
        <section className={styles.logo} onClick={move}>
          UNIVMENT
        </section>
      </div>
    </>
  );
};

export default Header;
