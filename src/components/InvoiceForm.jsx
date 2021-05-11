import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider, makeStyles, Grid, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import ReceiverDetails from './forms/ReceiverDetails';
import BillingDetails from './forms/BillingDetails';

const useStyles = makeStyles((theme) => ({
  container: {
    border: '1px solid #e0e0e0',
  }
}));

function InvoiceForm() {
  const classes = useStyles();
  const [invoiceData, setInvoiceData] = useState({
    invoiceDate: '',
    dueDate: '',
  });
  const [receiverData, setReceiverData] = useState({
    name: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
  });
  const [billingData, setBillingData] = useState({
    address: '',
    state: '',
    city: '',
    pincode: '',
  });
  const [billingFlag, setBillingFlag] = useState(false);

  const handleDateChange = (date) => {
    var dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + 30);
    setInvoiceData({ ...invoiceData, invoiceDate: date, dueDate: dueDate.toISOString().split('T')[0] })
    console.log(invoiceData);
  }

  const handleBillingCheckbox = () => {
    if (billingFlag === true) {
      setBillingData({
        address: receiverData.address,
        state: receiverData.state,
        city: receiverData.city,
        pincode: receiverData.pincode,
      });
    } else {
      setBillingData({
        address: '',
        state: '',
        city: '',
        pincode: '',
      });
    }
  }

  useEffect(() => {
    handleBillingCheckbox();
  }, [billingFlag])

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4">Add Invoice Details</Typography>
      <Divider />
      <Grid container spacing={2} style={{ marginTop: 5 }}>
        <Grid item md={6}>
          <TextField
            label="Invoice Date"
            type="date"
            variant="outlined"
            value={invoiceData.invoiceDate}
            onChange={date => handleDateChange(date.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="dense"
            fullWidth
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            label="Due Date"
            type="date"
            variant="outlined"
            value={invoiceData.dueDate}
            onChange={date => setInvoiceData({ ...invoiceData, dueDate: date.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            margin="dense"
            fullWidth
          />
        </Grid>
        <Grid item md={12}>
          <ReceiverDetails receiverData={receiverData} setReceiverData={setReceiverData} />
          <FormControlLabel
            control={
              <Checkbox
                checked={billingFlag}
                onChange={() => setBillingFlag(!billingFlag)}
                color="primary"
              />
            }
            label="Click if billing address same as receiver address"
          />
        </Grid>
        <Grid item md={12}>
          <BillingDetails billingData={billingData} setBillingData={setBillingData} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default InvoiceForm;
