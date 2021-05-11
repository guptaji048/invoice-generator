export const calcGrandTotal = (dataArr) => {
    let s = 0, i;
    for (i = 0; i < dataArr.length; i += 1) {
        s += dataArr[i]['Quantity'] * dataArr[i]['Base Amount'];
    }
    return s;
};