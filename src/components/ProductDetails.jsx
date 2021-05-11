import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, TextField, Button, IconButton } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { calcGrandTotal } from './helpers/TotalCalcHelper';

function ProductDetails({ productData, setProductData }) {

  const validateData = (idx) => {
    const temp = [];
    temp.name = productData[idx]['Product Name'] ? '' : 'This field is required.';
    temp.quantity = productData[idx]['Quantity'] ? '' : 'This field is required.';
    temp.baseAmount = productData[idx][['Base Amount']] ? '' : 'This field is required.';
    return Object.values(temp).every((x) => x === '');
  };

  const handleAddItem = () => {
    if (validateData(productData.length - 1)) {
      const newProductList = [...productData, {
        'Product Name': '',
        'Quantity': 0,
        'Base Amount': 0,
        'Total Amount': 0,
      }];
      setProductData(newProductList);
    }
  };

  const handleRemoveItem = (idx) => {
    const list = [...productData];
    list.splice(idx, 1);
    setProductData(list);
  };

  const handleInputChange = (e, idx) => {
    const { name, value } = e.target;
    const list = [...productData];
    list[idx][name] = value;
    setProductData(list);
    if (list[idx]['Quantity'] && list[idx]['Base Amount']) {
      list[idx]['Total Amount'] = list[idx]['Quantity'] * list[idx]['Base Amount'];
      setProductData(list);
    }
  };

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <React.Fragment>
      <Typography variant="h6">Product Details</Typography>
      <TableContainer style={{ border: '1px solid #e0e0e0', marginTop: 8, marginBottom: 8 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Base Amount</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((productRow, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  <TextField
                    variant="outlined"
                    margin="dense"
                    name="Product Name"
                    value={productRow['Product Name']}
                    onChange={(e) => handleInputChange(e, idx)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    name="Quantity"
                    value={productRow['Quantity']}
                    onChange={(e) => handleInputChange(e, idx)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    name="Base Amount"
                    value={productRow['Base Amount']}
                    onChange={(e) => handleInputChange(e, idx)}
                  />
                </TableCell>
                <TableCell>
                  ₹ {productRow['Total Amount']}
                </TableCell>
                <TableCell>
                  <IconButton
                    style={{
                      color: 'red',
                    }}
                    onClick={(e) => handleRemoveItem(idx)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item md={6}>
          <Button
            onClick={() => handleAddItem()}
            variant="container"
            style={{ textTransform: 'none', backgroundColor: 'orange', marginBottom: 8, color: 'white' }}
          >
            Add Items
      </Button>
        </Grid>
        <Grid item md={6}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Typography variant="h6" style={{ paddingRight: 38 }}>Grand Total </Typography>
            <Typography variant="h6">₹ {calcGrandTotal(productData)}</Typography>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

ProductDetails.propTypes = {
  productData: PropTypes.array.isRequired,
  setProductData: PropTypes.func.isRequired,
}

export default ProductDetails;
