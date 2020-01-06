import React, { useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { ProfileFields } from '../FieldsToDisplay';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { CompanyProfileContext } from '../../Context/CompanyProfileContext';
import Button from '@material-ui/core/Button';
import useCompanyProfileStyles from '../CompanyProfileStyles';

export default function TableOutput(props) {
  const { profileData, setProfileData } = useContext(CompanyProfileContext);
  const { fields, fieldGroup, editMode } = props;
  const [inputData, setInputData] = useState({
    [fieldGroup]: [...profileData[0][fieldGroup]]
  });
  const classes = useCompanyProfileStyles();

  // handle input changes
  function handleChange(e, index) {
    e.preventDefault();
    // ensure we are not mutating state
    const updatedData = inputData[fieldGroup].map((info, ind) => {
      if (ind === index) {
        return {
          ...info,
          [e.target.name]: e.target.value
        };
      } else {
        return info;
      }
    });

    setInputData({
      ...inputData, // ensure that exisitng values are retained
      [fieldGroup]: [...updatedData]
    });
  }

  //retrieve table headings
  const tableHeadings = fields.length ? (
    ProfileFields[fieldGroup].map((data, index) => {
      //since the array of data objects have the same keys, we just need to use the first object
      if (Object.keys(fields[0]).includes(data.value)) {
        return (
          <TableCell key={index} className={`${classes.tableCell} ${classes.bdb0}`}>
            <Typography className={classes.bold} color="primary" component="span">
              {data.label}
            </Typography>
          </TableCell>
        );
      }
    })
  ) : (
    <TableCell className={`${classes.tableCell} ${classes.bdb0}`}>
      <Typography>{`No ${fieldGroup} found`}</Typography>
    </TableCell>
  );

  //retrieve table content
  const tableContent = fields.map((data, fieldIndex) => {
    //for each repeating entry(row), create a table cell
    const cells = Object.keys(data).map((key, dataIndex) => {
      return (
        //use Link component is data is a link
        <TableCell key={dataIndex} className={`${classes.tableCell} ${classes.bdb0}`}>
          {editMode ? (
            <input
              value={inputData[fieldGroup][fieldIndex][key]}
              name={key}
              onChange={e => handleChange(e, fieldIndex)}
            />
          ) : (
            data[key]
          )}
        </TableCell>
      );
    });
    return <TableRow key={fieldIndex}>{cells}</TableRow>;
  });

  return (
    <>
      <Table>
        <TableHead className={classes.tableHeadingLight}>
          <TableRow>{tableHeadings}</TableRow>
        </TableHead>
        <TableBody>{tableContent}</TableBody>
      </Table>
      {editMode && (
        <Button className={classes.updateBtn} onClick={e => props.update(e, inputData)}>
          Update
        </Button>
      )}
    </>
  );
}
