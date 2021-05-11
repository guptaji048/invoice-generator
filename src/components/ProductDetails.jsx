  const validateData = (idx) => {
    const temp = [];
    temp.name = productData[idx].name ? '' : 'This field is required.';
    temp.quantity = productData[idx].quantity ? '' : 'This field is required.';
    temp.baseAmount = productData[idx].baseAmount ? '' : 'This field is required.';
    return Object.values(temp).every((x) => x === '');
  };

  const handleAddItem = () => {
    if (validateData(productData.length - 1)) {
      const newProductList = [...productData, {
        name: '',
        quantity: 0,
        baseAmount: 0,
      }];
      setProductData(newProductList);
    }
  };

  const handleRemoveItem = (idx) => {
    const list = [...productData];
    list.splice(idx, 1);
    setProductData(list);
  };

                    onClick={(e) => handleRemoveItem(idx)}
        onClick={() => handleAddItem()}
