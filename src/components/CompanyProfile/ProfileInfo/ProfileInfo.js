import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Shareholders from './Shareholders';
import Employees from './Employees';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import useCompanyProfileStyles from '../CompanyProfileStyles';

export default function ProfileInfo(props) {
  const classes = useCompanyProfileStyles();
  return (
    <>
      <CssBaseline />
      <Box width={1000} mx="auto">
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={6}>
            <Paper className={classes.companyProfilePaper} square>
              <Shareholders
                data={props.data.shareholders}
                editMode={props.editMode}
                add={props.add}
                change={props.change}
                remove={props.remove}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.companyProfilePaper} square>
              <Employees
                data={props.data.employees}
                editMode={props.editMode}
                add={props.add}
                change={props.change}
                remove={props.remove}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
