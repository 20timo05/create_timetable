import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import Stundenplan from "../../components/Stundenplan/Stundenplan";
import Icon from "../../components/Icon";

import styles from "./StundenplanA4.module.css";

function TimetableA4(props) {
  const [landscape, setLandscape] = useState(true);

  const { name, show, timetable } = props;

  const rotate = () => {
    setLandscape((prev) => !prev);
  };

  return (
    <div
      className={`${styles.wrapper} ${
        landscape ? styles.landscapeFormat : styles.portraitFormat
      }`}
    >
      <header>
        <h1>Stundenplan von: {name}</h1>
        <Icon
          class={styles.iconWrapper}
          icon={faSyncAlt}
          rotate={landscape}
          onClick={rotate}
        />
      </header>
      <Stundenplan show={show} timetable={timetable} class={styles.timetable} />
    </div>
  );
}

export default TimetableA4;
