import React from "react";
import styles from "./button.scss";

type TProps = {
    variant: string;
    action: () => void;
    disabled?: boolean;
    testid?: string;
    className?: string;
}

export const Button: React.FC<TProps> = ({action, variant, children, disabled = false, testid = "generic-button", className}) => {
    return <button data-testid={testid} disabled={disabled} className={`${styles.button} ${styles[variant]} ${disabled ? styles.inactive : styles.active} ${className ? className : ""}`} onClick={action}>
        {children}
    </button>
}