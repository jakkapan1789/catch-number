// import React from "react";
// import Header from "../Header/Header";
// import BottomNav from "../BottomNav/BottomNav";
// import { Box, Container } from "@mui/material";
// import Aos from "aos";

// const Layout = ({ children }) => {
//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       minHeight="100vh"
//       bgcolor="grey.100"
//       margin="0 auto"
//       width={500}
//     >
//       <Header />
//       <Container component="main" sx={{ flexGrow: 1, py: 15 }}>
//         {children}
//       </Container>
//       <BottomNav />
//     </Box>
//   );
// };

// export default Layout;

import React from "react";
import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";
import { Box, Container } from "@mui/material";
// import Aos from "aos";

const Layout = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="grey.100"
      margin="0 auto"
      sx={{
        width: "100%", // Set width to 100% for auto adjustment
        maxWidth: 400, // Optional: Set a max width if needed
      }}
    >
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 15 }}>
        {children}
      </Container>
      <BottomNav />
    </Box>
  );
};

export default Layout;
