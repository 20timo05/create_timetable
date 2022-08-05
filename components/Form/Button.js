import styles from "./button.module.css";

function Button(props) {
  const { text, round } = props;

  return (
    <button
      className={`${styles.button} ${round && styles.round}`}
      type="submit"
    >
      {text}
    </button>
  );
}

export default Button;
