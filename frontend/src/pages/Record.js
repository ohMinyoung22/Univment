import React from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  MenuItem,
  FormControl,
} from "@mui/material/";
import Header from "../components/Header";

const Record = () => {
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
                  오늘의 기록을 도와드릴게요.
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
                  color="info"
                >
                  <MenuItem>동아리</MenuItem>
                  <MenuItem>대외활동</MenuItem>
                  <MenuItem>학점</MenuItem>
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
                  name="experience"
                  label="어떤 경험인가요?"
                  multiline
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
                  name="nice"
                  label="좋았던 점"
                  multiline
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
                  name="bad"
                  label="아쉬웠던 점"
                  multiline
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
                  name="learn"
                  label="무엇을 배웠나요?"
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ border: "1px solid #383b3d", color: "#383b3d" }}
                >
                  사진 첨부
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" sx={{ backgroundColor: "#383b3d" }}>
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

export default Record;
