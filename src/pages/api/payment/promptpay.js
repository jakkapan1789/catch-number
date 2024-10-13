// import Omise from "omise";

// const omise = Omise({
//   publicKey: "pkey_test_61dhmtz8u5rjh3r7o9w",
//   secretKey: "skey_test_61dh0x8n3etg6ruz13n",
// });

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.status(405).json({ message: "Only POST requests are allowed" });
//     return;
//   }
//   const { amount, orderId } = req.body;
//   try {
//     const source = await omise.sources.create({
//       amount: amount * 100,
//       currency: "THB",
//       type: "promptpay",
//       metadata: {
//         order_id: orderId,
//       },
//     });

//     const charge = await omise.charges.create({
//       amount: amount * 100,
//       currency: "THB",
//       source: source.id,
//       metadata: {
//         order_id: orderId,
//       },
//     });

//     res.status(200).json({ charge });
//   } catch (error) {
//     console.error("Error creating PromptPay source:", error);
//     res.status(500).json({ message: "Failed to create source" });
//   }
// }

import Omise from "omise";

const omise = Omise({
  publicKey: "pkey_test_61dhmtz8u5rjh3r7o9w",
  secretKey: "skey_test_61dh0x8n3etg6ruz13n",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed" });
    return;
  }

  const { amount, orderId } = req.body;

  // Calculate expiration time (current time + 5 minutes)
  const expirationTime = Math.floor((Date.now() + 5 * 60 * 1000) / 1000); // Convert to seconds for Omise API

  try {
    // Create PromptPay source with expiration
    const source = await omise.sources.create({
      amount: amount * 100,
      currency: "THB",
      type: "promptpay",
      metadata: {
        order_id: orderId,
      },
      expires_at: expirationTime, // Set the expiration time
    });

    // Create the charge using the source
    const charge = await omise.charges.create({
      amount: amount * 100,
      currency: "THB",
      source: source.id,
      metadata: {
        order_id: orderId,
      },
    });

    res.status(200).json({ charge });
  } catch (error) {
    console.error("Error creating PromptPay source:", error);
    res.status(500).json({ message: "Failed to create source" });
  }
}
