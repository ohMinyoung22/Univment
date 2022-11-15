import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import Header from "../components/Header";
import styled from "styled-components";
import axios from "axios";

// FormHelper--------------------------------------------------------------------------
const FormHelperNames = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: ${(props) => (props.isname === "true" ? "#71c4eb" : "#d32f2f")} !important;
`;
const FormHelperEmails = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: ${(props) => (props.isemail === "true" ? "#71c4eb" : "#d32f2f")} !important;
`;
const FormHelperPWs = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: ${(props) => (props.ispassword1 === "true" ? "#71c4eb" : "#d32f2f")} !important;
`;
const FormHelperPWCF = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: ${(props) => (props.ispassword2 === "true" ? "#71c4eb" : "#d32f2f")} !important;
`;
const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

// Axios Global settings-------------------------------------------------------------------
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;

// main Component--------------------------------------------------------------------------
const SignUp = () => {
  const navigate = useNavigate();
  // Input State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  // ErrorMessage State
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password1Message, setPassword1Message] = useState("");
  const [password2Message, setPassword2Message] = useState("");

  // Validation State
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword1, setIsPassword1] = useState(false);
  const [isPassword2, setIsPassword2] = useState(false);

  //--------------------------------------------------------------------------------------

  // Name 유효성 관리
  const onChangeName = useCallback((e) => {
    const nameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{1,10}$/;
    const nameCurrent = e.target.value;
    setName(nameCurrent);
    if (!nameRegex.test(nameCurrent)) {
      setNameMessage("한글 또는 영문자만 가능합니다.[1~10글자]");
      setIsName(false);
    } else {
      setNameMessage("올바른 이름 형식입니다");
      setIsName(true);
    }
  }, []);

  // Email 유효성 관리
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸습니다");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식입니다");
      setIsEmail(true);
    }
  }, []);

  // 비밀번호 유효성 관리
  const onChangePassword1 = useCallback((e) => {
    const password1Regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const password1Current = e.target.value;
    setPassword1(password1Current);

    if (!password1Regex.test(password1Current)) {
      setPassword1Message("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요");
      setIsPassword1(false);
    } else {
      setPassword1Message("안전한 비밀번호입니다");
      setIsPassword1(true);
    }
  }, []);

  // 비밀번호 확인 유효성 관리
  const onChangePassword2 = useCallback(
    (e) => {
      const password2Current = e.target.value;
      setPassword2(password2Current);

      if (password1 === password2Current) {
        setPassword2Message("비밀번호를 똑같이 입력했어요");
        setIsPassword2(true);
      } else {
        setPassword2Message("비밀번호가 틀렸습니다. 다시 확인해주세요");
        setIsPassword2(false);
      }
    },
    [password1]
  );

  // Boxs Form 버튼 클릭 시 실행-------------------------------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const joinData = {
      name: data.get("name"),
      email: data.get("email"),
      password1: data.get("password1"),
      password2: data.get("password2"),
    };
    // const { name, email, password1, password2 } = joinData;
    await axios
      .post("http://127.0.0.1:8000/auth/registration/", joinData)
      .then((response) => {
        console.log(response.data);
        const accessToken = response.data.access_token;
        // API 요청 콜마다 헤더에 accessToken 담아 보내기
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        localStorage.setItem("refresh-token", response.data.refresh_token);
        localStorage.setItem("id", response.data.user.pk);
        localStorage.setItem("email", response.data.user.email);
        alert("회원가입 성공");
        navigate("/signIn", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert("회원가입 요청 실패, 다시 시도해주세요.");
        const message = error.request.responseText;
        if (message.includes(`이미 이 이메일 주소로 등록된 사용자가 있습니다.`)) {
          setIsEmail(false);
          setEmailMessage("이미 이 이메일 주소로 등록된 사용자가 있습니다.");
        }
      });
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <Typography component="h1" variant="h5" fontFamily="Jeju Myeongjo" color="#18264f">
            회원가입을 진행해주세요
          </Typography>
          <Boxs
            component="form"
            onSubmit={onSubmit}
            sx={{
              mt: 3,
            }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    onChange={onChangeName}
                    error={name !== "" && !isName}
                  />
                </Grid>
                <FormHelperNames isname={isName ? "true" : "false"}>{nameMessage}</FormHelperNames>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={onChangeEmail}
                    error={email !== "" && !isEmail}
                  />
                </Grid>
                <FormHelperEmails isemail={isEmail ? "true" : "false"}>
                  {emailMessage}
                </FormHelperEmails>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password1"
                    name="password1"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    onChange={onChangePassword1}
                    error={password1 !== "" && !isPassword1}
                  />
                </Grid>
                <FormHelperPWs ispassword1={isPassword1 ? "true" : "false"}>
                  {password1Message}
                </FormHelperPWs>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password2"
                    name="password2"
                    label="비밀번호 재입력"
                    onChange={onChangePassword2}
                    error={password2 !== "" && !isPassword2}
                  />
                </Grid>
                <FormHelperPWCF ispassword2={isPassword2 ? "true" : "false"}>
                  {password2Message}
                </FormHelperPWCF>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#383b3d",
                  fontFamily: "Jeju Myeongjo",
                }}
                size="large"
                style={{
                  height: "5.5vh",
                }}
                disabled={!(isName && isEmail && isPassword1 && isPassword2)}
              >
                회원가입 신청
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
