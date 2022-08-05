import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import context from "../../store/context";

import { createTimeTable } from "../../data/timetableHelpers";

import StundenplanA4 from "../../components/Stundenplan/StundenplanA4";

import DownloadButton from "../../components/Stundenplan/DownloadButton";
import styles from "./styles.module.css";

function TimetablePage() {
  const router = useRouter();
  const { name, schoolClass, courses, timetable } = useContext(context);
  if (
    !name ||
    !schoolClass ||
    !courses ||
    courses.length === 0 ||
    !timetable ||
    Object.entries(timetable).length === 0
  ) {
    return <></>;
  }
  
  const userTimetable = createTimeTable(timetable, schoolClass, courses);
  const [show, setShow] = useState({
    course: true,
    teacher: true,
    room: true,
  });

  return (
    <section className={styles.wrapper}>
      <div className={`${styles.exportWrapper} ${styles.options}`}>
        <label>
          <input
            type="checkbox"
            checked={show.course}
            onChange={(evt) =>
              setShow((prev) => ({
                course: evt.target.checked,
                teacher: prev.teacher,
                room: prev.room,
              }))
            }
          />
          Kurs
        </label>
        <label>
          <input
            type="checkbox"
            checked={show.teacher}
            onChange={(evt) =>
              setShow((prev) => ({
                course: prev.course,
                teacher: evt.target.checked,
                room: prev.room,
              }))
            }
          />
          Lehrer
        </label>
        <label>
          <input
            type="checkbox"
            checked={show.room}
            onChange={(evt) =>
              setShow((prev) => ({
                course: prev.course,
                teacher: prev.teacher,
                room: evt.target.checked,
              }))
            }
          />
          Raum
        </label>
      </div>
      <StundenplanA4 show={show} timetable={userTimetable} name={name} />
      <div className={styles.exportWrapper}>
        <DownloadButton text="PDF" color="red" />
        <DownloadButton text="JPEG" color="blue" />
        <DownloadButton text="Excel" color="green" />
      </div>
    </section>
  );
}

export default TimetablePage;
