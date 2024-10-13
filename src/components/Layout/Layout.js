// // import React from "react";
// // import Header from "../Header/Header";
// // import BottomNav from "../BottomNav/BottomNav";
// // import { Box, Container } from "@mui/material";
// // import Aos from "aos";

// // const Layout = ({ children }) => {
// //   return (
// //     <Box
// //       display="flex"
// //       flexDirection="column"
// //       minHeight="100vh"
// //       bgcolor="grey.100"
// //       margin="0 auto"
// //       width={500}
// //     >
// //       <Header />
// //       <Container component="main" sx={{ flexGrow: 1, py: 15 }}>
// //         {children}
// //       </Container>
// //       <BottomNav />
// //     </Box>
// //   );
// // };

// // export default Layout;

// import React from "react";
// import Header from "../Header/Header";
// import BottomNav from "../BottomNav/BottomNav";
// import { Box, Container } from "@mui/material";

// const Layout = ({ children }) => {
//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       minHeight="100vh"
//       bgcolor="grey.100"
//       margin="0 auto"
//       sx={{
//         width: "100%",
//         maxWidth: 400,
//       }}
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

const Layout = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="grey.100"
      margin="0 auto"
      sx={{
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Container component="main" sx={{ py: 15 }}>
          {children}
        </Container>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default Layout;
