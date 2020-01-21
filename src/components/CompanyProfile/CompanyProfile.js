import React, { useState, useEffect, useContext } from 'react';
import { UserServices } from '../../services/userServices/userServices';
import { CompanyProfileContext } from '../Context/CompanyProfileContext';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from '../SnackBar/SnackBarContentWrapper';
import useCompanyProfileStyles from './CompanyProfileStyles';
import { ProfileFields } from './FieldsToDisplay';
import { prepareAttachments } from '../../helpers/attachments';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  marginRight: {
    marginRight: theme.spacing(1)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7)
  }
}));

export default function CompanyProfile() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { profileData, setProfileData } = useContext(CompanyProfileContext);
  //this state is used for handling input change/add/remove and submit
  const [inputData, setInputData] = useState(profileData);

  useEffect(() => {
    UserServices.getByID()
      .then(response => {
        if (response.data.length) {
          //info found
          setProfileData(response.data);
        } else {
          setError('No data found');
        }
        setInputData(response.data[0]);
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

  // add new row of inputs
  function handleAdd(e) {
    e.preventDefault();
    const { name } = e.currentTarget;
    let newInputs = {};
    ProfileFields[name].forEach(field => {
      newInputs[field.value] = '';
    });
    setInputData({
      ...inputData,
      [name]: [...inputData[name], newInputs]
    });
  }

  // remove input row
  function handleRemove(e, rowIndex) {
    e.preventDefault();
    const { name } = e.currentTarget;
    const updatedData = inputData[name].filter((data, index) => {
      return index !== rowIndex;
    });

    setInputData({
      ...inputData,
      [name]: updatedData
    });
  }

  // handle input changes
  function handleChange(e, rowIndex, fieldGroup) {
    e.preventDefault();
    const { name, value, type } = e.target;
    // ensure we are not mutating state
    const updatedData = inputData[fieldGroup].map((data, index) => {
      if (index === rowIndex) {
        return {
          ...data,
          [name]:
            type === 'number' ? parseFloat(value) : type === 'file' ? e.target.files[0] : value
        };
      } else {
        return data;
      }
    });

    setInputData({
      ...inputData,
      [fieldGroup]: updatedData
    });
  }

  // handle data update
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const empAttachments = prepareAttachments.companyProfileDocs(inputData.employees);
      console.log('attachments', empAttachments);
      if (inputData.employees.length && empAttachments.length) {
        //if there are employees and attachments
        //submit attachments to backend
        await UserServices.uploadMedia(empAttachments).then(response => {
          // update inputData state and set employee contract title and link to response from API
          response.forEach(({ data }) => {
            let employeeID = data.caption.raw;
            inputData.employees[employeeID].employee_contract_title = data.title.rendered;
            inputData.employees[employeeID].employee_contract_link = data.source_url;
          });
        });
      }
      // submit updated data to backend
      UserServices.updateByID(inputData)
        .then(response => {
          if (response.status === 200) {
            setLoading(true);
            setIsEditMode(false);
            //run another GET request to fetch updated data
            UserServices.getByID()
              .then(response => {
                if (response.data.length) {
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
    } catch (e) {
      console.log(e);
      this.setState({
        isLoading: false,
        errorMessage: 'Attachment Upload failed. Please contact support.'
      });
    }
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
            <ProfileInfo
              data={inputData}
              editMode={isEditMode}
              add={handleAdd}
              change={handleChange}
              remove={handleRemove}
              update={handleUpdate}
            />
            <Box mt={3}>
              {isEditMode ? (
                <>
                  <Button
                    className={classes.marginRight}
                    variant="contained"
                    onClick={handleUpdate}
                    color="primary"
                  >
                    Update
                  </Button>
                  <Button onClick={toggleEditMode}>Cancel Edit</Button>
                </>
              ) : (
                <Button variant="contained" onClick={toggleEditMode} color="primary">
                  Edit Information
                </Button>
              )}
            </Box>
          </>
        )
      )}
    </main>
  );
}
