import { useState } from 'react';
import TeamRegistrationModal from '../../Pages/TeamRegistarionModal/TeamRegistrationModal';
import { useUserStore } from '../../../store/userStore';
import { useHackathonStore } from '../../../store/hackathonStore';
import type { Hackathon, RegistrationFormData, HackathonRegistration } from '../../../types/index';
import styles from './HackathonCard.module.css';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import LocationIcon from '../../../assets/icons/Place.svg';

interface HackathonCardProps {
  hackathon: Hackathon;
}

const HackathonCard = ({ hackathon }: HackathonCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useUserStore(state => state.currentUser);
  const { registerForHackathon, isUserRegistered } = useHackathonStore();

  const isRegistered = currentUser ? isUserRegistered(hackathon.id, currentUser.id) : false;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleRegisterClick = () => {
    if (!currentUser) {
      alert('Войдите в систему для регистрации');
      return;
    }
    setIsModalOpen(true);
  };

  const handleTeamRegistration = (formData: RegistrationFormData) => {
    if (!currentUser) return;

    const registrationData: HackathonRegistration = {
      ...formData,
      hackathonId: hackathon.id,
      userId: currentUser.id,
      registeredAt: new Date(),
    };
    
    registerForHackathon(registrationData);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.title}>{hackathon.title}</h2>
        </div>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <img src={CalendarIcon} alt="" className={styles.metaIcon} />
            <span>{formatDate(hackathon.startDate)} года</span>
          </div>
          <div className={styles.metaItem}>
            <img src={LocationIcon} alt="" className={styles.metaIcon} />
            <span>{hackathon.location}</span>
          </div>
        </div>
        <p className={styles.description}>{hackathon.description}</p>
        <div className={styles.stats}>
          {hackathon.prize && (
            <div className={styles.stat}>
              <span className={styles.statNumber}>{hackathon.prize}</span>
              <span className={styles.statLabel}>призовой фонд</span>
            </div>
          )}
          {hackathon.participants && (
            <div className={styles.stat}>
              <span className={styles.statNumber}>{hackathon.participants}</span>
              <span className={styles.statLabel}>команд участников</span>
            </div>
          )}
          {hackathon.duration && (
            <div className={styles.stat}>
              <span className={styles.statNumber}>{hackathon.duration}</span>
              <span className={styles.statLabel}>длительность</span>
            </div>
          )}
        </div>
        {hackathon.directions && hackathon.directions.length > 0 && (
          <div className={styles.skills}>
            <p className={styles.skillsLabel}>требуемые навыки</p>
            <div className={styles.skillsTags}>
              {hackathon.directions.map(dir => (
                <span key={dir} className={styles.skillTag}>{dir}</span>
              ))}
            </div>
          </div>
        )}
        <div className={styles.statusBadges}>
          {isRegistered && (
            <span className={styles.badge} style={{background: '#4CAF50'}}>
              зарегистрирован
            </span>
          )}
          {hackathon.participants && hackathon.participants > 100 && (
            <span className={styles.badge} style={{background: '#8A61F1'}}>
              осталось мест: 3 из 5
            </span>
          )}
        </div>
        <button
          className={styles.participateButton}
          onClick={handleRegisterClick}
          disabled={!hackathon.isActive || isRegistered}
        >
          <span className={styles.buttonIcon}>👤</span>
          {isRegistered ? 'УЖЕ ЗАРЕГИСТРИРОВАН' : 'УЧАСТВОВАТЬ'}
        </button>
      </div>

      <TeamRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTeamRegistration}
      />
    </>
  );
};

export default HackathonCard;