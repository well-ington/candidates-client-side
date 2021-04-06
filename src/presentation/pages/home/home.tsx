import { TqueryObject } from '@/data/store/reducer/store';
import React from 'react';
import { connect } from 'react-redux';
import ResultContainer from './components/result-container/result-container';
import SearchSkeleton from './components/search-skeleton/search-skeleton';


import styles from './home.scss';

type Thome = {
    results: TqueryObject; 
    loading: boolean;
}

const Home: React.FC<Thome> = ({results, loading}) => {
    console.log(results);
    return <div className={styles.container}>
        { loading ? <SearchSkeleton /> : '' }
        { !loading && <ResultContainer candidates={results.candidates} />}
    
    </div>
}

const mapStateToProps = (props) => {
    const store = props;
    return {
        results: store.lastResult,
        loading: store.isLoading
    }
}


export default connect<Thome>(mapStateToProps)(Home);