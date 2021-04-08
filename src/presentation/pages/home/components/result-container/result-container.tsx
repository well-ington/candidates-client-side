import { TcandidateObject } from "@/data/store/reducer/store";
import React from "react";
import CandidateDisplay from "../candidate-display/candidate-display";
import styles from "./result-container.scss";

type TresultContainer = {
  candidates: TcandidateObject[];
};

const ResultContainer: React.FC<TresultContainer> = ({ candidates }) => {
  return (
    <div className={styles.container}>
      {candidates.length > 0
        ? candidates.map((candidate: TcandidateObject) => (
            <CandidateDisplay candidate={candidate} card={false} />
          ))
        : ""}
    </div>
  );
};

export default ResultContainer;
