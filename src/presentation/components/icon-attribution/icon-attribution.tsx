import React from "react";
import styles from "./icon-attribution.scss";

export const IconAttribution: React.FC = () => {
  return (
    <div className={styles.container}>
      Icons made by{" "}
      <a href="https://www.freepik.com" title="Freepik">
        Freepik
      </a>{" "}
      from{" "}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </div>
  );
};
