import styles from "./InputAutocompleteListItem.module.css";

function InputAutocompleteListItem(props) {
  const { text, focus, clickHandler } = props;

  return (
    <li
      onClick={clickHandler}
      className={`${styles.listItem} ${focus && styles.focus}`}
    >
      {text}
    </li>
  );
}

export default InputAutocompleteListItem;
