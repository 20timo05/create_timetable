import styles from "./section.module.css";

function Section(props) {
  return <section id={styles.section}>{props.children}</section>;
}

export default Section;
