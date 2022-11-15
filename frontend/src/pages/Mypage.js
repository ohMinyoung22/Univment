import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Container, Grid, Typography } from "@mui/material/";
import styles from "../static/css/Mypage.module.css";
import DefaultImg from "../components/DefaultImg";
import Logout from "../components/Logout";
import axios from "axios";
import BasicModal from "../components/BasicModal";
import CategoryModal from "../components/CategoryModal";
import { AuthContext } from "../context/AuthContext";
import ClubModal from "../components/ClubModal";
import ContestModal from "../components/ContestModal";
import ProjectModal from "../components/ProjectModal";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const { category, setCategory, setIsLoggedIn } = useContext(AuthContext);
  // Profile
  const [profile, setProfile] = useState({
    user: id,
    myname: "",
    email: "",
    major: "",
    image: null,
  });

  // Modal
  const [basicModal, setBasicModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [clubModal, setClubModal] = useState(false);
  const [contestModal, setContestModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);

  // Fetch
  const fetchData = async () => {
    try {
      const requestImg = await axios.get("http://127.0.0.1:8000/auth/user/");
      const request = await axios.get(`http://127.0.0.1:8000/mypage/namecardprofile/${id}/`);
      console.log("마이페이지 Didmount", requestImg, request);
      setProfile({
        ...profile,
        myname: request.data.myname,
        email: request.data.email,
        major: request.data.major,
        image: requestImg.data.image,
      });
    } catch (error) {
      if (error.response.status === 403) {
        alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/signin");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handling
  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setProfile({
      ...profile,
      image: file,
    });
    if (profile?.image) {
      alert("이미지 첨부 성공, 등록 버튼을 눌러 수정사항을 저장하세요.");
    } else {
      alert("이미지 첨부 실패, 잠시 후 다시 시도하세요.");
    }
  };

  const fileSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (profile?.image) {
      formData.append("image", profile.image);
    } else {
      window.alert("이미지를 첨부해주세요.");
      return;
    }
    await axios
      .put("http://127.0.0.1:8000/auth/user/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("프로필 이미지 등록 성공");
        // localStorage.setItem("profileImage", response.data.image);
        setProfile({
          ...profile,
          image: response.data.image,
        });
      })
      .catch((error) => {
        alert("프로필 이미지 등록 실패");
        console.log(error);
        localStorage.removeItem("profileImage");
      });
  };
  return (
    <>
      <Header />
      <Logout />
      <Container
        component="main"
        maxWidth="md"
        sx={{ border: "1px solid black", minHeight: "90vh" }}
      >
        <Grid container rowGap={4} justifyContent="space-between">
          {/* 프로필 그리드------------------------------------------------ */}
          <Grid
            item
            xs={12}
            sx={{
              borderBottom: "3px dashed #18264f",
              height: "30vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              component="label"
              color="info"
              sx={{
                border: "1px solid #18264f",
                backgroundColor: "#18264f",
                color: "f0f0e4",
                fontFamily: "Jeju Myeongjo",
                position: "absolute",
                bottom: "1vh",
                height: "3vh",
              }}
            >
              첨부
              <input hidden accept="image/*" multiple type="file" onChange={onLoadFile} />
            </Button>
            <Button
              variant="contained"
              className={styles.basicBtn}
              sx={{
                color: "#fff",
                backgroundColor: "#18264f",
                border: "1px solid #18264f",
                fontFamily: "Jeju Myeongjo",
                position: "absolute",
              }}
              onClick={fileSubmit}
              // disabled={}
            >
              등록
            </Button>
            <DefaultImg profileImage={profile.image} />
          </Grid>
          {/* 베이직 그리드------------------------------------------------ */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              border: "1px solid #18264f",
              borderRadius: 5,
              boxShadow: "7px 5px 15px -12px rgba(0, 0, 0, 0.5)",
              minHeight: "20vh",
              position: "relative",
            }}
          >
            <Typography sx={{ fontFamily: "Jeju Myeongjo", margin: "1vh 0 0 1.5vh" }}>
              {profile.myname
                ? "이름 : " + profile.myname
                : "이름, 전공, 컨택 이메일을 입력해주세요"}
            </Typography>
            <Typography sx={{ fontFamily: "Jeju Myeongjo", margin: "1vh 0 0 1.5vh" }}>
              {profile.email ? "컨택 이메일 : " + profile.email : ""}
            </Typography>
            <Typography sx={{ fontFamily: "Jeju Myeongjo", margin: "1vh 0 0 1.5vh" }}>
              {profile.major ? "전공 : " + profile.major : ""}
            </Typography>
            <Button
              variant="contained"
              className={styles.basicBtn}
              sx={{
                color: "#fff",
                backgroundColor: "#18264f",
                border: "1px solid #383b3d",
                fontFamily: "Jeju Myeongjo",
                position: "absolute",
              }}
              onClick={() => setBasicModal(true)}
            >
              등록
            </Button>
          </Grid>
          {basicModal && (
            <BasicModal setBasicModal={setBasicModal} profile={profile} setProfile={setProfile} />
          )}
          {/* 카테고리 그리드------------------------------------------------ */}
          <Grid
            item
            xs={12}
            md={6.7}
            sx={{
              border: "1px solid #18264f",
              borderRadius: 5,
              boxShadow: "7px 5px 15px -12px rgba(0, 0, 0, 0.5)",
              minHeight: "20vh",
              alignItems: "flex-end",
              position: "relative",
            }}
          >
            {category.map((value, idx) => (
              <Button
                key={idx}
                variant="contained"
                sx={{
                  fontFamily: "Jeju Myeongjo",
                  margin: 0.8,
                  backgroundColor: value.color,
                }}
              >
                {value.name}
              </Button>
            ))}
            {categoryModal && <CategoryModal setCategoryModal={setCategoryModal} />}
            <Button
              variant="contained"
              className={styles.categoryBtn}
              sx={{
                color: "#fff",
                backgroundColor: "#18264f",
                border: "1px solid #383b3d",
                fontFamily: "Jeju Myeongjo",
                position: "absolute",
              }}
              onClick={() => setCategoryModal(true)}
            >
              수정
            </Button>
          </Grid>
          {/* 클럽 그리드------------------------------------------------ */}
          <Grid
            item
            xs={12}
            sx={{
              border: "1px solid #18264f",
              borderRadius: 5,
              boxShadow: "7px 5px 15px -12px rgba(0, 0, 0, 0.5)",
              minHeight: "20vh",
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              className={styles.clubBtn}
              sx={{
                color: "#fff",
                backgroundColor: "#18264f",
                border: "1px solid #383b3d",
                fontFamily: "Jeju Myeongjo",
                position: "absolute",
              }}
              onClick={() => setClubModal(true)}
            >
              등록
            </Button>
            <Typography sx={{ fontFamily: "Jeju Myeongjo", margin: "1vh 0 0 1.5vh" }}>
              클럽
            </Typography>
            {clubModal && <ClubModal setClubModal={setClubModal} />}
          </Grid>
          {/* 대회 그리드------------------------------------------------ */}
          <Grid
            item
            xs={12}
            sx={{
              border: "1px solid #18264f",
              borderRadius: 5,
              boxShadow: "7px 5px 15px -12px rgba(0, 0, 0, 0.5)",
              minHeight: "20vh",
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              className={styles.clubBtn}
              sx={{
                color: "#fff",
                backgroundColor: "#18264f",
                border: "1px solid #383b3d",
                fontFamily: "Jeju Myeongjo",
                position: "absolute",
              }}
              onClick={() => setContestModal(true)}
            >
              등록
            </Button>
            <Typography sx={{ fontFamily: "Jeju Myeongjo", margin: "1vh 0 0 1.5vh" }}>
              대회
            </Typography>
            {contestModal && <ContestModal setContestModal={setContestModal} />}
          </Grid>
          {/* 프로젝트 그리드------------------------------------------------ */}
          <Grid
            item
            xs={12}
            sx={{
              border: "1px solid #18264f",
              borderRadius: 5,
              boxShadow: "7px 5px 15px -12px rgba(0, 0, 0, 0.5)",
              minHeight: "20vh",
              position: "relative",
              marginBottom: 10,
            }}
          >
            <Button
              variant="contained"
              className={styles.clubBtn}
              sx={{
                color: "#fff",
                backgroundColor: "#18264f",
                border: "1px solid #383b3d",
                fontFamily: "Jeju Myeongjo",
                position: "absolute",
              }}
              onClick={() => setProjectModal(true)}
            >
              등록
            </Button>
            <Typography sx={{ fontFamily: "Jeju Myeongjo", margin: "1vh 0 0 1.5vh" }}>
              프로젝트
            </Typography>
            {projectModal && <ProjectModal setProjectModal={setProjectModal} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Mypage;
