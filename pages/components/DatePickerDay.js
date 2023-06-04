import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const DatePickerDay = () => {
  const [value, setValue] = useState(null);
  const handleDateChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ m: 2, width: "15ch"}}>
          <DatePicker
            label="日付を選択"
            value={value}
            onChange={handleDateChange}
            inputFormat="yyyy/MM/dd"
            mask="____/__/__"
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default DatePickerDay;
