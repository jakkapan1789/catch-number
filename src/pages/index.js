import React from "react";
import { Typography } from "@mui/material";
import NumberGrid from "@/components/NumberGrid/NumberGrid";

import liff from "@line/liff";

const Index = () => {
  const fetchUserProfile = async () => {
    try {
      await liff.init({ liffId: "2006444115-GzEX7djW" });
      const profile = await liff.getProfile();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  React.useEffect(() => {
    // fetchUserProfile();
  }, []);
  return (
    <div data-aos="fade-up" data-aos-duration="300">
      <Typography alignContent={"center"} variant="h6" gutterBottom>
        PopMart Ted 2
      </Typography>
      <NumberGrid userName={"Ben"} />
    </div>
  );
};

export default Index;
