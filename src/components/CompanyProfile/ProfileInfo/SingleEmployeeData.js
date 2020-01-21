import React from 'react';
import { ProfileFields } from '../FieldsToDisplay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function SingleEmployeeData(props) {
  const { data, editMode, rowIndex } = props;
  const employeeData = ProfileFields['employees'].map((field, index) => {
    return (
      <TableRow>
        <TableCell>{field.label}</TableCell>
        <TableCell>
          {editMode ? (
            'link' in field ? (
              <>
                {data[field.value] && <a href={data[field.link]}>{data[field.value]}</a>}
                <TextField
                  type={field.type}
                  name="employee_contract"
                  onChange={event => props.change(event, rowIndex, 'employees')}
                  fullWidth
                />
              </>
            ) : (
              <TextField
                type={field.type}
                name={field.value}
                value={data[field.value]}
                onChange={event => props.change(event, rowIndex, 'employees')}
                fullWidth
              />
            )
          ) : 'link' in field ? (
            <Link href={data[field.link]} target="_blank" rel="noopener">
              {data[field.value]}
            </Link>
          ) : (
            data[field.value]
          )}
        </TableCell>
      </TableRow>
    );
  });
  return (
    <TableRow>
      {employeeData}
      {editMode && (
        <Button
          name="employees"
          color="secondary"
          size="small"
          // className={`${classes.floatRight} ${classes.mgb2}`}
          onClick={e => props.remove(e, rowIndex)}
        >
          Remove
        </Button>
      )}
    </TableRow>
  );
}
