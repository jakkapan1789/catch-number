import { useEffect } from "react";
import liff from "@line/liff";

const LiffComponent = () => {
  const [profile, setProfile] = useState(null); // State to hold user profile data
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2006444115-GzEX7djW" }); // Replace with your LIFF ID
        if (!liff.isLoggedIn()) {
          liff.login(); // Redirect to LINE login if not logged in
        } else {
          // User is logged in, fetch user profile
          await fetchUserProfile();
        }
      } catch (error) {
        console.error("LIFF Initialization failed:", error);
      }
    };

    initLiff();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profileData = await liff.getProfile();
      console.log("User Profile:", profileData);
      setProfile(profileData); // Update state with profile data
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false); // Set loading to false on error
    }
  };
  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      <h1>LIFF Example</h1>
      {profile ? (
        <div>
          <img src={profile.pictureUrl} alt="User Profile" />
          <p>User Name: {profile.displayName}</p>
          <p>User ID: {profile.userId}</p>
          <p>Status Message: {profile.statusMessage || "No status message"}</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default LiffComponent;
