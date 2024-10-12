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
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const LINELoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#06c755",
  color: "#FFFFFF",
  textTransform: "none",
}));

const LiffComponent = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2006444115-GzEX7djW" });
        if (liff.isLoggedIn()) {
          await fetchUserProfile();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("LIFF Initialization failed:", error);
        setLoading(false);
      }
    };
    initLiff();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profileData = await liff.getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginLine = async () => {
    try {
      liff.login();
      setLoading(true); // Start loading when login is triggered
    } catch (error) {
      console.error("Error during login:", error);
      setLoading(false); // Stop loading if login fails
    }
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={loading}
      >
        <CircularProgress sx={{ color: "red" }} />
      </Backdrop>

      {!loading && (
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
                    {profile?.displayName || "Name"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    textAlign="center"
                  >
                    {profile?.statusMessage || "No status available"}
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
      )}
    </>
  );
};

export default LiffComponent;
