import { useEffect } from "react";
import liff from "@line/liff";

const LiffComponent = () => {
  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "YOUR_LIFF_ID" }); // Replace with your LIFF ID
        if (!liff.isLoggedIn()) {
          liff.login(); // Redirect to LINE login if not logged in
        } else {
          // User is logged in, fetch user profile
          fetchUserProfile();
        }
      } catch (error) {
        console.error("LIFF Initialization failed:", error);
      }
    };

    initLiff();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profile = await liff.getProfile();
      console.log("User Profile:", profile);
      // You can now use profile.displayName, profile.pictureUrl, etc.
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div>
      <h1>LIFF Example</h1>
      <p>Check the console for profile information after logging in.</p>
    </div>
  );
};

export default LiffComponent;
