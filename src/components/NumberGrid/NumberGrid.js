import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Container, CardMedia } from "@mui/material";
import { toast } from "sonner";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NumberGrid = ({ userName }) => {
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

      toast.success(`You've claimed number ${numbers[selectedNumber].value}`);
      setIsDialogOpen(false);
    }
  };

  return (
    <Box id="about" sx={{ backgroundColor: "gray.100" }}>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <CardMedia component="img" image="/images/ted2.jpg" />
          </Grid>
          {numbers.map((number, index) => (
            <Grid item xs={3} sm={3} md={3} key={number.value}>
              {/* <Button
                fullWidth
                onClick={() => handleNumberClick(index)}
                variant="contained"
                // color={number.owner ? "success" : "primary"}
                disabled={!!number.owner}
                sx={{ height: "100%", bgcolor: "#C62E2E", borderRadius: 50 }}
              >
                <div>
                  <Typography variant="h6">{number.value}</Typography>
                  {number.owner && (
                    <Typography variant="body2">{number.owner}</Typography>
                  )}
                </div>
              </Button> */}
              <Button
                fullWidth
                onClick={() => handleNumberClick(index)}
                variant="contained"
                disabled={!!number.owner}
                sx={{
                  height: "60px", // Set a fixed height for the circular button
                  width: "60px", // Set a fixed width for the circular button
                  bgcolor: "#C62E2E",
                  borderRadius: "50%", // Use 50% for perfect circle
                  display: "flex", // Use flexbox for centering content
                  alignItems: "center", // Center items vertically
                  justifyContent: "center", // Center items horizontally
                }}
              >
                <div>
                  <Typography variant="h6" align="center">
                    {number.value}
                  </Typography>
                  {number.owner && (
                    <Typography variant="body2" align="center">
                      {number.owner}
                    </Typography>
                  )}
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
              {selectedNumber !== null ? numbers[selectedNumber].value : ""}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsDialogOpen(false)}
              sx={{ color: "gray" }}
            >
              ยกเลิก
            </Button>
            <Button onClick={handleConfirm} color="error">
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default NumberGrid;
