import React from "react";
import styles from "./error-display.scss";
import searchFailImage from "../../icons/search-fail.png";
import serverErrorImage from "../../icons/error-500.png";

type TProps = {
    message: string;
}

export const ErrorDisplay: React.FC<TProps> = ({ message }) => {
    return <div>
        { message === "no results" ? <div data-testid="test-notfound" className={styles.notFoundContainer}>
            <div className={styles.errorContainer}>
                <img className={styles.image} src={searchFailImage} alt="no-results-image"/>
                <p>
                    Ops! Nenhum resultado foi encontrado.
                </p>
                
            </div>
            
            </div> : <div className={styles.errorContainer} data-testid="test-something-wrong">
            <img className={styles.image} src={serverErrorImage} alt="server error image"/>
                <p>Algo inesperado ocorreu. Tente nova</p>
            </div> }            
    </div>
}