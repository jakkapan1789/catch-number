import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Stack,
  Button,
  Divider,
  CardContent,
  Box,
  CardMedia,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "sonner";
import Slide from "@mui/material/Slide";
import liff from "@line/liff";

const products = [
  {
    productId: 1,
    productName: "Ted 2 สุดฮ็อต",
    price: 20,
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userName, setUserName] = useState("John Doe");
  const [displayGame, setDisplayGame] = useState(false);

  // Handle product selection and navigate to number grid
  const handlePlayClick = (product) => {
    setSelectedProduct(product);
    setDisplayGame(!displayGame);
  };

  // useEffect(() => {
  //   const initLiff = async () => {
  //     try {
  //       await liff
  //         .init({ liffId: "2006444115-GzEX7djW" })
  //         .then(() => console.log("login"));
  //       if (!liff.isLoggedIn()) {
  //         console.log("login");
  //         liff.login(); // Redirect to LINE login if not logged in
  //       } else {
  //         // User is logged in, fetch user profile
  //         const profileData = await liff.getProfile();
  //         console.log("profileData", profileData);
  //       }
  //     } catch (error) {
  //       console.error("LIFF Initialization failed:", error);
  //     }
  //   };

  //   initLiff();
  // }, []);

  return (
    <div>
      <Typography alignContent={"center"} variant="h6" gutterBottom>
        กิจกรรม
      </Typography>

      {!displayGame ? (
        products.map((product, index) => (
          <div key={index} data-aos="fade-up" data-aos-duration="300">
            <ActivityCard data={product} onPlayClick={handlePlayClick} />
          </div>
        ))
      ) : (
        <div>
          <NumberGrid product={selectedProduct} userName={userName} />
        </div>
      )}
    </div>
  );
};

const ActivityCard = ({ data, onPlayClick }) => {
  const { productName, price } = data;

  return (
    <Card sx={{ mb: 1, borderRadius: 2, boxShadow: 0 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" sx={{ mt: -1 }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body" fontWeight={"bold"}>
              {productName}
            </Typography>
          </Stack>
        </Box>

        <Stack direction={"row"}>
          <CardMedia
            component="img"
            sx={{ height: 250 }}
            image="/images/ted2.jpg"
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 1 }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" color="error">
            จุ่มละ : ฿{price.toLocaleString()}
          </Typography>
        </Stack>
        <Divider sx={{ mt: 0.7, mb: 1 }} />

        <Stack direction={"row"} sx={{ mb: -2 }}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            size="small"
            onClick={() => onPlayClick(data)}
          >
            เล่น
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

const NumberGrid = ({ product, userName }) => {
  const [numbers, setNumbers] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      value: i.toString().padStart(2, "0"),
      owner: "",
    }))
  );
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNumberClick = (index) => {
    if (numbers[index].owner) {
      toast.error(`This number is already taken by ${numbers[index].owner}`);
      return;
    }
    setSelectedNumber(index);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (selectedNumber !== null) {
      const newNumbers = [...numbers];
      newNumbers[selectedNumber].owner = userName;
      setNumbers(newNumbers);

      toast.success(
        `You've claimed number ${numbers[selectedNumber].value} for ${product.productName}`
      );
      setIsDialogOpen(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "gray.100", mt: 3 }}>
      <Typography variant="h6" align="center" gutterBottom>
        เลือกหมายเลขสำหรับ {product.productName}
      </Typography>

      <Grid container spacing={1}>
        {numbers.map((number, index) => (
          <Grid item xs={3} sm={3} md={3} key={number.value}>
            <Button
              fullWidth
              onClick={() => handleNumberClick(index)}
              variant="contained"
              disabled={!!number.owner}
              sx={{
                height: "60px",
                width: "60px",
                bgcolor: "#C62E2E",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <Typography variant="h6" align="center">
                  {number.value}
                </Typography>
              </div>
            </Button>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>ยืนยันการเลือก</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณแน่ใจหรือไม่ว่าต้องการขอหมายเลข{" "}
            {selectedNumber !== null ? numbers[selectedNumber].value : ""}{" "}
            สำหรับ {product.productName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} sx={{ color: "gray" }}>
            ยกเลิก
          </Button>
          <Button onClick={handleConfirm} color="error">
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Index;
