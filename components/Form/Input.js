import { useState, useEffect } from "react";

import styles from "./input.module.css";

function InputField(props) {
  const {
    placeholder,
    name,
    error: errorCounter,
    inputRef,
    setNewValue,
    defaultValue = ""
  } = props;

  const [value, setValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);

  const [error, setError] = useState(false);

  const changeHandler = (evt) => {
    setValue(evt.target.value);
  };

  useEffect(() => {
    if (setNewValue) setValue(setNewValue[0]);
  }, [setNewValue]);

  const focusHandler = (focusState) => {
    if (focusState && error) setError(false);

    setFocus(focusState);
  };

  useEffect(() => setError(!error), [errorCounter]);
  useEffect(() => {
    setError(false);
  }, []);

  return (
    <div
      className={`${styles.inputWrapper} ${focus && styles.focus} ${
        error && styles.error
      }`}
    >
      <input
        name={name}
        onFocus={() => focusHandler(true)}
        onBlur={() => focusHandler(false)}
        onChange={changeHandler}
        value={value}
        type="text"
        autoComplete="off"
        ref={inputRef}
      />
      {(focus || value.length == 0) && (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
    </div>
  );
}

export default InputField;
