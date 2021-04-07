import { TcandidateObject } from '@/data/store/reducer/store';
import React from 'react';
import styles from './candidate-display.scss';

type TresultContainer = {
    candidate: TcandidateObject;
    card?: boolean;
}

const CandidateDisplay: React.FC<TresultContainer> = ({ candidate: { id, matched, experience, mainTech, tech, city, techScore, mainTechScore }}) => {

      const diff = Number(experience) - Math.floor(Number(experience));
        const stringExperience = diff === 0.5 ? `de ${Math.floor(Number(experience))} a ${Math.floor(Number(experience)) + 1} anos`
        : diff === 0.9 ? "mais de " + Math.floor(Number(experience)) : Math.floor(Number(experience)) + " anos";
      
      return <div className={styles.container}>
        <div className={styles.firstRow}>
            <div className={styles.infoBlock}>
                <p className={styles.title}>Candidato {id}</p>
                <p className={styles.sub}>{city}</p>
                <p className={styles.sub}>Experiência: <span className={styles.highlight}>{stringExperience}</span></p>
            </div>
            <div className={styles.techs}>                
                {
                    tech.map((item, index) => <p className={`${styles.techItem} ${matched.indexOf(item) !== -1 ? styles.matchedItem : ''}`} key={`tech_item_${index}`}>{item}</p>)
                }
            </div>
        </div> 
    </div>
}

export default CandidateDisplay;