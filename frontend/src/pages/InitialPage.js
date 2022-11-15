import React, { useContext } from "react";
import Header from "../components/Header";
import styles from "../static/css/InitialPage.module.css";
import ReactTypingEffect from "react-typing-effect";
import { Button } from "@mui/material";
import { border, width } from "@mui/system";
import { useNavigate } from "react-router-dom";
import FastRecord from "./FastRecord";
import { AuthContext } from "../context/AuthContext";

const InitialPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const yesClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/record");
    } else {
      navigate("/fastrecord");
    }
  };
  const noClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.textWrap}>
          <ReactTypingEffect
            text={[" '오늘 기록하고 싶은 일이 있었나요?' "]}
            cursorRenderer={(cursor) => <h3>{cursor}</h3>}
            speed={150}
          />
        </section>
        <section className={styles.btnWrap}>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              backgroundColor: "#18264f",
              border: "1px solid #383b3d",
              width: "12vh",
              fontFamily: "Jeju Myeongjo",
            }}
            onClick={yesClick}
          >
            네
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              backgroundColor: "#18264f",
              border: "1px solid #383b3d",
              width: "12vh",
              fontFamily: "Jeju Myeongjo",
            }}
            onClick={noClick}
          >
            아니오
          </Button>
        </section>
      </div>
    </>
  );
};

export default InitialPage;
