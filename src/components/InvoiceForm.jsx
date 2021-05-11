import React, { useState, useEffect } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { Container, Typography, makeStyles, Grid, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import ReceiverDetails from './forms/ReceiverDetails';
import BillingDetails from './forms/BillingDetails';
import ProductDetails from './ProductDetails';
import { calcGrandTotal } from './helpers/TotalCalcHelper';

const useStyles = makeStyles(() => ({
  container: {
    border: '1px solid #e0e0e0',
  }
}));

function InvoiceForm() {
  const classes = useStyles();
  const history = useHistory();
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
  const [productData, setProductData] = useState([{
    'Product Name': '',
    'Quantity': 0,
    'Base Amount': 0,
    'Total Amount': 0,
  }]);
  const [billingFlag, setBillingFlag] = useState(false);

  const handleDateChange = (date) => {
    var dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + 30);
    setInvoiceData({ ...invoiceData, invoiceDate: date, dueDate: dueDate.toISOString().split('T')[0] })
    console.log(invoiceData);
  };

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
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    const newDataObject = {
      invoiceDate: invoiceData.invoiceDate,
      dueDate: invoiceData.dueDate,
      grandTotal: calcGrandTotal(productData),
      vendorInfo: {
        "Raised to": receiverData.name,
        Address: receiverData.address,
        State: receiverData.state,
        City: receiverData.city,
        "Pin Code": receiverData.pincode,
      },
      billingInfo: {
        "Raised to": receiverData.name,
        Address: billingData.address,
        State: billingData.state,
        City: billingData.city,
        "Pin Code": billingData.pincode,
      },
      products: productData,
    };
    console.log(JSON.stringify(newDataObject));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDataObject)
    };
    fetch('https://6099126599011f0017140143.mockapi.io/invoice/addinvoice', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const invoiceId = data.id;
        history.push({ pathname: generatePath("/invoice/:invoiceId", { invoiceId }) });
        setInvoiceData({
          invoiceDate: '',
          dueDate: '',
        });
        setReceiverData({
          name: '',
          address: '',
          state: '',
          city: '',
          pincode: '',
        });
        setBillingData({
          address: '',
          state: '',
          city: '',
          pincode: '',
        });
        setProductData([{
          'Product Name': '',
          'Quantity': 0,
          'Base Amount': 0,
          'Total Amount': 0,
        }]);
        setBillingFlag(false);
      });
  };

  useEffect(() => {
    handleBillingCheckbox();
  }, [billingFlag])

  return (
    <div style={{ margin: 10, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" style={{ marginTop: 8 }}>Add Invoice Details</Typography>

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
                  style={{ color: '#0082d6' }}
                />
              }
              label="Click if billing address same as receiver address"
            />
          </Grid>
          <Grid item md={12}>
            <BillingDetails billingData={billingData} setBillingData={setBillingData} />
          </Grid>
          <Grid item md={12}>
            <ProductDetails productData={productData} setProductData={setProductData} />
          </Grid>
        </Grid>
      </Container>
      <Button
        variant="contained"
        style={{ width: '25%', marginTop: 10, backgroundColor: '#0082d6', color: 'white' }}
        onClick={(e) => { handleSubmitData(e) }}
      >
        Submit
      </Button>
    </div>
  )
}

export default InvoiceForm;
