import { Box } from "@mui/system";
import React, { memo } from "react";

const DefaultImg = ({ profileImage }) => {
  return (
    <>
      {profileImage ? (
        <Box
          sx={{
            border: "none",
            borderRadius: 5,
            width: "20vh",
            height: "20vh",
            backgroundImage: `url(${profileImage})`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            boxShadow: "7px 5px 15px -7px rgba(0, 0, 0, 0.5)",
          }}
        ></Box>
      ) : (
        <Box
          sx={{
            border: "none",
            borderRadius: 5,
            width: "20vh",
            height: "20vh",
            backgroundImage: "url(images/default.jpg)",
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            boxShadow: "7px 5px 15px -7px rgba(0, 0, 0, 0.5)",
          }}
        ></Box>
      )}
    </>
  );
};

export default memo(DefaultImg);
