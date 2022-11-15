import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Grid, Typography, Container } from "@mui/material/";
import MypageComponent from "../components/MypageComponent";
import axios from "axios";
import AddCategoryModal from "../components/AddCategoryModal";
import { AuthContext } from "../context/AuthContext";

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
const Home = () => {
  // useEffect(() => {
  //   axios.get("/components/Interceptors").then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);
  const id = localStorage.getItem("id");
  const { category, setCategory } = useContext(AuthContext);
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8000/post/category/${id}/`)
  //     .then((response) => {
  //       console.log("fetch 성공", response);
  //     })
  //     .catch((error) => {
  //       console.log("fetch 실패", error);
  //     });
  // }, [category]);

  const addCategory = [
    <Grid
      item
      key="add"
      variant="contained"
      xs={4}
      md={3}
      lg={2.3}
      xl={2}
      sx={{
        border: "none",
        width: "10vw",
        height: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 1,
        backgroundColor: "#f0f0e4",
        color: "#18264f",
        boxShadow: "7px -1px 2px 3px rgba(0, 0, 0, 0.5)",
        cursor: "pointer",
        "&:hover": {
          color: "brown",
        },
      }}
      onClick={() => {
        setAddCategoryModal(true);
      }}
    >
      <Typography sx={{ fontFamily: "Jeju Myeongjo", textAlign: "center" }}>
        카테고리
        <br />
        추가
      </Typography>
    </Grid>,
  ];
  const categoryBook = [
    category.map((value, idx) => (
      <Grid
        item
        key={idx}
        xs={4}
        md={3}
        lg={2.3}
        xl={2}
        sx={{
          border: "none",
          width: "10vw",
          height: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 1,
          backgroundColor: value.color,
          color: "#f0f0e4",
          boxShadow: "7px -1px 2px 3px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography sx={{ fontFamily: "Jeju Myeongjo" }}>{value.name}</Typography>
      </Grid>
    )),
  ];
  return (
    <>
      <Header />
      <MypageComponent category={category} setCategory={setCategory} />
      <Container fixed sx={{ height: "60vh" }}>
        <Grid
          container
          sx={{
            height: "45%",
            marginTop: 7,
            justifyContent: "center",
            gridGap: 30,
          }}
        >
          {category.length < 9 ? [...categoryBook, addCategory] : [categoryBook]}
        </Grid>
      </Container>
      {addCategoryModal && <AddCategoryModal setAddCategoryModal={setAddCategoryModal} />}
      {/* <Button
        variant="contained"
        sx={{
          mt: 3,
          bgcolor: "#18264f",
          fontFamily: "Jeju Myeongjo",
          position: "absolute",
          left: "1vw",
          bottom: "1vh",
        }}
        size="large"
      >
        기록하러 가기
      </Button> */}
    </>
  );
};

export default Home;
