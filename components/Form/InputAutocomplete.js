import { useState, useRef, useEffect } from "react";

import useEventListener from "../../hooks/useEventListener";
import styles from "./InputAutocomplete.module.css";

import Input from "./Input";
import Button from "./Button";
import InputAutocompleteListItem from "./InputAutocompleteListItem";

function InputAutocomplete(props) {
  const inputRef = useRef(null);
  const [inputFocus, setInputFocus] = useState(false);
  const [newInputValue, setNewInputValue] = useState(["", 0]);

  const ulRef = useRef(null);

  // number indicates which autcomplete list item is focused
  const [activeItemCounter, setActiveItemCounter] = useState(0);

  // all list items in the autocomplete list
  const { autoCompleteOptions, forceAutcompleteOptions, asForm = true } = props;

  const [autocomplete, setAutocomplete] = useState([]);

  // navigating through menu with keys
  useEffect(() => {
    if (!inputRef || !inputRef.current) return;

    useEventListener(
      "keydown",
      (evt) => {
        if (evt.key == "ArrowDown" || evt.key == "ArrowUp")
          evt.preventDefault();

        let autocompleteList = generateAutocompleteList(evt.key);

        switch (evt.key) {
          case "ArrowDown":
            setActiveItemCounter((prev) =>
              prev >= autocompleteList.length ? 1 : prev + 1
            );
            break;
          case "ArrowUp":
            setActiveItemCounter((prev) =>
              prev <= 1 ? autocompleteList.length : prev - 1
            );
            break;
        }

        setAutocomplete(autocompleteList);
      },
      inputRef.current
    );

    let wrapper = inputRef.current.parentNode.parentNode;

    useEventListener("focusin", (evt) => setInputFocus(true), wrapper);
    useEventListener("focusout", (evt) => setInputFocus(false), wrapper);
  }, [inputRef]);

  useEffect(() => {
    // get selected autocomplete list item
    let ul = ulRef.current;

    if (activeItemCounter == 0 && autocomplete.length > 0) {
      ul.scrollTo({ top: 0 });
    }
    if (activeItemCounter == 0 || autocomplete.length == 0) return;

    let selected = ul.children[activeItemCounter - 1];

    selected?.scrollIntoView({ block: "nearest" });
  }, [autocomplete]);

  function generateAutocompleteList(key) {
    let oldValue = inputRef.current.value;
    let value = calculateValue(oldValue, key);

    if (!value == "") {
      // filter out all options which contain the input value (ignore upper or lower case)
      let autocompleteList = autoCompleteOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );

      return autocompleteList;
    } else {
      return [];
    }
  }

  function calculateValue(value, key) {
    // value in input field has not changed yet, so caluclate the value manually
    if (key == "Backspace") return value.slice(0, -1);
    if (key.length > 1) return value;
    return value + key;
  }

  const submitHandler = (evt) => {
    evt.preventDefault();

    // get initial input value
    let value = inputRef.current.value;

    // check for autocomplete
    if (activeItemCounter != 0) value = autocomplete[activeItemCounter - 1];

    // check if value is valid to be submitted
    if (forceAutcompleteOptions) {
      autoCompleteOptions.forEach((option) => {
        if (option.toLowerCase() == value.toLowerCase()) {
          props.submitHandler(option);

          submit("");
        }
      });
    }
  };

  const autocompleteListItemClickHandler = (evt) => {
    let { textContent } = evt.target;
    submit(textContent);
  };

  const submit = (inputValue) => {
    inputRef.current.focus();
    setNewInputValue(([counter]) => [inputValue, counter + 1]);
    setAutocomplete([]);
    setActiveItemCounter(0);
  };

  const inputTag = (
    <div id={styles.inputWrapper} tabIndex="0">
      <Input
        placeholder={props.placeholder}
        name={props.name}
        error={props.error}
        inputRef={inputRef}
        setNewValue={newInputValue}
      />

      <ul
        style={!autocomplete.length || !inputFocus ? { display: "none" } : {}}
        ref={ulRef}
      >
        {autocomplete.map((value, idx) => (
          <InputAutocompleteListItem
            key={idx}
            text={value}
            focus={activeItemCounter == idx + 1}
            clickHandler={autocompleteListItemClickHandler}
          />
        ))}
      </ul>
    </div>
  );

  if (asForm)
    return (
      <form id={styles.form} onSubmit={submitHandler}>
        {inputTag}
        <Button text="+" round="true" />
      </form>
    );

  return inputTag;
}

export default InputAutocomplete;
