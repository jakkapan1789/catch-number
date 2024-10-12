import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, CardMedia } from "@mui/material";
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

export default NumberGrid;
