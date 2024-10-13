// pages/api/webhook.js

import { buffer } from "micro";
import Omise from "omise";

const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

// This will disable the default body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed" });
    return;
  }

  try {
    const reqBuffer = await buffer(req);
    const event = JSON.parse(reqBuffer.toString());

    // Handle the "charge.complete" event which indicates payment completion
    if (event.type === "charge.complete") {
      const charge = event.data;

      if (
        charge.status === "successful" &&
        charge.payment_method === "promptpay"
      ) {
        console.log("Payment successful for charge:", charge.id);

        // Retrieve metadata (e.g., order ID)
        const orderId = charge.metadata.order_id;

        // Update your database or perform any action with the metadata
        console.log("Order ID:", orderId);

        // Example: Mark the order as paid in your system
        // await updateOrderStatus(orderId, 'paid');
      }
    }

    // Respond to Omise to acknowledge the event
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Webhook error");
  }
}
