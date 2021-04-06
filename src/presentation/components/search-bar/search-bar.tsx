import { SET_LOADING } from '@/data/store/actions/action-types';
import { getServerQuery, getServerSuggestions } from '@/data/store/actions/actions';
import { TremoteSuggestions } from '@/data/store/reducer/store';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../button/button';
import FilterButton from '../filter-button/filter-button';
import SearchSuggestion from '../search-suggestion/search-suggestion';
import styles from './search-bar.scss';

interface ISearchBar {
    options?: TremoteSuggestions;
    setQuery: () => void;
    requestSuggestions: () => void;
    initializeQuery: (query: any) => void;
    setLoading: () => void;
}

const SearchBar: React.FC<ISearchBar> = ({options, setQuery, requestSuggestions, initializeQuery, setLoading}) => {
    const [firstLoad, setFirstLoad] = React.useState(true);
    if(firstLoad) {
        requestSuggestions();
        setFirstLoad(false);
    }


    const [value, setValue] = React.useState('');
    const [filterRequest, setFilterRequest] = React.useState({
        city: '',
        experience: '',
        technologies: []
    });


    let lazyKeySelector = '';

    for (let key in filterRequest) {
        if(!filterRequest[key].length && !lazyKeySelector.length) {
            lazyKeySelector = key;
        }
    }
    if (!lazyKeySelector.length) {
        lazyKeySelector = 'technologies';
    }


    const changeValue = (newValue: string) => {
        setValue('');
        const previousValue = {...filterRequest};
        
        if(previousValue[lazyKeySelector] !== undefined) {            
            if (Array.isArray(previousValue[lazyKeySelector])) {
                const newArr = Array.from(previousValue[lazyKeySelector]);
                if(newArr.indexOf(newValue) === -1) {
                    newArr.push(newValue);
                    previousValue[lazyKeySelector] = newArr;
                }
            } else {
                previousValue[lazyKeySelector] = newValue;
            }
            
            setFilterRequest(previousValue);
        }
        
    }

    const selectorInputName = {
        city: <>Qual <span className={styles.highlight}>cidade</span>?</>,
        experience: <>Quanto tempo de <span className={styles.highlight}>experiência</span>?</>,
        technologies: <>Quais <span className={styles.highlight}>technologias</span>?</>
    }

    const isValidQuery = filterRequest.city.length && filterRequest.experience.length && filterRequest.technologies.length;



    return <div className={styles.container}>        

            
            
            <Button disabled={!isValidQuery} variant="proceed" action={() => {
                setValue('');
                setQuery();
                setLoading();
                setTimeout(() => {
                    initializeQuery(filterRequest);
                }, 500);
            }}>
                Pesquisar
            </Button>

            <p className={styles.inputDisplay}>{selectorInputName[lazyKeySelector]}</p>
            <input className={styles.textInput} data-testid="searchBar" value={value} type="text" onChange={(e: {target: {value: string}}) => setValue(e.target.value)} />
            
            

        <SearchSuggestion value={value} change={changeValue} options={options[lazyKeySelector] || []} />
        <FilterButton filter={filterRequest} setFilter={setFilterRequest} />
        
    </div>
}

const mapStateToProps = (props) => {
    const store = props;
    return {
        options: store.suggestion
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestSuggestions: () => dispatch(getServerSuggestions()),
        initializeQuery: (query: any) => dispatch(getServerQuery(query)),
        setLoading: () => dispatch({ type: SET_LOADING })
    }
}



export default connect<{options: TremoteSuggestions}, {requestSuggestions: () => void, initializeQuery: (query: any) => void, setLoading: () => void}>(mapStateToProps, mapDispatchToProps)(SearchBar);