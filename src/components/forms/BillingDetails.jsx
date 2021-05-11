import React from 'react'
import { Typography, TextField, Grid } from '@material-ui/core';
import DropDown from '../utils/DropDown';
import { State, Maharashtra } from '../Data';

function BillingDetails({ billingData, setBillingData }) {
  return (
    <React.Fragment>
      <Typography variant="h6">Billing Address</Typography>
      <TextField
        label="Address"
        value={billingData.address}
        onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
        variant="outlined"
        margin="dense"
        multiline
        rows="4"
        fullWidth
        style={{ paddingBottom: 10 }}
      />
      <Grid item md={12} style={{ display: 'flex', flexDirection: 'row' }}>
        <DropDown
          name="State"
          label="State"
          value={billingData.state}
          onChange={(e) => setBillingData({ ...billingData, state: e.target.value })}
          options={State}
        />
        <DropDown
          name="City"
          label="City"
          value={billingData.city}
          onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
          options={Maharashtra}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          label="Pin Code"
          value={billingData.pincode}
          onChange={(e) => setBillingData({ ...billingData, pincode: e.target.value })}
          variant="outlined"
          margin="dense"
          fullWidth
          style={{ paddingBottom: 10 }}
        />
      </Grid>
    </React.Fragment>
  )
}

export default BillingDetails
