import React, { useEffect } from 'react';
import { Typography, Divider, makeStyles, Grid, TextField, Button, IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

function ProductDetails({ productData, setProductData }) {

  const handleInputChange = (e, idx) => {
    const { name, value } = e.target;
    const list = [...productData];
    list[idx][name] = value;
    setProductData(list);
  };

  useEffect(() => {
    console.log(productData)
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
                    name="name"
                    value={productRow.name}
                    onChange={(e) => handleInputChange(e, idx)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    name="quantity"
                    value={productRow.quantity}
                    onChange={(e) => handleInputChange(e, idx)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    name="baseAmount"
                    value={productRow.baseAmount}
                    onChange={(e) => handleInputChange(e, idx)}
                  />
                </TableCell>
                <TableCell>
                  {productData[idx].quantity && productData[idx].baseAmount ? productData[idx].quantity * productData[idx].baseAmount : 0}
                </TableCell>
                <TableCell>
                  <IconButton
                    style={{
                      color: 'red',
                    }}
                    // onClick={(e) => handleRemoveItem(idx)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        // onClick={() => handleAddItem()}
        variant="container"
        style={{ textTransform: 'none', backgroundColor: 'orange', marginBottom: 8 }}
      >
        Add Items
      </Button>
    </React.Fragment>
  )
}

export default ProductDetails;
