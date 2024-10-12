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
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2006444115-GzEX7djW" });
        if (!liff.isLoggedIn()) {
          //   liff.login(); // Redirect to LINE login if not logged in
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
  const handleLoginLine = async () => {
    liff.login();
    fetchUserProfile();
  };

  return (
    <>
      {profile ? (
        <Card sx={{ maxWidth: 345, boxShadow: 0 }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                alt="User Profile"
                src={profile?.pictureUrl}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                {profile ? profile.displayName : "Name"}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                textAlign="center"
              >
                {profile ? profile.statusMessage : "No status available"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Stack direction={"row"} justifyContent={"center"}>
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
        </Stack>
      )}
    </>
  );
};

export default LiffComponent;
