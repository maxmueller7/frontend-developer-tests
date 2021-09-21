import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { IUser, Gender } from '../types/User';

export const UserList: FC<{
  countryUsersMap: Map<string, IUser[]>;
  selectedCountry: string;
}> = (props): JSX.Element => {
  const { countryUsersMap, selectedCountry } = props;
  const [genderFilter, setGenderFilter] = useState<Gender>(Gender.ALL);
  const [userList, setUserList] = useState<IUser[]>([]);

  useEffect(() => {
    getFilteredUserList(genderFilter);
  }, [selectedCountry, countryUsersMap, genderFilter]);

  const getFilteredUserList = (selectedGender: Gender): void => {
    const users: IUser[] | undefined = countryUsersMap.get(selectedCountry);
    if (users) {
      if (selectedGender === Gender.ALL) {
        setUserList(users || []);
      } else {
        setUserList(
          [...users].filter((user) => user.gender === selectedGender)
        );
      }
    }
  };

  const handleChangeFilter = (event: SelectChangeEvent) => {
    const gender = event.target.value as Gender;
    setGenderFilter(gender);
    getFilteredUserList(gender);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        width: '75%',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Typography>Sort By Gender: </Typography>
        <FormControl sx={{ width: '110px', marginLeft: 3 }}>
          <InputLabel id='select-label'>Gender</InputLabel>
          <Select
            fullWidth
            labelId='select-label'
            value={genderFilter}
            label={'Gender'}
            onChange={handleChangeFilter}
          >
            <MenuItem value={Gender.ALL}>{Gender.ALL}</MenuItem>
            <MenuItem value={Gender.FEMALE}>{Gender.FEMALE}</MenuItem>
            <MenuItem value={Gender.MALE}>{Gender.MALE}</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <TableContainer component={Paper} elevation={3} sx={{ height: '90%' }}>
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
            {userList.map((user) => (
              <TableRow
                key={`table-row-key-${
                  user.name
                }-${user.dateRegistered.toString()}`}
              >
                {Object.values(user).map((value: string | number) => (
                  <TableCell
                    key={`table-cell-value-key-${value}-${user.dateRegistered}`}
                  >
                    {typeof value === 'number'
                      ? new Date(value).getTime()
                      : value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
