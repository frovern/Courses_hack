import { useEffect, useState, useCallback } from 'react';
import { useUserStore } from '../../../store/userStore';
import { useHackathonStore } from '../../../store/hackathonStore';
import { fakeHackathons } from '../../../data/mockData';
import { Link } from 'react-router-dom';
import type { HackathonRegistration, Hackathon } from '../../../types/index';
import styles from './ProfilePage.module.css';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import LocationIcon from '../../../assets/icons/Place.svg';

const ProfilePage = () => {
  const { currentUser } = useUserStore();
  const { getUserRegistrations } = useHackathonStore();
  
  const [userHackathons, setUserHackathons] = useState<HackathonRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  
  const loadUserData = useCallback(async () => {
    if (!currentUser?.id) return;
    
    try {
      setLoading(true);

      const registrations = getUserRegistrations(currentUser.id);
      setUserHackathons(registrations);
      
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id, getUserRegistrations]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);



  if (!currentUser) {
    return (
      <div className={styles.container}>
        <h2>Профиль не найден</h2>
        <p>Пожалуйста, заполните анкету</p>
        <Link to="/register">Заполнить анкету</Link>
      </div>
    );
  }
  
  if (!currentUser.hasFilledProfile) {
    return (
      <div className={styles.container}>
        <h2>Профиль не заполнен</h2>
        <p>Пожалуйста, заполните анкету</p>
        <Link to="/register">Заполнить анкету</Link>
      </div>
    );
  }
  


  const getHackathonById = (id: string): Hackathon | undefined => {
    return fakeHackathons.find(h => h.id === id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.centerColumn}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}></div>
            <div className={styles.profileInfo}>
              <h2 className={styles.name}>{currentUser.fullName || currentUser.username}</h2>
              <p className={styles.username}>@{currentUser.username.replace('@', '')}</p>
            </div>
          </div>
          

        </div>

        <div className={styles.currentHackathons}>
          <h3 className={styles.sectionTitle}>текущие хакатоны</h3>
          
          {loading ? (
            <div className={styles.loading}>Загрузка...</div>
          ) : userHackathons.length === 0 ? (
            <div className={styles.noHackathons}>
              <p>Вы еще не зарегистрированы ни на один хакатон</p>
              <Link to="/hackathons" className={styles.browseButton}>
                Найти хакатоны
              </Link>
            </div>
          ) : (
            userHackathons.map(registration => {
              const hackathon = getHackathonById(registration.hackathonId);
              if (!hackathon) return null;
              
              return (
                <div key={registration.hackathonId} className={styles.hackathonCard}>
                  <div className={styles.hackathonHeader}>
                    <h4 className={styles.hackathonTitle}>{hackathon.title}</h4>
                    <div className={styles.hackathonMeta}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={CalendarIcon} alt="" className={styles.metaIcon} />
                        <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={LocationIcon} alt="" className={styles.metaIcon} />
                        <span>{hackathon.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {registration.hasTeam && registration.teamMembers && registration.teamMembers.length > 0 ? (
                    <div className={styles.teamSection}>
                      <div className={styles.teamHeader}>
                        <span>моя команда {registration.teamMembers.length}/5</span>
                      </div>
                      <div className={styles.teamMembers}>
                        {registration.teamMembers.map((member, index) => (
                          <div key={index} className={styles.teamMember}>
                            <div className={styles.memberAvatar}>{member.charAt(0).toUpperCase()}</div>
                            <div className={styles.memberInfo}>
                              <p className={styles.memberName}>{member}</p>
                              <p className={styles.memberRole}>Участник</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.noTeamSection}>
                      <p className={styles.noTeamText}>Команды пока нет</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.profileForm}>
          <div className={styles.formHeader}>
            <h3>Анкета</h3>
            <Link to="/register" className={styles.editButton}>Изм.</Link>
          </div>

          {currentUser.role && (
            <div className={styles.formSection}>
              <label className={styles.formLabel}>роль:</label>
              <div className={styles.tags}>
                <span className={styles.tag}>{currentUser.customRole || currentUser.role}</span>
              </div>
            </div>
          )}

          {(currentUser.wins !== undefined || currentUser.hackathonsCount !== undefined) && (
            <div className={styles.formSection}>
              <label className={styles.formLabel}>опыт:</label>
              <div className={styles.tags}>
                {currentUser.wins !== undefined && (
                  <span className={styles.tag}>{currentUser.wins} побед</span>
                )}
                {currentUser.hackathonsCount !== undefined && (
                  <span className={styles.tag}>{currentUser.hackathonsCount} хакатона</span>
                )}
              </div>
            </div>
          )}

          <div className={styles.formSection}>
            <div className={styles.hackathonBadges}>
              <div className={styles.hackathonBadge} style={{background: '#1a237e'}}>
                AI Hack Moscow 2025
              </div>
              <div className={styles.hackathonBadge} style={{background: '#6a1b9a'}}>
                IT world 2025
              </div>
              <div className={styles.hackathonBadge} style={{background: '#0277bd'}}>
                HakGO 2024
              </div>
              <div className={styles.hackathonBadge} style={{background: '#7cb342'}}>
                FRAME ME 2024
              </div>
            </div>
          </div>

          {currentUser.bio && (
            <div className={styles.formSection}>
              <label className={styles.formLabel}>о себе:</label>
              <p className={styles.bioText}>{currentUser.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;