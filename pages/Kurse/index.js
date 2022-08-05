import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import context from "../../store/context";

import styles from "./styles.module.css";

import Section from "../../components/Section";
import InputAutocomplete from "../../components/Form/InputAutocomplete";
import ListItemField from "../../components/ListItemField";
import { getCourses } from "../../data/timetableHelpers";

function Kurse() {
  const router = useRouter();
  const { schoolClass, timetable, setCourses } = useContext(context);

  if (!schoolClass || !timetable || Object.entries(timetable).length === 0)
    return <></>;

  const courses = getCourses(timetable, schoolClass);

  const [listItemFieldItems, setListItemFieldItems] = useState([]);

  const submitHandler = (value) => {
    setListItemFieldItems((items) => [...items, value]);
  };

  const unmount = (value) => {
    setListItemFieldItems((items) => {
      let test = items.filter((item) => item != value);
      return test;
    });
  };

  const generateTimetable = () => {
    setCourses(listItemFieldItems);
    router.push("/Stundenplan");
  };

  return (
    <Section>
      <h1>Welche Kurse hast du?</h1>
      <InputAutocomplete
        placeholder="Kurseingabe"
        name="course"
        autoCompleteOptions={courses}
        forceAutcompleteOptions={true}
        submitHandler={submitHandler}
      />
      <ListItemField items={listItemFieldItems} unmount={unmount} />
      <h4 onClick={generateTimetable} className={styles.h4}>
        Erstelle Stundenplan{`>>`}
      </h4>
    </Section>
  );
}

export default Kurse;
