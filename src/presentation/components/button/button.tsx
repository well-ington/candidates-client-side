import React from 'react';
import styles from './button.scss';

type TProps = {
    variant: string;
    action: () => void;
    disabled?: boolean;
    testid?: string;
}

export const Button: React.FC<TProps> = ({action, variant, children, disabled = false, testid = 'generic-button'}) => {
    return <button data-testid={testid} disabled={disabled} className={`${styles.button} ${styles[variant]} ${disabled ? styles.inactive : styles.active}`} onClick={action}>
        {children}
    </button>
}