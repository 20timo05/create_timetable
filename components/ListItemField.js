import { useEffect, useRef } from "react";
import styles from "./ListItemField.module.css";

function ListItemField(props) {
  const { items, unmount } = props;

  const wrapperRef = useRef(null)

  const clickHandler = (evt) => {
    let item = evt.target;
    
    item.className += ` ${styles.disappear}`;
    setTimeout(() => {
      unmount(item.innerText)
    }, 300);
  };

  useEffect(() => {
    if (!wrapperRef || !wrapperRef.current) return

    let children = wrapperRef.current.children
    for (let i = 0; i < children.length; i++) {
      children[i].className = styles.listItem
    }
  },[wrapperRef, items])

  return (
    <div id={styles.wrapper} ref={wrapperRef}>
      {items.map((item, idx) => (
        <div key={idx} className={styles.listItem} onClick={clickHandler}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default ListItemField;
