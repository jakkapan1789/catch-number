import { useEffect, useState } from "react";
import liff from "@line/liff";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";

const LiffComponent = () => {
  const [profile, setProfile] = useState(null); // State to hold user profile data

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
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        User Profile
      </Typography>
      {profile ? (
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                alt="User Profile"
                src={profile.pictureUrl}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{profile.displayName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  User ID: {profile.userId}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2">
              Status Message: {profile.statusMessage || "No status message"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" align="center">
          No profile data available.
        </Typography>
      )}
    </Container>
  );
};

export default LiffComponent;
