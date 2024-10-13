// import { useState } from "react";

// export default function Home() {
//   const [amount, setAmount] = useState(100);
//   const [orderId, setOrderId] = useState("12345"); // Example order ID
//   const [qrCodeUrl, setQrCodeUrl] = useState("");

//   const handleGenerateQRCode = async () => {
//     try {
//       const res = await fetch("/api/payment/promptpay", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount, orderId }), // Send the amount and order ID
//       });

//       if (!res.ok) throw new Error("Failed to generate QR code");

//       const data = await res.json();
//       console.log("data", data);
//       if (data) {
//         setQrCodeUrl(data.charge.source.scannable_code.image.download_uri);
//       }
//     } catch (error) {
//       console.error("Error generating PromptPay QR code:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Omise PromptPay Payment</h1>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder="Amount (THB)"
//       />
//       <button onClick={handleGenerateQRCode}>Generate PromptPay QR Code</button>

//       {qrCodeUrl && (
//         <div>
//           <h2>Scan this QR code to pay:</h2>
//           <img src={qrCodeUrl} alt="PromptPay QR Code" />
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function Home() {
  const [amount, setAmount] = useState(100);
  const [orderId, setOrderId] = useState("12345"); // Example order ID
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [expireTime, setExpireTime] = useState(null); // Expiration timestamp in seconds
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds

  const handleGenerateQRCode = async () => {
    try {
      const res = await fetch("/api/payment/promptpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, orderId }), // Send the amount and order ID
      });

      if (!res.ok) throw new Error("Failed to generate QR code");

      const data = await res.json();
      console.log("data", data);
      if (data) {
        setQrCodeUrl(data.charge.source.scannable_code.image.download_uri);
        setExpireTime(data.charge.source.expires_at); // Set expiration time from backend response
      }
    } catch (error) {
      console.error("Error generating PromptPay QR code:", error);
    }
  };

  useEffect(() => {
    // Update the countdown timer if expireTime is set
    if (expireTime) {
      const intervalId = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const timeLeft = expireTime - currentTime; // Time left in seconds
        setTimeLeft(timeLeft);

        // Stop the countdown when the time is up
        if (timeLeft <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);

      // Clean up the interval when the component is unmounted or expireTime changes
      return () => clearInterval(intervalId);
    }
  }, [expireTime]);

  return (
    <div>
      <h1>Omise PromptPay Payment</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (THB)"
      />
      <button onClick={handleGenerateQRCode}>Generate PromptPay QR Code</button>

      {qrCodeUrl && (
        <div>
          <h2>Scan this QR code to pay:</h2>
          <img src={qrCodeUrl} alt="PromptPay QR Code" />
        </div>
      )}

      {timeLeft > 0 && (
        <div>
          <h3>
            QR Code expires in: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
          </h3>
        </div>
      )}

      {timeLeft <= 0 && expireTime && (
        <div>
          <h3>The QR code has expired. Please generate a new one.</h3>
        </div>
      )}
    </div>
  );
}
