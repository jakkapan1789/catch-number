import { useEffect, useState } from "react";
import liff from "@line/liff";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const LINELoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#06c755",
  color: "#FFFFFF",
  textTransform: "none",
}));

const LiffComponent = () => {
  const [profile, setProfile] = useState(null); // State to hold user profile data

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2006444115-GzEX7djW" }); // Replace with your LIFF ID
        if (!liff.isLoggedIn()) {
          // liff.login();
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

  const handleLoginLine = () => {
    // This function will be triggered on button click
    liff.login(); // Redirects to LINE login
  };

  return (
    <>
      {profile ? (
        <Card sx={{ maxWidth: 345, boxShadow: 0 }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                alt="User Profile"
                src={profile.pictureUrl}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                {profile.displayName || "Name"}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                textAlign="center"
              >
                {profile.statusMessage || "No status available"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box
          // display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          position={"stciky"}
        >
          <LINELoginButton
            variant="contained"
            onClick={handleLoginLine}
            startIcon={
              <img
                src="/images/line.png"
                alt="LINE Logo"
                style={{ width: 30, height: 30 }}
              />
            }
          >
            Login with LINE
          </LINELoginButton>
        </Box>
      )}
    </>
  );
};

export default LiffComponent;
