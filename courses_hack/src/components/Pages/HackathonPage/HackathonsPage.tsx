import { useState } from 'react';
import HackathonCard from '../../features/HackathonCard/HackathonCard';
import { fakeHackathons } from '../../../data/mockData';
import type { Hackathon } from '../../../types';
import styles from './HackathonPage.module.css';

type TabType = 'все' | 'популярные' | 'для студентов';

const HackathonsPage = () => {
  const [hackathons] = useState<Hackathon[]>(fakeHackathons);
  const [activeTab, setActiveTab] = useState<TabType>('все');
  
  const [selectedRole, setSelectedRole] = useState('любые роли');
  const [selectedFormat, setSelectedFormat] = useState('все форматы');
  const [selectedComplexity, setSelectedComplexity] = useState('любая');
  const [selectedDates, setSelectedDates] = useState('все даты');
  const [selectedType, setSelectedType] = useState('все');
  
  const [isPopular, setIsPopular] = useState(false);
  const [hasPrize, setHasPrize] = useState(false);
  const [hasSpots, setHasSpots] = useState(false);
  const [careerGrowth, setCareerGrowth] = useState(false);
  const [closingSoon, setClosingSoon] = useState(false);

  const filteredHackathons = hackathons.filter(hackathon => {
    if (!hackathon.isActive) return false;
    
    if (activeTab === 'популярные' && hackathon.participants && hackathon.participants < 100) {
      return false;
    }

    if (selectedFormat !== 'все форматы' && hackathon.format !== selectedFormat) {
      return false;
    }

    if (hasPrize && !hackathon.prize) {
      return false;
    }
    
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'все' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('все')}
        >
          все
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'популярные' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('популярные')}
        >
          популярные
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'для студентов' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('для студентов')}
        >
          для студентов
        </button>
      </div>

      <div className={styles.filtersBlock}>
        <h3 className={styles.filtersTitle}>найти хакатон</h3>
        
        <div className={styles.filtersGrid}>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>роли</label>
            <select 
              className={styles.filterSelect}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option>любые роли</option>
              <option>бэк</option>
              <option>фронт</option>
              <option>фулл стек</option>
              <option>дизайн</option>
              <option>аналитик</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>формат</label>
            <select 
              className={styles.filterSelect}
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option>все форматы</option>
              <option>онлайн</option>
              <option>офлайн</option>
              <option>гибрид</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>сложность</label>
            <select 
              className={styles.filterSelect}
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
            >
              <option>любая</option>
              <option>новички</option>
              <option>опытные</option>
              <option>профессиональная</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>даты проведения</label>
            <select 
              className={styles.filterSelect}
              value={selectedDates}
              onChange={(e) => setSelectedDates(e.target.value)}
            >
              <option>все даты</option>
              <option>эта неделя</option>
              <option>этот месяц</option>
              <option>следующий месяц</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>вид проведения</label>
            <select 
              className={styles.filterSelect}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option>все</option>
              <option>AI/ML</option>
              <option>финансовые</option>
              <option>игровые</option>
              <option>соц проекты</option>
            </select>
          </div>
        </div>

        <div className={styles.checkboxes}>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
            />
            <span>популярные</span>
          </label>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={hasPrize}
              onChange={(e) => setHasPrize(e.target.checked)}
            />
            <span>с призовым фондом</span>
          </label>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={hasSpots}
              onChange={(e) => setHasSpots(e.target.checked)}
            />
            <span>есть свободные места</span>
          </label>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={careerGrowth}
              onChange={(e) => setCareerGrowth(e.target.checked)}
            />
            <span>карьерный рост</span>
          </label>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={closingSoon}
              onChange={(e) => setClosingSoon(e.target.checked)}
            />
            <span>регистрация скоро закроется</span>
          </label>
        </div>
      </div>
      
      <div className={styles.hackathonsList}>
        {filteredHackathons.length > 0 ? (
          filteredHackathons.map(hackathon => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))
        ) : (
          <p className={styles.noResults}>Нет доступных хакатонов</p>
        )}
      </div>
    </div>
  );
};

export default HackathonsPage;