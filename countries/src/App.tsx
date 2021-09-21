import { Container, Paper, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { CountryList } from './components/CountryList';
import { UserList } from './components/UserList';
import { IUser } from './types/User';

const getCountries = async () => {
  return await axios
    .get('https://randomuser.me/api/?results=100')
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => alert(err.message));
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      padding: 20,
      justifyContent: 'space-',
    },
  })
);

const App: FC<{}> = (): JSX.Element => {
  const [countryUsersMap, setCountryUserMap] = useState<Map<string, IUser[]>>(
    new Map<string, IUser[]>()
  );
  const [countryList, setCountryList] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const classes = useStyles();

  useEffect(() => {
    Promise.all([getCountries()])
      .then(([{ results }]) =>
        results.map((user: any) => {
          const {
            name: { first, last },
            gender,
            location: { city, state, country },
            registered: { date },
          } = user;

          const newUser: IUser = {
            name: `${first} ${last}`,
            gender,
            city,
            state,
            dateRegistered: new Date(date).getTime(),
          };

          const currMap = new Map(countryUsersMap);
          const currCountryArray = [
            ...(currMap.get(country) || []),
            newUser,
          ].sort((a, b) => b.dateRegistered - a.dateRegistered);

          return setCountryUserMap(
            countryUsersMap.set(country, currCountryArray)
          );
        })
      )
      .then(() => {
        countryUsersMap.forEach((val, key) =>
          setCountryList((list) =>
            [...list, key].sort((a, b): number => {
              const lengthA = countryUsersMap.get(a)?.length;
              const lengthB = countryUsersMap.get(b)?.length;

              if (lengthA && lengthB) {
                if (lengthA > lengthB) {
                  return -1;
                }
                if (lengthA < lengthB) {
                  return 1;
                }
              }
              return 0;
            })
          )
        );
      });
  }, [countryUsersMap]);

  return (
    <Container maxWidth={'xl'}>
      <Paper elevation={3} className={classes.paper}>
        <CountryList
          countryList={countryList}
          setSelectedCountry={setSelectedCountry}
        />
        <UserList
          countryUsersMap={countryUsersMap}
          selectedCountry={selectedCountry}
        />
      </Paper>
    </Container>
  );
};

export default App;
