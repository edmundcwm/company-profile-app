import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ProfileFields } from '../FieldsToDisplay';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import useCompanyProfileStyles from '../CompanyProfileStyles';

export default function TableOutput(props) {
  const { fields, fieldGroup, editMode } = props;
  const classes = useCompanyProfileStyles();

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
              value={fields[fieldIndex][key]}
              name={key}
              onChange={e => props.change(e, fieldIndex, fieldGroup)}
            />
          ) : (
            data[key]
          )}
        </TableCell>
      );
    });
    return (
      <>
        <TableRow key={fieldIndex}>{cells}</TableRow>
        {editMode && (
          <TableRow>
            <TableCell colspan={2} className={classes.bdb0}>
              <Button
                name={fieldGroup}
                color="secondary"
                size="small"
                className={`${classes.floatRight} ${classes.mgb2}`}
                onClick={e => props.remove(e, fieldIndex)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        )}
      </>
    );
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
        <>
          <Button name={fieldGroup} variant="contained" onClick={props.add}>
            Add {fieldGroup}
          </Button>
        </>
      )}
    </>
  );
}
