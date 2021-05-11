import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Typography, Button, makeStyles, Grid, InputLabel } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    border: '1px solid #e0e0e0',
    padding: 20,
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
}));

function InvoiceDetails() {
  const classes = useStyles();
  const { invoiceId } = useParams();
  const history = useHistory();
  const [invoiceData, setInvoiceData] = useState();

  useEffect(() => {
    return fetch(`https://6099126599011f0017140143.mockapi.io/invoice/addinvoice/${invoiceId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setInvoiceData(data);
      });
  }, [invoiceId])

  return (
    <div style={{ margin: 10, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {invoiceData && (
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="h6">Bill To</Typography>
              <Typography variant="body1">{invoiceData.billingInfo['Raised to']}</Typography>
              <Typography variant="body1">{invoiceData.billingInfo.Address}</Typography>
              <Typography variant="body1">{invoiceData.billingInfo.State}, {invoiceData.billingInfo.City}</Typography>
              <Typography variant="body1">{invoiceData.billingInfo['Pin Code']}</Typography>
            </Grid>
            <Grid item md={6}>
              <div className={classes.rowCenter}>
                <InputLabel>Invoice No: </InputLabel>
                <Typography variant="body1" style={{ paddingLeft: 5 }}>{invoiceData.id}</Typography>
              </div>
              <div className={classes.rowCenter}>
                <InputLabel>Invoice Date: </InputLabel>
                <Typography variant="body1" style={{ paddingLeft: 5 }}>{invoiceData.invoiceDate}</Typography>
              </div>
              <div className={classes.rowCenter}>
                <InputLabel>Due Date: </InputLabel>
                <Typography variant="body1" style={{ paddingLeft: 5 }}>{invoiceData.dueDate}</Typography>
              </div>
            </Grid>
            <Grid item md={12}>
              <TableContainer style={{ border: '1px solid #e0e0e0', marginTop: 8, marginBottom: 8 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Base Amount</TableCell>
                      <TableCell>Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoiceData.products.map((productRow, idx) => (
                      <TableRow key={idx}>
                        <TableCell component="th" scope="row">
                          {productRow['Product Name']}
                        </TableCell>
                        <TableCell>
                          {productRow.Quantity}
                        </TableCell>
                        <TableCell>
                          {productRow['Base Amount']}
                        </TableCell>
                        <TableCell>
                          ₹ {productRow['Total Amount']}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={6}>
            </Grid>
            <Grid item md={6} className={classes.rowCenter} style={{ justifyContent: 'flex-start' }}>
              <Grid item md={6}>
                <Typography variant="h6">Grand Total </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h6">₹ {invoiceData.grandTotal}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
      <Button
        variant="contained"
        style={{ width: '25%', marginTop: 10, backgroundColor: '#0082d6', color: 'white' }}
        onClick={() => { history.push("/") }}
      >
        Back To Form
      </Button>
    </div>
  )
}

export default InvoiceDetails;
