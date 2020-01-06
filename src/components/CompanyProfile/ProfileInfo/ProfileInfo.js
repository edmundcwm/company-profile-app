import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Shareholders from './Shareholders';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import useCompanyProfileStyles from '../CompanyProfileStyles';

export default function ProfileInfo(props) {
  const classes = useCompanyProfileStyles();

  return (
    <>
      <CssBaseline />
      <Box width={500} mx="auto">
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={12}>
            <Paper className={classes.companyProfilePaper} square>
              <Shareholders editMode={props.editMode} update={props.update} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
