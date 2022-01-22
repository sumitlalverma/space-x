import React from 'react';
import { useSelector } from 'react-redux';
import { checkStatus, spacexLaunches } from '../../reducers/missionSlice';
import LOADER_GIF from '../../assets/gifs/loading.gif';
import styles from './Card.module.css';


const Loading = () => {
  return <div className={styles.loaderMain}>
    <img className={styles.loader} src={LOADER_GIF} />
  </div>
}

const Card = ({ launch, index }) => {
  const {
    links: { mission_patch },
    mission_name,
    mission_id,
    launch_success,
    launch_year
  } = launch;
  return <div className={styles.cardMain}>
    <div className="center-flex">
      <img className={styles.image} src={mission_patch} alt="image" />
    </div>
    <div className={styles.missionName}>{mission_name} #{index + 1}</div>
    <div className="d-flex">
      <div className={styles.label}>Mission Id:</div>
      <div className={styles.value}>{mission_id[0] ? mission_id[0] : 'No Data'} </div>
    </div>
    <div className="d-flex">
      <div className={styles.label}>Launch Year:</div>
      <div className={styles.value}>{launch_year} </div>
    </div>
    <div className="d-flex">
      <div className={styles.label}>Successful Launch:</div>
      <div className={styles.value}>{launch_success ? 'True' : 'False'} </div>
    </div>
    <div className="d-flex">
      <div className={styles.label}>Successful Landing:</div>
      <div className={styles.value}>{launch_success ? 'True' : 'False'} </div>
    </div>
  </div>
}

function CardsPanel() {
  const launches = useSelector(spacexLaunches);
  const status = useSelector(checkStatus);

  if (status === 'loading') return <Loading />;
  return <div className={styles.panelMain}>

    {!!launches && !!launches.length ?
      launches.map((launch, index) => (
        <Card key={index.toString()} index={index} launch={launch} />
      ))
      : status === 'idle' &&
      <div className={`center-flex ${styles.notFound}`}>
        Oops! no any matched, Please Change Filter.
      </div>
    }
  </div>
}

export default CardsPanel;
