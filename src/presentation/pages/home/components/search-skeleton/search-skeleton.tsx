import React from "react";

import styles from "./search-skeleton.scss";

const SearchSkeleton: React.FC = () => {
  return (
    <div data-testid="test-search-skeleton" className={styles.skeleton}>
      {"12345".split("").map((_, index) => (
        <div className={styles.skeletonItem} key={`skeleton-item-${index}`}></div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
