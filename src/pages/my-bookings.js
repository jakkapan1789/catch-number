import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  Box,
  CardContent,
  Stack,
  Button,
} from "@mui/material";

const Booking = () => {
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      product: "Ted 2",
      number: "07",
      status: "รอการชำระเงิน",
      timeLeft: 15 * 60,
    },
    {
      id: 2,
      product: "Inception",
      number: "15",
      status: "รอการชำระเงิน",
      timeLeft: 10 * 60,
    },
    {
      id: 3,
      product: "Inception",
      number: "07",
      status: "รอการชำระเงิน",
      timeLeft: 10 * 60,
    },
    {
      id: 4,
      product: "Inception",
      number: "03",
      status: "รอการชำระเงิน",
      timeLeft: 10 * 60,
    },
    {
      id: 5,
      product: "Inception",
      number: "09",
      status: "รอการชำระเงิน",
      timeLeft: 10 * 60,
    },
  ]);

  // Countdown logic for each booking
  useEffect(() => {
    const timers = bookings.map((booking, index) => {
      if (booking.timeLeft > 0) {
        return setInterval(() => {
          setBookings((prevBookings) =>
            prevBookings.map((b) =>
              b.id === booking.id ? { ...b, timeLeft: b.timeLeft - 1 } : b
            )
          );
        }, 1000);
      }
      return null;
    });

    // Clear intervals on unmount
    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [bookings]);

  // Convert timeLeft from seconds to minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle cancel booking
  const handleCancel = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  // Handle payment action
  const handlePayment = (id) => {
    alert(`ชำระเงินสำหรับการจองเลข ${id}`);
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        รายการจองของคุณ
      </Typography>

      {bookings.map((booking) => (
        <div key={booking.id} data-aos="fade-up" data-aos-duration="300">
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" flexDirection="column">
                <Typography variant="body">
                  สินค้า: {booking.product}
                </Typography>
                <Stack
                  direction={"row"}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography variant="body" color="textSecondary">
                    เลข {booking.number}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {booking.status}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="error" sx={{ mt: 2 }}>
                  เวลาในการชำระเงิน: {formatTime(booking.timeLeft)}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleCancel(booking.id)}
                >
                  ยกเลิกการจอง
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handlePayment(booking.id)}
                >
                  ชำระเงิน
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
};

export default Booking;
