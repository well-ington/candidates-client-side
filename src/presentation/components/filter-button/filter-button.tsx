import React from 'react';
import { Button } from '..';
import styles from './filter-button.scss';

type TfilterButton = {
    filter: any;
    setFilter: (e: any) => void;
}

export const FilterButton: React.FC<TfilterButton> = ({ filter, setFilter }) => {
    const filteredItems = Object.keys(filter).filter(a => filter[a].length).map((key: string) => {
        if(Array.isArray(filter[key])) {
            return filter[key].map((tech, index) => {
                return <Button className={styles.button} variant="filter" action={() => {
                    const newArray = Array.from(filter[key]);
                    newArray.splice(index, 1);
                    setFilter(prevState => {
                        return {
                            ...prevState,
                            [key]: newArray
                        }
                    })
                }}>{tech}</Button>
            });
        } else {
            return <Button className={styles.button} variant="filter" action={() => {
                setFilter(prevState => {
                    return {
                        ...prevState,
                        [key]: ''
                    }
                })
            }}>{filter[key]}</Button>
        }
    });

    return <div className={styles.container}>
       {filteredItems}
    </div>
};