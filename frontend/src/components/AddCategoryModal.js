import { Grid, TextField, Container, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../static/css/Modal.module.css";

const AddCategoryModal = ({ setAddCategoryModal }) => {
  const { category, setCategory } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [newCategory, setNewCategory] = useState({ name: "", color: "" });
  const id = localStorage.getItem("id");
  // Modal
  const outSection = useRef();
  const closeModal = (e) => {
    if (e.target === outSection.current) setAddCategoryModal(false);
  };
  const onChange = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    setNewCategory({ name: input, color: "#f0f0e4" });
  }, [input]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setCategory([...category, newCategory]);
    const addCategoryData = {
      name: input,
      isDefault: false,
      generated_user: id,
    };
    await axios
      .post("http://127.0.0.1:8000/post/category/", addCategoryData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setInput("");
  };
  return (
    <>
      <Container className={styles.modalContainer} ref={outSection} onClick={closeModal}>
        <Grid
          component="form"
          container
          wrap="nowrap"
          sx={{
            border: "3px solid #18264f",
            borderRadius: 10,
            backgroundColor: "#18264f",
            boxShadow: "7px 5px 15px -7px rgba(0, 0, 0, 0.5)",
            zIndex: 1,
            width: "75vw",
            height: "70vh",
            position: "absolute",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className={styles.modalClose} onClick={() => setAddCategoryModal(false)}>
            X
          </span>
          <Typography
            component="h1"
            variant="h6"
            fontFamily="Jeju Myeongjo"
            color="#f0f0e4"
            marginTop={10}
          >
            새로운 카테고리를 추가하세요.
          </Typography>
          <TextField
            autoFocus
            required
            fullWidth
            variant="filled"
            color="info"
            id="category"
            name="category"
            label="카테고리 추가"
            inputProps={{
              style: {
                backgroundColor: "#f0f0e4",
                opacity: "75%",
                borderRadius: 15,
              },
            }}
            sx={{ marginTop: 5, maxWidth: "sm" }}
            onChange={onChange}
          />
          <Grid item sx={{ marginTop: 10 }}>
            {category.map((value, idx) => (
              <Button
                variant="contained"
                key={idx}
                sx={{
                  fontFamily: "Jeju Myeongjo",
                  backgroundColor: value.color,
                }}
              >
                {value.name}
              </Button>
            ))}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="info"
            sx={{
              mt: 3,
              fontFamily: "Jeju Myeongjo",
              position: "absolute",
              right: "3vw",
              bottom: "2vh",
            }}
            onClick={onSubmit}
          >
            등록
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default memo(AddCategoryModal);
