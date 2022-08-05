import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import Context from "../../store/context";

import styles from "./styles.module.css";
import Section from "../../components/Section";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import InputAutocomplete from "../../components/Form/InputAutocomplete";

function InputUserCredentials() {
  const router = useRouter();
  const { setName, setSchoolClass, timetable } = useContext(Context);

  if (!timetable || Object.entries(timetable).length === 0) {
    return <></>
  }

  const schoolClasses = Object.keys(timetable);

  const [nameErrorCounter, setNameErrorCounter] = useState(0);
  const [schoolClassErrorCounter, setSchoolClassErrorCounter] = useState(0);

  const submitHandler = (evt) => {
    evt.preventDefault();
    const { name: nameInput, schoolClass: schoolClassInput } =
      evt.target.elements;

    const name = nameInput.value;
    const schoolClass = schoolClassInput.value;

    if (!name.length) {
      setNameErrorCounter(nameErrorCounter + 1);
    }
    if (!schoolClass.length) {
      setSchoolClassErrorCounter(schoolClassErrorCounter + 1);
    }

    if (name.length && schoolClasses.includes(schoolClass)) {
      setName(name);
      setSchoolClass(schoolClass);
      router.push("/Kurse");
    }
  };

  return (
    <Section>
      <h1>Wer bist du?</h1>
      <form id={styles.form} onSubmit={submitHandler}>
        <Input placeholder="Name" name="name" error={nameErrorCounter} />
        <InputAutocomplete
          placeholder="Kurseingabe"
          autoCompleteOptions={schoolClasses}
          forceAutcompleteOptions={true}
          asForm={false}
          name="schoolClass"
        />
        <div id={styles.buttonWrapper}>
          <Button text="Abschicken" />
        </div>
      </form>
    </Section>
  );
}

export default InputUserCredentials;
