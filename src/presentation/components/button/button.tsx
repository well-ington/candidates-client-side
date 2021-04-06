import React from 'react';
import styles from './button.scss';

type Tbutton = {
    variant: string;
    action: () => void;
    disabled?: boolean;
}

export const Button: React.FC<Tbutton> = ({action, variant, children, disabled = false}) => {
    return <button disabled={disabled} className={`${styles.button} ${styles[variant]} ${disabled ? styles.inactive : styles.active}`} onClick={action}>
        {children}
    </button>
}