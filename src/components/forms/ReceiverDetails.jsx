import React from 'react';
import { Typography, TextField, Grid } from '@material-ui/core';
import DropDown from '../utils/DropDown';
import { State, Maharashtra } from '../Data';

function ReceiverDetails({ receiverData, setReceiverData }) {
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
      />
      <Grid item md={12} style={{ display: 'flex', flexDirection: 'row' }}>
        <DropDown
          name="State"
          label="State"
          value={receiverData.state}
          options={State}
          onChange={(e) => setReceiverData({ ...receiverData, state: e.target.value })}
        />
        <DropDown
          name="City"
          label="City"
          value={receiverData.city}
          options={Maharashtra}
          onChange={(e) => setReceiverData({ ...receiverData, city: e.target.value })}
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
        />
      </Grid>
    </React.Fragment>
  )
}

export default ReceiverDetails
