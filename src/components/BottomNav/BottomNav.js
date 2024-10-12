import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { CalendarToday, List, Person } from "@mui/icons-material";

const BottomNav = () => {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState(router.pathname); // สถานะที่ใช้ในการเก็บ path ที่เลือก

  const navItems = [
    { paths: ["/"], label: "กิจกรรม", icon: <CalendarToday /> },
    {
      paths: ["/my-bookings", "/payment-summary"],
      label: "กระเป๋าของฉัน",
      icon: <List />,
    },
    { paths: ["/profile"], label: "โปรไฟล์", icon: <Person /> },
  ];

  const handleNavigationChange = (newValue) => {
    setSelectedPath(newValue); // เปลี่ยนสถานะทันทีที่มีการคลิก
    router.push(newValue); // เปลี่ยนเส้นทางไปยังหน้าใหม่
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        boxShadow: "none",
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ height: "58px" }}
        value={selectedPath} // ใช้ selectedPath จาก useState
        onChange={(event, newValue) => {
          handleNavigationChange(newValue); // เรียกใช้งานฟังก์ชันเปลี่ยนสถานะเมื่อคลิก
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.paths[0]}
            label={item.label}
            icon={item.icon}
            value={item.paths[0]}
            showLabel
            sx={{
              color: item.paths.includes(selectedPath)
                ? "error.main"
                : "text.secondary",
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
