import React from "react";

import styles from "./search-skeleton.scss";

const SearchSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      {"12345".split("").map((_, index) => (
        <div key={`skeleton-item-${index}`}></div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
