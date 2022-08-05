import { useEffect, useRef } from "react";
import styles from "./section.module.css";

function Section(props) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef?.current) return;

    const resizeHandler = () => {
      const { height, width } = sectionRef.current.getBoundingClientRect();

      const scale = Math.min(
        (0.5 * window.innerWidth) / width,
        (0.5 * window.innerHeight) / height,
        1
      );
      console.log(scale);

      sectionRef.current.style.transform = `scale(${scale})`;
    };

    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler);
  }, [sectionRef]);

  return (
    <section ref={sectionRef} id={styles.section}>
      {props.children}
    </section>
  );
}

export default Section;
