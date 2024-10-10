import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import { toast } from "sonner";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NumberGrid = ({ userName }) => {
  const [numbers, setNumbers] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      value: i.toString().padStart(2, "0"),
      owner: null,
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
        <Grid container spacing={2}>
          {numbers.map((number, index) => (
            <Grid item xs={3} sm={3} md={3} key={number.value}>
              <Button
                fullWidth
                onClick={() => handleNumberClick(index)}
                variant="contained"
                // color={number.owner ? "success" : "primary"}
                disabled={!!number.owner}
                sx={{ height: "100px", bgcolor: "#C62E2E" }}
              >
                <div>
                  <Typography variant="h6">{number.value}</Typography>
                  {number.owner && (
                    <Typography variant="body2">{number.owner}</Typography>
                  )}
                </div>
              </Button>
              {/* <Button
                onClick={() => handleNumberClick(index)}
                variant="contained"
                disabled={!!number.owner}
                sx={{
                  width: { xs: "40vw", sm: "100px" }, // Responsive width for mobile
                  height: { xs: "40vw", sm: "100px" }, // Responsive height for mobile
                  bgcolor: "#C62E2E",
                  borderRadius: "0", // Optional: Remove rounded corners for a sharp square shape
                }}
              >
                <div>
                  <Typography variant="h6">{number.value}</Typography>
                  {number.owner && (
                    <Typography variant="body2">{number.owner}</Typography>
                  )}
                </div>
              </Button> */}
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
