import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { OrderContext } from '../Context/OrderContext';
import Order from './Order';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tableHeadingLight: {
    backgroundColor: theme.palette.grey[100]
  },
  tableCell: {
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`
  },
  bold: {
    fontWeight: 700
  }
}));

export default function Orders() {
  const classes = useStyles();
  const { orderData } = useContext(OrderContext);

  function generateOrders() {
    let orderItems = orderData.length ? (
      orderData.map(order => {
        return <Order data={order} />;
      })
    ) : (
      <TableCell className={classes.tableCell}>No Orders Found</TableCell>
    );
    return orderItems;
  }

  return (
    <div>
      <Box px={5} py={2}>
        <Typography variant="body1" className={classes.bold}>
          Latest Orders
        </Typography>
      </Box>
      <Table size="small">
        <TableHead className={classes.tableHeadingLight}>
          <TableRow>
            <TableCell className={classes.tableCell}>Order ID</TableCell>
            <TableCell className={classes.tableCell}>Customer</TableCell>
            <TableCell className={classes.tableCell}>Date of Purchase</TableCell>
            <TableCell className={classes.tableCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{generateOrders()}</TableBody>
      </Table>
    </div>
  );
}
