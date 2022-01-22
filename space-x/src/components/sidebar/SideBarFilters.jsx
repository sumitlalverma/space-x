import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSpacexLaunches } from '../../actions/missionAction';
import { ALL_LAUNCHES_YEARS, SUCCESSFULL_LAUNCH } from '../../constant';
import styles from './Sidebar.module.css';

const CONSTANT_NAMES = {
  YEAR: 'launch_year',
  SUCCESS_FULL_LAUNCH: 'launch_success',
  SUCCESS_FULL_LANDING: 'landing_success'
}

function TruthyFalsyButton({ label, handleClick, selectedOption }) {
  const captalize = (value) => value[0].toUpperCase() + value.slice(1);

  return <div>
    <div className={styles.filtersLabel}>{label}</div>
    <div className={styles.flexBox}>
      {
        SUCCESSFULL_LAUNCH.map((value, index) => (
          <div key={index.toString()} className={styles.buttonContainer}>
            <div
              onClick={() => handleClick(value)}
              className={`${styles.button} ${selectedOption === value && styles.selectedButton}`}
            >
              {captalize(value)}
            </div>
          </div>
        ))
      }
    </div>
  </div>
}


function SideBarFilters() {
  const dispatch = useDispatch();
  const { YEAR, SUCCESS_FULL_LAUNCH, SUCCESS_FULL_LANDING } = CONSTANT_NAMES;
  const getItems = (key) => localStorage.getItem(key);

  const filterInitialState = {
    [YEAR]: getItems(YEAR) || '',
    [SUCCESS_FULL_LAUNCH]: getItems(SUCCESS_FULL_LAUNCH) || '',
    [SUCCESS_FULL_LANDING]: getItems(SUCCESS_FULL_LANDING) || '',
  }

  const [selectedFilter, setSelectedFilter] = useState(filterInitialState);

  const handleSelectedFilter = useCallback((key, value) => {
    setSelectedFilter(previous => ({
      ...previous,
      [key]: selectedFilter[key] === value ? '' : value
    }))
    const storageValue = getItems(key);
    localStorage.setItem(key, storageValue === value ? '' : value);
  });

  useEffect(() => {
    dispatch(fetchSpacexLaunches(selectedFilter));
  }, [selectedFilter])

  return <React.Fragment>
    <div className={styles.main}>
      <h4>Filters</h4>
      <div className={styles.filtersLabel}>Launch year</div>
      <div className={styles.flexBox}>
        {
          ALL_LAUNCHES_YEARS.map((year, index) => (
            <div key={index.toString()} className={styles.buttonContainer}>
              <div
                onClick={() => handleSelectedFilter(YEAR, year)}
                className={`${styles.button} ${selectedFilter[YEAR] === year && styles.selectedButton}`}
              >
                {year}
              </div>
            </div>
          ))
        }
      </div>

      <TruthyFalsyButton
        label="Successful Launch"
        selectedOption={selectedFilter[SUCCESS_FULL_LAUNCH]}
        handleClick={value => handleSelectedFilter(SUCCESS_FULL_LAUNCH, value)}
      />
      <TruthyFalsyButton
        label="Successful Landing"
        selectedOption={selectedFilter[SUCCESS_FULL_LANDING]}
        handleClick={value => handleSelectedFilter(SUCCESS_FULL_LANDING, value)}
      />
    </div>
  </React.Fragment>
}

export default SideBarFilters;
