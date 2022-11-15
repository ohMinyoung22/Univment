import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import Header from "../components/Header";

const Storage = () => {
  const id = localStorage.getItem("id");
  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:8000/post/category/${id}/`);
  // }, []);
  const postCard = [
    // postList.map((value, idx) => (
    //   <Grid
    //     item
    //     key={idx}
    //     xs={4}
    //     md={3}
    //     lg={2.3}
    //     xl={2}
    //     sx={{
    //       border: "1px solid #18264f",
    //       width: "10vw",
    //       height: "10vh",
    //       marginTop: 1,
    //       boxShadow: "7px -1px 2px 3px rgba(0, 0, 0, 0.5)",
    //     }}
    //   >
    //     <Typography sx={{ fontFamily: "Jeju Myeongjo", textAlign: "center" }}></Typography>
    //   </Grid>
    // )),
  ];
  const nonPostCard = [
    <Typography sx={{ fontFamily: "Jeju Myeongjo", textAlign: "center" }}>
      등록된 게시물이 없습니다.
    </Typography>,
  ];
  return (
    <>
      <Header />
      <Container sx={{ border: "1px solid #18264f", minHeight: "90vh" }}>
        {/* <Grid Container>{postList ? [postCard] : [nonPostCard]}</Grid> */}
      </Container>
    </>
  );
};

export default Storage;
