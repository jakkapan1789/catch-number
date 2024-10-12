import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Box,
  CardContent,
  Stack,
  Button,
  Chip,
  Divider,
  Tabs,
  Tab,
  CardMedia,
  Skeleton,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
const Booking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      product: "POPMART - Ted 2",
      number: "07",
      status: 0,
      displayStatus: "รอชำระเงิน",
      timeLeft: 15 * 60,
      price: 20,
      paymentId: null,
    },
    {
      id: 2,
      product: "POPMART - Ted 2",
      number: "15",
      status: 0,
      displayStatus: "รอชำระเงิน",
      timeLeft: 10 * 60,
      price: 20,
      paymentId: null,
    },
  ]);

  const [tabValue, setTabValue] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [paymentId, setPaymentId] = useState(null); // State สำหรับเก็บ paymentId

  useEffect(() => {
    const timers = bookings.map((booking) => {
      if (booking.timeLeft > 0 && booking.status === 0) {
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

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [bookings]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleCancel = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const handlePayment = () => {
    // สร้าง paymentId ใหม่
    const newPaymentId = Date.now(); // ใช้ timestamp เป็น paymentId
    setPaymentId(newPaymentId);

    // อัปเดต paymentId ในการจองที่รอชำระเงิน
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.displayStatus === "รอชำระเงิน"
          ? { ...booking, paymentId: newPaymentId }
          : booking
      )
    );

    setShowSummary(true); // เปลี่ยน state เพื่อแสดง PaymentSummary
  };

  const handleConfirmPayment = () => {
    // อัปเดตสถานะการชำระเงิน
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.paymentId === paymentId
          ? { ...booking, status: 1, displayStatus: "ชำระเงินเรียบร้อย" }
          : booking
      )
    );
    setShowSummary(!showSummary);
    setTabValue(1);

    // console.log("Payment confirmed!");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (tabValue === 0) {
      return booking.displayStatus === "รอชำระเงิน";
    } else {
      return booking.displayStatus === "ชำระเงินเรียบร้อย";
    }
  });

  // PaymentSummary Component
  const PaymentSummary = () => {
    const totalAmount = bookings.reduce(
      (acc, booking) =>
        acc + (booking.paymentId === paymentId ? booking.price : 0),
      0
    );

    return (
      <div>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          สรุปการชำระเงิน
        </Typography>

        <div>
          <Card sx={{ mb: 1 }}>
            <CardContent>
              <Typography variant="body" fontWeight={"bold"}>
                คำสั่งซื้อ # PAY0001
              </Typography>
              <Stack sx={{ mt: 1 }} direction={"column"}>
                {bookings
                  .filter((booking) => booking.paymentId === paymentId)
                  .map((booking) => (
                    <Stack direction={"column"} sx={{ mb: 1 }} key={booking.id}>
                      <Typography variant="caption">
                        {booking.product}
                      </Typography>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        display={"flex"}
                      >
                        <Typography variant="caption">
                          หมายเลข {booking.number}
                        </Typography>
                        <Typography variant="caption">
                          ราคา: ฿{booking.price.toLocaleString()}
                        </Typography>
                      </Stack>
                      {/* <Divider /> */}
                    </Stack>
                  ))}
              </Stack>

              <Divider sx={{ mt: 2, mb: 0.5 }} />
              <Typography variant="body1" fontWeight={"bold"}>
                ยอดรวม: ฿{totalAmount.toLocaleString()}
              </Typography>
              {/* <Typography color="green">ชำระเงินเรียบร้อยแล้ว</Typography> */}
            </CardContent>
          </Card>
          <Stack alignItems="center" sx={{ mt: 0 }}>
            <Typography variant="caption" color="textSecondary">
              QR Code สำหรับชำระเงิน
            </Typography>
            <QrCodeCard qrCodeUrl={""} title={"Payment"} />
          </Stack>

          <Stack sx={{ mt: 2 }} alignItems="center">
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleConfirmPayment}
              endIcon={<EastIcon />}
            >
              ยืนยันการชำระเงิน
            </Button>
          </Stack>
        </div>
      </div>
    );
  };

  return (
    <>
      {showSummary ? (
        <div data-aos="fade-up" data-aos-duration="300">
          <PaymentSummary />
        </div>
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            รายการจองของคุณ
          </Typography>

          <Tabs
            textColor="inherit"
            value={tabValue}
            onChange={handleTabChange}
            sx={{ mb: 2 }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "red",
              },
            }}
          >
            <Tab label="รอชำระเงิน" />
            <Tab label="ชำระเงินเรียบร้อย" />
          </Tabs>

          {filteredBookings.length !== 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} data-aos="fade-up" data-aos-duration="300">
                <Card sx={{ mb: 1, borderRadius: 2, boxShadow: 0 }}>
                  <CardContent>
                    <Box display="flex" flexDirection="column" sx={{ mt: -1 }}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Stack direction={"row"} alignItems={"center"}>
                          <Typography variant="body">
                            {booking.product}
                          </Typography>
                        </Stack>

                        <Chip
                          label={booking.displayStatus}
                          variant="outlined"
                          size="small"
                        />
                      </Stack>

                      <Stack
                        direction={"row"}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Typography variant="body" color="textSecondary">
                          หมายเลข {booking.number}
                        </Typography>
                        <Typography variant="body1" color="error">
                          ราคา: ฿{booking.price.toLocaleString()}
                        </Typography>
                      </Stack>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 1 }}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      {booking.status === 0 && (
                        <Typography variant="caption" color="error">
                          เหลือเวลาในการชำระเงิน: {formatTime(booking.timeLeft)}
                        </Typography>
                      )}
                    </Stack>
                    <Divider sx={{ mt: 0.7, mb: 1 }} />
                    {booking.displayStatus === "รอชำระเงิน" && (
                      <Stack direction={"row"} sx={{ mb: -2 }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleCancel(booking.id)}
                        >
                          ยกเลิกการจอง
                        </Button>
                      </Stack>
                    )}
                    {booking.displayStatus === "ชำระเงินเรียบร้อย" && (
                      <Stack direction={"row"} sx={{ mb: -2 }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="inherit"
                          size="small"
                          // onClick={() => handleCancel(booking.id)}
                        >
                          รอตรวจสอบผลรางวัล
                        </Button>
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div data-aos="fade-up" data-aos-duration="300">
              <Typography
                variant="body"
                color="textSecondary"
                display={"flex"}
                alignContent={"center"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ mt: 2 }}
              >
                ไม่พบรายการ
              </Typography>
            </div>
          )}

          {(tabValue === 0) & (filteredBookings.length !== 0) ? (
            <Stack alignContent={"right"}>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 1, fontWeight: "bold" }}
                onClick={handlePayment}
              >
                ชำระเงินทั้งหมด
              </Button>
            </Stack>
          ) : null}
        </>
      )}
    </>
  );
};

export default Booking;

const QrCodeCard = ({ qrCodeUrl, title }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      {qrCodeUrl ? (
        <CardMedia
          component="img"
          height="200"
          image={qrCodeUrl}
          alt="QR Code"
          sx={{ padding: "1rem", objectFit: "contain" }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width={200}
          height={200}
          sx={{ padding: "1rem" }}
        />
      )}
    </Card>
  );
};
