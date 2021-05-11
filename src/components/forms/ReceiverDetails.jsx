import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, Grid } from '@material-ui/core';
import DropDown from '../utils/DropDown';
import { State, Maharashtra, Gujarat, Haryana, UttarPradesh } from '../Data';

function ReceiverDetails({ receiverData, setReceiverData, validationError }) {

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
  };

  return (
    <React.Fragment>
      <Typography variant="h6">Receiver Details</Typography>
      <TextField
        label="Raised To"
        value={receiverData.name}
        onChange={(e) => setReceiverData({ ...receiverData, name: e.target.value })}
        variant="outlined"
        margin="dense"
        fullWidth
        style={{ paddingBottom: 10 }}
        error={receiverData.name === '' && validationError && validationError.includes('receiverName')}
      />
      <TextField
        label="Address"
        value={receiverData.address}
        onChange={(e) => setReceiverData({ ...receiverData, address: e.target.value })}
        variant="outlined"
        margin="dense"
        multiline
        rows="4"
        fullWidth
        style={{ paddingBottom: 10 }}
        error={receiverData.address === '' && validationError && validationError.includes('receiverAddress')}
      />
      <Grid item md={12} style={{ display: 'flex', flexDirection: 'row' }}>
        <DropDown
          name="State"
          label="State"
          value={receiverData.state}
          options={State}
          onChange={(e) => setReceiverData({ ...receiverData, state: e.target.value })}
          error={validationError && validationError.includes('receiverState')}
        />
        <DropDown
          name="City"
          label="City"
          value={receiverData.city}
          options={CityList(receiverData.state)}
          onChange={(e) => setReceiverData({ ...receiverData, city: e.target.value })}
          error={validationError && validationError.includes('receiverCity')}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          label="Pin Code"
          value={receiverData.pincode}
          onChange={(e) => setReceiverData({ ...receiverData, pincode: e.target.value })}
          variant="outlined"
          margin="dense"
          fullWidth
          style={{ paddingBottom: 10 }}
          error={receiverData.pincode === '' && validationError && validationError.includes('receiverPincode')}
        />
      </Grid>
    </React.Fragment>
  )
}

ReceiverDetails.propTypes = {
  receiverData: PropTypes.object.isRequired,
  setReceiverData: PropTypes.func.isRequired,
  validationError: PropTypes.array,
}

ReceiverDetails.defaultProps = {
  validationError: [],
}

export default ReceiverDetails;
