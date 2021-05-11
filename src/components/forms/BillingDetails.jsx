import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, Grid } from '@material-ui/core';
import DropDown from '../utils/DropDown';
import { State, Maharashtra, Gujarat, Haryana, UttarPradesh } from '../Data';

function BillingDetails({ billingData, setBillingData }) {

  const CityList = (state) => {
    switch (state) {
      case 'Maharashtra':
        return Maharashtra;
      case 'Gujarat':
        return Gujarat;
      case 'Haryana':
        return Haryana;
      case 'Uttar Pradesh':
        return UttarPradesh;
      default:
        return [];
    }
  }

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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item md={6} style={{ paddingRight: 14 }}>
          <DropDown
            name="State"
            label="State"
            value={billingData.state}
            onChange={(e) => setBillingData({ ...billingData, state: e.target.value })}
            options={State}
          />
        </Grid>
        <Grid item md={6} style={{ paddingLeft: 2 }}>
          <DropDown
            name="City"
            label="City"
            value={billingData.city}
            onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
            options={CityList(billingData.state)}
          />
        </Grid>
      </div>
      <Grid item md={6} style={{ paddingRight: 14 }}>
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

BillingDetails.propTypes = {
  billingData: PropTypes.object.isRequired,
  setBillingData: PropTypes.func.isRequired,
}

export default BillingDetails;
