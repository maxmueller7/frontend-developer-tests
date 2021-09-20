import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import { IUser } from './types/User';

const getCountries = async () => {
  return await axios
    .get('https://randomuser.me/api/?results=100')
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => alert(err.message));
};

const App: FC<{}> = () => {
  const [countryUsersMap, setCountryUserMap] = useState<Map<string, IUser[]>>(
    new Map<string, IUser[]>()
  );
  const [countryList, setCountryList] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

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

  const handleClickCountry = (event: BaseSyntheticEvent) => {
    const { country } = event.target.dataset;
    setSelectedCountry(country);
  };

  return (
    <>
      <div>
        <ul onClick={handleClickCountry}>
          {countryList.map((country) => (
            <li key={`li-country-key-${country}`} data-country={country}>
              {country}
            </li>
          ))}
        </ul>
        <ul>
          {countryUsersMap.get(selectedCountry) &&
            countryUsersMap.get(selectedCountry)?.map((user) => (
              <p key={`p-${user.dateRegistered}`}>
                {user.name} {new Date(user.dateRegistered).toString()}
              </p>
            ))}
        </ul>
      </div>
    </>
  );
};

export default App;
