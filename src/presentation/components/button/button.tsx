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
    const whiteListStyle = ["proceed", "filter"];
    const variantKeyName = whiteListStyle[whiteListStyle.indexOf(variant)] || "";
    return <button data-testid={testid} disabled={disabled} className={`${styles.button} ${styles[`${variantKeyName}`]} ${disabled ? styles.inactive : styles.active} ${className ? className : ""}`} onClick={action}>
        {children}
    </button>
}