import React from 'react';
import { Container, Typography, Divider, makeStyles, Grid, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DropDown from './utils/DropDown';
import { State, Maharashtra } from './Data';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    border: '1px solid #e0e0e0',
  }
}));

function InvoiceForm() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4">Add Invoice Details</Typography>
      <Divider />
      <Grid container spacing={2}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid item md={6}>
            <KeyboardDatePicker
              variant="inline"
              inputVariant="outlined"
              label="Invoice Date"
              format="MM/dd/yyyy"
              minDate={new Date()}
              //value={selectedDate}
              // onChange={date => handleDateChange(date)}
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <KeyboardDatePicker
              variant="inline"
              inputVariant="outlined"
              label="Due Date"
              format="MM/dd/yyyy"
              //value={selectedDate}
              // onChange={date => handleDateChange(date)}
              margin="dense"
              fullWidth
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item md={6}>
          <Typography variant="h6">Receiver Details</Typography>
          <TextField label="Raised To" variant="outlined" margin="dense" fullWidth style={{ paddingBottom: 10 }} />
          <TextField label="Address" variant="outlined" margin="dense" multiline rows="4" fullWidth style={{ paddingBottom: 10 }} />
          <DropDown
            name="State"
            label="State"
            // value={opType}
            options={State}
          // onChange={handleInputChange}
          />
          <DropDown
            name="City"
            label="City"
            // value={opType}
            options={Maharashtra}
          // onChange={handleInputChange}
          />
          <TextField label="Pin Code" variant="outlined" margin="dense" fullWidth style={{ paddingBottom: 10 }} />
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                // onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Click if billing address same as receiver address"
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6">Billing Address</Typography>
          <TextField label="Address" variant="outlined" margin="dense" multiline rows="4" fullWidth style={{ paddingBottom: 10 }} />
          <DropDown
            name="State"
            label="State"
            // value={opType}
            options={State}
          // onChange={handleInputChange}
          />
          <DropDown
            name="City"
            label="City"
            // value={opType}
            options={Maharashtra}
          // onChange={handleInputChange}
          />
          <TextField label="Pin Code" variant="outlined" margin="dense" fullWidth style={{ paddingBottom: 10 }} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default InvoiceForm;
