import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import { UserServices } from '../../services/userServices/userServices';
import { CompanyProfileContext } from '../Context/CompanyProfileContext';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from '../SnackBar/SnackBarContentWrapper';
import useCompanyProfileStyles from './CompanyProfileStyles';

export default function CompanyProfile() {
  const classes = useCompanyProfileStyles();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { profileData, setProfileData } = useContext(CompanyProfileContext);

  useEffect(() => {
    UserServices.getByID()
      .then(response => {
        if (response.data.length) {
          //info found
          setProfileData(response.data);
        } else {
          setError('No data found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [setProfileData]);

  function toggleEditMode() {
    setIsEditMode(!isEditMode);
  }

  function handleSnackBarClose() {
    setSnackBarOpen(false);
  }

  // handle data update
  function handleUpdate(e, data) {
    console.log('data to update', data);
    e.preventDefault();
    // submit updated data to backend
    UserServices.updateByID(data)
      .then(response => {
        if (response.status === 200) {
          setLoading(true);
          setIsEditMode(false);
          //run another GET request to fetch updated data
          UserServices.getByID()
            .then(response => {
              if (response.data.length) {
                console.log(response.data);
                //info found
                setProfileData(response.data);
              } else {
                setError('No Data Fund');
              }
              setSnackBarOpen(true);
              setLoading(false);
              setError('');
            })
            .catch(error => {
              setError(error.message);
              setLoading(false);
            });
        }
      })
      .catch(error => {
        setError(error.message);
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <main className={classes.content}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackBarOpen}
        autoHideDuration={2500}
        onClose={handleSnackBarClose}
      >
        <SnackBarContentWrapper
          onClose={handleSnackBarClose}
          variant="success"
          message="Update Success"
        />
      </Snackbar>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        error || (
          <>
            <ProfileInfo editMode={isEditMode} update={handleUpdate} />
            <Box mt={3}>
              <Button variant="contained" onClick={toggleEditMode} color="primary">
                {isEditMode ? 'Cancel Edit' : 'Edit Information'}
              </Button>
            </Box>
          </>
        )
      )}
    </main>
  );
}
