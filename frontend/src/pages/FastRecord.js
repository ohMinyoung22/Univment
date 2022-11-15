import React, { useContext, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material/";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const FastRecord = () => {
  const { setIsLoggedIn, category } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    title: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    image: null,
    category: "",
    timeline: true,
    email: "",
    password: "",
  });

  // Handling
  const categoryChange = (e) => {
    setInputs({
      ...inputs,
      category: e.target.value,
    });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setInputs({
      ...inputs,
      image: file,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (inputs?.image) {
      formData.append("image", inputs.image, inputs.image.name);
    } else {
      window.alert("이미지를 다시 첨부하세요.");
    }
    formData.append("title", inputs.title);
    formData.append("answer1", inputs.answer1);
    formData.append("answer2", inputs.answer2);
    formData.append("answer3", inputs.answer3);
    formData.append("answer4", inputs.answer4);
    formData.append("category", inputs.category);
    formData.append("timeline", inputs.timeline);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    await axios
      .post("http://127.0.0.1:8000/post/postwithlogin/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        // setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <Box
          component="form"
          sx={{ marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <FormControl component="fieldset">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h4" fontFamily="Jeju Myeongjo" color="#383b3d">
                  오늘의 빠른 기록을 도와드릴게요.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  color="info"
                  id="title"
                  name="title"
                  label="제목을 입력하세요."
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  select
                  fullWidth
                  id="category"
                  name="category"
                  label="카테고리"
                  value={inputs.category}
                  onChange={categoryChange}
                  helperText="등록될 카테고리를 선택해주세요."
                >
                  {category.map((value, idx) => (
                    <MenuItem key={idx} value={value.name}>
                      {value.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  color="info"
                  minRows={5}
                  id="experience"
                  name="answer1"
                  label="어떤 경험인가요?"
                  multiline
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  color="info"
                  minRows={3}
                  id="nice"
                  name="answer2"
                  label="좋았던 점"
                  multiline
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  color="info"
                  minRows={3}
                  id="bad"
                  name="answer3"
                  label="아쉬웠던 점"
                  multiline
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  color="info"
                  minRows={4}
                  id="learn"
                  name="answer4"
                  label="무엇을 배웠나요?"
                  multiline
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                {inputs.image ? (
                  <Grid
                    sx={{
                      border: "none",
                      borderRadius: 5,
                      width: "20vh",
                      height: "20vh",
                      backgroundImage: `url(http://127.0.0.1:8000/media/${inputs.image.name})`,
                      backgroundSize: `cover`,
                      backgroundRepeat: `no-repeat`,
                      backgroundPosition: `center`,
                      boxShadow: "7px 5px 15px -7px rgba(0, 0, 0, 0.5)",
                    }}
                  ></Grid>
                ) : (
                  <Grid hidden></Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  color="info"
                  sx={{ border: "1px solid #18264f", backgroundColor: "#18264f", color: "f0f0e4" }}
                >
                  사진 첨부
                  <input hidden accept="image/*" multiple type="file" onChange={onLoadFile} />
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={onChange}
                />
                <FormHelperText>별도 회원가입 후 이용 가능합니다.</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: "#18264f", marginBottom: 10 }}
                  onClick={onSubmit}
                >
                  기록
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default FastRecord;
