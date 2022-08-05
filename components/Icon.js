// Fontawesome
// import your icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";

function Icon(props) {
  const [rotationDeg, setRotationDeg] = useState(0);

  useEffect(() => {
    setRotationDeg((prev) => prev + 180);
  }, [props.rotate]);

  const wrapperStyles = {
    transform: `rotate(${rotationDeg}deg)`,
  };

  return (
    <div className={props.class} styles={wrapperStyles}>
      <FontAwesomeIcon icon={props.icon} onClick={props.onClick} />
    </div>
  );
}

export default Icon;
