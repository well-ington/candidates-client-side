import SearchBar from '@/presentation/components/search-bar/search-bar';
import React from 'react';
import styles from './app.scss';

import { Router } from '../router/router';



export const App: React.FC = () => {
    const [firstQuery, setFirstQuery] = React.useState(true);

    const setQueryHandler = () => {
        if(firstQuery) {
            setFirstQuery(false);
        }
    }
    return <div className={styles.container}>  
        <div className={`${styles.searchWidget} ${firstQuery ? styles.homeSearchWidget : ''}`}>
            <p>
                Logo
            </p>
            <div className={styles.searchContainer}>
                <SearchBar setQuery={setQueryHandler} />
            </div>
        </div>

        <Router />             
    </div>
}
