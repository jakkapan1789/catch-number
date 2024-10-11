import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  Box,
  CardContent,
  Stack,
} from "@mui/material";

const Booking = () => {
  // Set initial time for 15 minutes (15 * 60 seconds)
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // Clear the timer when the component is unmounted
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Convert timeLeft from seconds to minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div data-aos="fade-up" data-aos-duration="300">
      <Typography variant="h5" fontWeight="bold">
        รายการจองของคุณ
      </Typography>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" fontWeight="bold">
              สินค้า : Ted 2
            </Typography>
            <Stack
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography variant="caption" color="textSecondary">
                เลข 07
              </Typography>
              <Typography variant="caption" color="textSecondary">
                รอการชำระเงิน
              </Typography>
            </Stack>
            <Typography variant="caption" color="error" sx={{ mt: 2 }}>
              เวลาในการชำระเงิน: {formatTime(timeLeft)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking;
