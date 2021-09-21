import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React, { FC } from 'react';
import { IUser } from '../types/User';

export const UserList: FC<{
  countryUsersMap: Map<string, IUser[]>;
  selectedCountry: string;
}> = (props): JSX.Element => {
  const { countryUsersMap, selectedCountry } = props;

  //can get header dynamically but because it's a map there's some type checking and will have to render conditionally:
  //   {Object.keys(
  //     [...(countryUsersMap.get(selectedCountry) || [])][0]
  //   ).map((header: string, idx: number) => (
  //     <TableCell key={`table-cell-header-key-${header}-${idx}`}>
  //       {header.toUpperCase()}
  //     </TableCell>
  //   ))}

  return (
    <TableContainer component={Paper} elevation={3} style={{ width: '75%' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Date Registered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countryUsersMap.get(selectedCountry) &&
            countryUsersMap.get(selectedCountry)?.map((user) => (
              <TableRow
                key={`table-row-key-${
                  user.name
                }-${user.dateRegistered.toString()}`}
              >
                {Object.values(user).map((value: string | Date) => (
                  <TableCell
                    key={`table-cell-value-key-${value}-${user.dateRegistered.toString()}`}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
