// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
//   Box,
//   CardContent,
//   Stack,
//   Button,
//   Chip,
//   Divider,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import { useRouter } from "next/router";

// const Booking = () => {
//   const [bookings, setBookings] = useState([
//     {
//       id: 1,
//       product: "POPMART - Ted2",
//       number: "07",
//       status: "รอชำระเงิน",
//       timeLeft: 15 * 60,
//       price: 20,
//     },
//     {
//       id: 2,
//       product: "Cry Baby SunSet",
//       number: "15",
//       status: "รอชำระเงิน",
//       timeLeft: 10 * 60,
//       price: 20,
//     },
//   ]);

//   const [tabValue, setTabValue] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const timers = bookings.map((booking) => {
//       if (booking.timeLeft > 0 && booking.status === "รอชำระเงิน") {
//         return setInterval(() => {
//           setBookings((prevBookings) =>
//             prevBookings.map((b) =>
//               b.id === booking.id ? { ...b, timeLeft: b.timeLeft - 1 } : b
//             )
//           );
//         }, 1000);
//       }
//       return null;
//     });

//     return () => {
//       timers.forEach((timer) => clearInterval(timer));
//     };
//   }, [bookings]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   const handleCancel = (id) => {
//     setBookings(bookings.filter((booking) => booking.id !== id));
//   };

//   const handlePayment = () => {
//     router.push({
//       pathname: "/payment-summary",
//       query: { bookings: JSON.stringify(bookings) },
//     });
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const filteredBookings = bookings.filter((booking) => {
//     if (tabValue === 0) {
//       return booking.status === "รอชำระเงิน";
//     } else {
//       return booking.status === "ชำระเงินเรียบร้อย";
//     }
//   });

//   return (
//     <>
//       <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
//         รายการจองของคุณ
//       </Typography>

//       <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
//         <Tab label="รอชำระเงิน" />
//         <Tab label="ชำระเงินเรียบร้อย" />
//       </Tabs>

//       {filteredBookings.map((booking) => (
//         <div key={booking.id}>
//           <Card sx={{ mb: 1, borderRadius: 2, boxShadow: 0 }}>
//             <CardContent>
//               <Box display="flex" flexDirection="column" sx={{ mt: -1 }}>
//                 <Stack
//                   direction={"row"}
//                   justifyContent={"space-between"}
//                   alignItems={"center"}
//                 >
//                   <Stack direction={"row"} alignItems={"center"}>
//                     <Typography variant="body">{booking.product}</Typography>
//                   </Stack>

//                   <Chip
//                     label={booking.status}
//                     variant="outlined"
//                     size="small"
//                   />
//                 </Stack>

//                 <Stack
//                   direction={"row"}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mt: 1,
//                   }}
//                 >
//                   <Typography variant="body" color="textSecondary">
//                     หมายเลข {booking.number}
//                   </Typography>
//                 </Stack>
//               </Box>

//               <Stack
//                 direction="row"
//                 spacing={1}
//                 sx={{ mt: 1 }}
//                 alignItems={"center"}
//                 justifyContent={"space-between"}
//               >
//                 <Typography variant="body1" color="error">
//                   ราคา: ฿{booking.price.toLocaleString()}
//                 </Typography>
//                 {booking.status === "รอชำระเงิน" && (
//                   <Typography variant="caption" color="error">
//                     เหลือเวลาในการชำระเงิน: {formatTime(booking.timeLeft)}
//                   </Typography>
//                 )}
//               </Stack>
//               <Divider sx={{ mt: 0.7, mb: 1 }} />
//               {booking.status === "รอชำระเงิน" && (
//                 <Stack direction={"row"} sx={{ mb: -2 }}>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     color="error"
//                     size="small"
//                     onClick={() => handleCancel(booking.id)}
//                   >
//                     ยกเลิกการจอง
//                   </Button>
//                 </Stack>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       ))}

//       {tabValue === 0 && (
//         <Stack alignContent={"right"}>
//           <Button
//             variant="contained"
//             color="error"
//             sx={{ mt: 1, fontWeight: "bold" }}
//             onClick={handlePayment}
//           >
//             ชำระเงินทั้งหมด
//           </Button>
//         </Stack>
//       )}
//     </>
//   );
// };

// export default Booking;

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
} from "@mui/material";
import { useRouter } from "next/router";

const Booking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      product: "POPMART - Ted2",
      number: "07",
      status: "รอชำระเงิน",
      timeLeft: 15 * 60,
      price: 20,
    },
    {
      id: 2,
      product: "Cry Baby SunSet",
      number: "15",
      status: "รอชำระเงิน",
      timeLeft: 10 * 60,
      price: 20,
    },
  ]);

  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timers = bookings.map((booking) => {
      if (booking.timeLeft > 0 && booking.status === "รอชำระเงิน") {
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
    router.push({
      pathname: "/payment-summary",
      query: { bookings: JSON.stringify(bookings) },
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (tabValue === 0) {
      return booking.status === "รอชำระเงิน";
    } else {
      return booking.status === "ชำระเงินเรียบร้อย";
    }
  });

  return (
    <>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        รายการจองของคุณ
      </Typography>

      <Tabs
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

      {filteredBookings.length > 0 ? (
        filteredBookings.map((booking) => (
          <div key={booking.id}>
            <Card sx={{ mb: 1, borderRadius: 2, boxShadow: 0 }}>
              <CardContent>
                <Box display="flex" flexDirection="column" sx={{ mt: -1 }}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack direction={"row"} alignItems={"center"}>
                      <Typography variant="body">{booking.product}</Typography>
                    </Stack>

                    <Chip
                      label={booking.status}
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
                  </Stack>
                </Box>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1 }}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body1" color="error">
                    ราคา: ฿{booking.price.toLocaleString()}
                  </Typography>
                  {booking.status === "รอชำระเงิน" && (
                    <Typography variant="caption" color="error">
                      เหลือเวลาในการชำระเงิน: {formatTime(booking.timeLeft)}
                    </Typography>
                  )}
                </Stack>
                <Divider sx={{ mt: 0.7, mb: 1 }} />
                {booking.status === "รอชำระเงิน" && (
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
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          {tabValue === 0
            ? "ไม่มีรายการที่ต้องชำระเงิน"
            : "ไม่มีรายการที่ชำระแล้ว"}
        </Typography>
      )}

      {tabValue === 0 && filteredBookings.length > 0 && (
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
      )}
    </>
  );
};

export default Booking;
