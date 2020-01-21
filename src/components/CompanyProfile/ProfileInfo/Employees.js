import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import SingleEmployeeData from './SingleEmployeeData';
import useCompanyProfileStyles from '../CompanyProfileStyles';

export default function Employees(props) {
  const classes = useCompanyProfileStyles();
  const { data, editMode } = props;
  const employeeData = data.map((singleEmployee, index) => {
    return <SingleEmployeeData data={singleEmployee} editMode={editMode} change={props.change} />;
  });

  return (
    <Box>
      <Box px={5} py={3} className={classes.bdbGray} borderBottom={1}>
        <Typography variant="body1" className={classes.bold}>
          Employees
        </Typography>
      </Box>
      <Box p={3}>
        <Table>
          <TableBody>{employeeData}</TableBody>
        </Table>
      </Box>
    </Box>
  );
}
