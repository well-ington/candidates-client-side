import { TcandidateObject } from '@/data/store/reducer/store';
import React from 'react';
import styles from './candidate-display.scss';

type TresultContainer = {
    candidate: TcandidateObject;
    card: boolean;
}

const CandidateDisplay: React.FC<TresultContainer> = ({ card, candidate: { id, experience, mainTech, tech, city }}) => {
    return <div className={`${styles.container} ${card ? styles.card : styles.row}`}>
        <div>
            <div className={styles.title}>Candidate {id}</div>
            <div className={styles.highlight}>Experiência: {experience}</div>
        </div>
        <div>
            <div className={styles.title}>
            Manja mais de:
            </div>
            <div className={styles.highlight}>
            {mainTech.join(', ')}
            </div>
        </div>
        <div>
            <div className={styles.title}>
            Tecnologias:
            </div>
            <div>
            {tech.map(item => <span className={mainTech.indexOf(item) !== -1 ? styles.highlight :  styles.sub} key={`key-${id}-${item}`}>{item}</span>)}
            </div>
        </div>
    </div>
}

export default CandidateDisplay;