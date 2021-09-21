import { List, ListItemButton, Paper, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import React, { BaseSyntheticEvent, FC, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '20%',
    },
  })
);

export const CountryList: FC<{
  countryList: string[];
  setSelectedCountry: any;
}> = (props): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const { countryList, setSelectedCountry } = props;

  const classes = useStyles();

  const handleClickCountry = (event: BaseSyntheticEvent) => {
    const { country, index } = event.target.dataset;
    setSelectedCountry(country);
    setSelectedIndex(index);
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <List onClick={handleClickCountry}>
        {countryList.map((country) => (
          <ListItemButton
            key={`list-item-country-${country}`}
            data-country={country}
            data-index={countryList.indexOf(country)}
            selected={selectedIndex === countryList.indexOf(country)}
          >
            {country}
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};
