import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import SingleEmployeeData from './SingleEmployeeData';
import useCompanyProfileStyles from '../CompanyProfileStyles';

export default function Employees(props) {
  const classes = useCompanyProfileStyles();
  const { data, editMode } = props;
  const employeeData = data.map((singleEmployee, index) => {
    return (
      <SingleEmployeeData
        rowIndex={index}
        data={singleEmployee}
        change={props.change}
        editMode={editMode}
        remove={props.remove}
      />
    );
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
          {editMode && (
            <Button name="employees" onClick={props.add} variant="contained">
              Add Employee
            </Button>
          )}
        </Table>
      </Box>
    </Box>
  );
}
