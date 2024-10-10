import React from "react";
import { Typography } from "@mui/material";
import NumberGrid from "@/components/NumberGrid/NumberGrid";
const Index = () => {
  return (
    <div>
      <Typography alignContent={"center"} variant="h6" gutterBottom>
        PopMart Ted 2
      </Typography>
      {/* <Typography variant="body1">Welcome to the Booking page!</Typography> */}
      <NumberGrid userName={"Ben"} />
    </div>
  );
};

export default Index;
