import { TqueryObject } from "@/data/store/reducer/store";
import React from "react";
import { connect } from "react-redux";
import { ErrorDisplay } from "./components/error-display/error-display";
import ResultContainer from "./components/result-container/result-container";
import SearchSkeleton from "./components/search-skeleton/search-skeleton";

import styles from "./home.scss";

type THome = {
  results: TqueryObject;
  loading: boolean;
  error: string;
};

const Home: React.FC<THome> = ({ results, loading, error }) => {
  return (
    <div className={styles.container}>
      {loading ? <SearchSkeleton /> : ""}
      {!loading && error.length === 0 && (
        <ResultContainer candidates={results.candidates} />
      )}
      {error.length > 0 && !loading ? <ErrorDisplay message={error} /> : ""}
    </div>
  );
};

const mapStateToProps = (props) => {
  const store = props;
  return {
    results: store.lastResult,
    loading: store.isLoading,
    error: store.error,
  };
};

export default connect<THome>(mapStateToProps)(Home);
