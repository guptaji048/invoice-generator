/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';

export default function DropDown(props) {
  const {
    name, label, value, onChange, options,
  } = props;

  return (
    <FormControl variant="outlined" fullWidth margin="dense" style={{ paddingBottom: 10 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">None</MenuItem>
        {
          options.map(
            (item, index) => (<MenuItem key={index} value={item}>{item}</MenuItem>),
          )
        }
      </Select>
    </FormControl>
  );
}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
