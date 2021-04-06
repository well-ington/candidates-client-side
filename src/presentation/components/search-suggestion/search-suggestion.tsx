import React from 'react';
import styles from './search-suggestion.scss';


interface ISuggestion {
    value: string;
    options: string[] | number[];
    change: (value: string) => void;
}



export const SearchSuggestion: React.FC<ISuggestion> = ({value, options, change}) => {
    const [selected, setSelected] = React.useState(0);


    let optionsArray: string[] = [...options].map(e => `${e}`);
    let isNumber = !Number.isNaN(Number(options[0]));

    let filteredItems = [];


    if(isNumber) {
        const newArr = [...options];
        newArr.sort((a,b) => a > b ? 1 : -1);

        optionsArray = newArr.map((item: number) => {
            const flooredNumber = Math.floor(item);
            if(flooredNumber !== item) {
                const anotherNumber = item - flooredNumber;
                if (anotherNumber == 0.5) {
                    return `de ${flooredNumber} a ${flooredNumber+1} anos`;
                } else {
                    return 'mais de ' + item + ' anos';
                }
            } else {
                return item + ' anos';
            }
        });
        //number
        const striped_value = value.replace(/(\d+)(?!.*\d)(.+?)meio/g, (group, match) => `${match} a ${Number(match) + 1}`).replace(/[a-zA-Z]/g, "").trim();

        filteredItems = optionsArray.filter(item => item.toLowerCase().search(striped_value.toLowerCase()) !== -1);
    } else {
        //string
        filteredItems = optionsArray.filter(item => item.toLowerCase().search(value.toLowerCase()) !== -1);
    }

    


    
    
    
    
    if((selected > filteredItems.length - 1 || selected >= 8)) {
        setSelected(-1);
    }

    if(selected == -1 && filteredItems.length > 0) {
        setSelected(0);
    }
    
    

    React.useEffect(() => {
        let lastTime = Date.now();
        const captureKeys = (e) => {  
            const now = Date.now();
            if(now - lastTime > 128) {
                switch(e.keyCode) {
                    case 38:
                        if(selected > 0) {
                            setSelected(selected - 1);
                        } else {
                            setSelected(Math.min(8, filteredItems.length - 1))
                        }
                        break;
                    case 40:
                        if(selected < 8) {
                            setSelected(selected + 1);
                        }
                        break;
                    case 13:                    
                        if (filteredItems[selected] !== undefined) {
                            change(filteredItems[selected]);
                        }
                        break;
                }
                
            }
        }

        
        window.addEventListener('keydown', captureKeys);

        return () => {
            window.removeEventListener('keydown', captureKeys);
        }

    }, [selected, setSelected, filteredItems]);


    
    return <div className={styles.container}>
    {
        filteredItems.length > 0 && value.length > 0 && filteredItems.slice(0, filteredItems.length > 8 ? 8 : filteredItems.length).map((suggestion, id) => {
            return <p className={`${styles.item} ${selected === id ? styles.itemActive : ''}`}>{suggestion}</p>
        })
    }
</div>
};