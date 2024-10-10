import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Notifications as BellIcon } from "@mui/icons-material";

const Header = () => {
  return (
    <header
      style={{
        position: "fixed",
        width: "100%", // Set width to 100% for auto adjustment
        maxWidth: 500, // Optional: Set a max width if needed
        zIndex: 10,
      }}
    >
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography color="error" variant="h5" fontWeight={"bold"}>
            จับเบอร์ของรางวัล
          </Typography>
          <Box display="flex" alignItems="center">
            {/* <Typography variant="h5" color="error" fontWeight={"bold"} mr={2}>
              POPMART
            </Typography> */}
            <IconButton>
              <BellIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        bgcolor="error.main"
        color="common.white"
        textAlign="center"
        py={1}
        px={2}
      >
        <Typography variant="caption">
          โปรดอ่านรายละเอียดให้เข้าใจก่อนเล่นเนื่องจากไม่สามารถยกเลิกได้
        </Typography>
      </Box>
    </header>
  );
};

export default Header;
