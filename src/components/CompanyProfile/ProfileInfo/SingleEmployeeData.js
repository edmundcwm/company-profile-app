import React from 'react';
import { ProfileFields } from '../FieldsToDisplay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';

export default function SingleEmployeeData(props) {
  const { data } = props;
  const employeeData = ProfileFields['employees'].map(field => {
    return (
      <TableRow>
        <TableCell>{field.label}</TableCell>
        <TableCell>
          {'link' in field ? (
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
  return <TableRow>{employeeData}</TableRow>;
}
