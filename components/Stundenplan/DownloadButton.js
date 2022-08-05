import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../components/Icon";

import styles from "./DownloadButton.module.css";

function DownloadButton(props) {
  return (
    <div className={`${styles.button} ${styles[props.color]}`}>
      <Icon class={styles.iconWrapper} icon={faDownload} />
      {props.text}
    </div>
  );
}

export default DownloadButton;
