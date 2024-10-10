// // import React from "react";
// // import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
// // import { useRouter } from "next/router";
// // import { CalendarToday, List, Person } from "@mui/icons-material";

// // const BottomNav = () => {
// //   const router = useRouter();
// //   const navItems = [
// //     { path: "/", label: "กิจกรรม", icon: <CalendarToday /> },
// //     { path: "/my-bookings", label: "กระเป๋าของฉัน", icon: <List /> },
// //     { path: "/profile", label: "โปรไฟล์", icon: <Person /> },
// //   ];

// //   return (
// //     <Paper
// //       sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
// //       elevation={3}
// //     >
// //       <BottomNavigation
// //         value={router.pathname}
// //         onChange={(event, newValue) => {
// //           router.push(newValue);
// //         }}
// //       >
// //         {navItems.map((item) => (
// //           <BottomNavigationAction
// //             key={item.path}
// //             label={item.label}
// //             icon={item.icon}
// //             value={item.path}
// //             showLabel
// //             sx={{
// //               color:
// //                 router.pathname === item.path ? "error.main" : "text.secondary",
// //             }}
// //           />
// //         ))}
// //       </BottomNavigation>
// //     </Paper>
// //   );
// // };

// // export default BottomNav;

// import React from "react";
// import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
// import { useRouter } from "next/router";
// import { CalendarToday, List, Person } from "@mui/icons-material";

// const BottomNav = () => {
//   const router = useRouter();
//   const navItems = [
//     { path: "/", label: "กิจกรรม", icon: <CalendarToday /> },
//     { path: "/my-bookings", label: "กระเป๋าของฉัน", icon: <List /> },
//     { path: "/profile", label: "โปรไฟล์", icon: <Person /> },
//   ];

//   return (
//     <Paper
//       sx={{
//         position: "fixed",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         width: 500,
//         margin: "0 auto",
//         boxShadow: "none",
//       }}
//       elevation={3}
//     >
//       <BottomNavigation
//         value={router.pathname}
//         onChange={(event, newValue) => {
//           router.push(newValue);
//         }}
//       >
//         {navItems.map((item) => (
//           <BottomNavigationAction
//             key={item.path}
//             label={item.label}
//             icon={item.icon}
//             value={item.path}
//             showLabel
//             sx={{
//               color:
//                 router.pathname === item.path ? "error.main" : "text.secondary",
//             }}
//           />
//         ))}
//       </BottomNavigation>
//     </Paper>
//   );
// };

// export default BottomNav;

import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { CalendarToday, List, Person } from "@mui/icons-material";

const BottomNav = () => {
  const router = useRouter();
  const navItems = [
    { path: "/", label: "กิจกรรม", icon: <CalendarToday /> },
    { path: "/my-bookings", label: "กระเป๋าของฉัน", icon: <List /> },
    { path: "/profile", label: "โปรไฟล์", icon: <Person /> },
  ];

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%", // Set width to 100% for auto adjustment
        maxWidth: 500, // Optional: Set a max width if needed
        margin: "0 auto",
        boxShadow: "none",
      }}
      elevation={3}
    >
      <BottomNavigation
        value={router.pathname}
        onChange={(event, newValue) => {
          router.push(newValue);
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={item.icon}
            value={item.path}
            showLabel
            sx={{
              color:
                router.pathname === item.path ? "error.main" : "text.secondary",
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
