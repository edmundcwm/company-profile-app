import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tableCell: {
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`
  },
  orderStatus: {
    '&::before': {
      content: "''",
      width: 8,
      height: 8,
      display: 'inline-block',
      borderRadius: '100%',
      marginRight: 10
    }
  },
  pending: {
    '&::before': {
      backgroundColor: 'red'
    }
  },
  processing: {
    '&::before': {
      backgroundColor: 'green'
    }
  }
}));
export default function Order(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <TableRow key={data.id}>
      <TableCell className={classes.tableCell}>{data.id}</TableCell>
      <TableCell className={classes.tableCell}>{data.customer}</TableCell>
      <TableCell className={classes.tableCell}>{data.date}</TableCell>
      <TableCell
        className={`${classes.orderStatus} ${classes[data.order_status]} ${classes.tableCell}`}
      >
        {data.order_status}
      </TableCell>
    </TableRow>
  );
}
