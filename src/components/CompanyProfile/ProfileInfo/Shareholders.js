import React, { useContext } from 'react';
import { CompanyProfileContext } from '../../Context/CompanyProfileContext';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TableOutput from './TableOutput';
import useCompanyProfileStyles from '../CompanyProfileStyles';

export default function Shareholders(props) {
  const { profileData, setProfileData } = useContext(CompanyProfileContext);
  const classes = useCompanyProfileStyles();
  return (
    <Box>
      <Box px={5} py={3} className={classes.bdbGray} borderBottom={1}>
        <Typography variant="body1" className={classes.bold}>
          Shareholders
        </Typography>
      </Box>
      <Box>
        <TableOutput
          fields={props.data}
          fieldGroup="shareholders"
          editMode={props.editMode}
          add={props.add}
          change={props.change}
          remove={props.remove}
          update={props.update}
        />
      </Box>
    </Box>
  );
}
