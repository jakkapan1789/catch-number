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
  backgroundColor: "#06c755", // LINE Green Color
  color: "#FFFFFF",
  //   "&:hover": {
  //     backgroundColor: "#009900",
  //   },
}));

const LiffComponent = () => {
  const [profile, setProfile] = useState(null); // State to hold user profile data

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2006444115-GzEX7djW" }); // Replace with your LIFF ID
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
      //   console.log("User Profile:", profileData);
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {profile ? (
        <Card variant="outlined">
          <CardContent>
            <Box
              display="flex"
              alignContent={"center"}
              justifyContent={"center"}
              alignItems="center"
              mb={2}
            >
              <Avatar
                alt="User Profile"
                src={profile?.pictureUrl}
                sx={{ width: 100, height: 100, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{profile?.displayName}</Typography>
              </Box>
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
                style={{ width: 24, height: 24 }}
              />
            }
          >
            Login with LINE
          </LINELoginButton>
        </Stack>
      )}
    </Container>
  );
};

export default LiffComponent;
