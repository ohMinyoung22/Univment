import React from "react";
import { Link } from "react-router-dom";
import styles from "../static/css/Mypage.module.css";

const MypageComponent = () => {
  return (
    <>
      <Link className={styles.sidebar} to="/mypage">
        Mypage
      </Link>
    </>
  );
};

export default MypageComponent;
