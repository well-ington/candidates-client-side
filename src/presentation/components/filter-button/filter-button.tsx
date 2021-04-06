import React from 'react';
import { Button } from '..';

type TfilterButton = {
    filter: any;
    setFilter: (e: any) => void;
}

export const FilterButton: React.FC<TfilterButton> = ({ filter, setFilter }) => {

    const filteredItems = Object.keys(filter).filter(a => filter[a].length).map((key: string) => {
        if(Array.isArray(filter[key])) {
            return filter[key].map((tech, index) => {
                return <Button variant="filter" action={() => {
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
            return <Button variant="filter" action={() => {
                setFilter(prevState => {
                    return {
                        ...prevState,
                        [key]: ''
                    }
                })
            }}>{filter[key]}</Button>
        }
    });

    return <div>
       {filteredItems}
    </div>
};