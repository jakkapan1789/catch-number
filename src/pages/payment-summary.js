import React from "react";
import { useRouter } from "next/router";
import { Typography, Button, Stack, Divider } from "@mui/material";

const PaymentSummary = () => {
  const router = useRouter();
  const { bookings: bookingsQuery } = router.query;

  const bookings = bookingsQuery ? JSON.parse(bookingsQuery) : [];

  const totalAmount = bookings.reduce((acc, booking) => acc + booking.price, 0);

  const handleConfirmPayment = () => {
    console.log("Payment confirmed!");
  };

  return (
    <div>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        สรุปการชำระเงิน
      </Typography>

      <div>
        {bookings.map((booking) => (
          <div key={booking.id}>
            <Typography>
              {booking.product} หมายเลข {booking.number} ราคา: ฿
              {booking.price.toLocaleString()}
            </Typography>
            <Divider sx={{ my: 1 }} />
          </div>
        ))}

        <Typography variant="h6" fontWeight="bold">
          ยอดรวม: ฿{totalAmount.toLocaleString()}
        </Typography>

        <Stack sx={{ mt: 2 }} alignItems="center">
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleConfirmPayment}
          >
            ยืนยันการชำระเงิน
          </Button>

          <Stack alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="caption" color="textSecondary">
              QR Code สำหรับชำระเงิน
            </Typography>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default PaymentSummary;
