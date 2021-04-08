import React from "react";
import { Button } from "..";
import styles from "./filter-button.scss";

type TfilterButton = {
    filter: any;
    setFilter: (e: any) => void;
}

export const FilterButton: React.FC<TfilterButton> = ({ filter, setFilter }) => {
    //whitelist the object keys to avoid object sink
    const myObjKeys: string[] = ["city","experience", "technologies"];
    const filteredItems = myObjKeys.filter((a: string) => filter[`${a}`].length);

    const alterPlainFilter = (key: string) => {
        setFilter(prevState => {
            return {
                ...prevState,
                [`${key}`]: ""
            }
        });
    };

    const alterArrayFilter = (key: string, index: number) => {
        const newArray = Array.from(filter[`${key}`]);
        newArray.splice(index, 1);
        setFilter(prevState => {
            return {
                ...prevState,
                [`${key}`]: newArray
            }
        })
    }

    return <div data-testid="filter-button-test" className={styles.container}>
       {
        filteredItems.map((key: string, index: number) => {
            if(Array.isArray(filter[`${key}`])) {
                return filter[`${key}`].map((tech: string, techIndex: number) => {
                    return <Button className={styles.button} variant="filter" 
                    key={`tech${index}${techIndex}`}
                    testid={`tech-${techIndex}`}
                    action={() => alterArrayFilter(key, techIndex)}>{tech}</Button>
                });
            } else {
                return <Button className={styles.button} variant="filter" 
                key={`city-exp-${index}`}
                testid={`opt-${index}`}
                action={() => alterPlainFilter(key)}>{filter[`${key}`]}</Button>;
            }
        })
    }
    </div>
};