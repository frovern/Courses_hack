// components/TeamRegistrationModal/TeamRegistrationModal.tsx
import { useState } from 'react';
import Button from '../../UI/Button/Button';
import type { RegistrationFormData } from '../../../types/index';
import styles from './TeamRegistrationModal.module.css';

interface TeamRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: RegistrationFormData) => void;
}

const TeamRegistrationModal = ({
  isOpen,
  onClose,
  onSubmit,
}: TeamRegistrationModalProps) => {
  const [hasTeam, setHasTeam] = useState<boolean | null>(null);
  const [teamMembers, setTeamMembers] = useState<string[]>(['']);

  if (!isOpen) return null;

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, '']);
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index] = value;
    setTeamMembers(newMembers);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newMembers);
  };

  const handleSubmit = () => {
    if (hasTeam === null) return;

    const submitData: RegistrationFormData = {
      hackathonId: '', 
      userId: '', 
      hasTeam,
    };

    if (hasTeam === true) {
      const validMembers = teamMembers.filter(member => member.trim() !== '');
      
      if (validMembers.length === 0) {
        alert('Добавьте хотя бы одного участника команды');
        return;
      }

      submitData.teamMembers = validMembers;
    }

    onSubmit(submitData);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Регистрация на хакатон</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.question}>
            <p className={styles.questionText}>У вас есть команда?</p>
            <div className={styles.options}>
              <Button
                variant={hasTeam === true ? 'primary' : 'outline'}
                onClick={() => setHasTeam(true)}
                fullWidth
              >
                Да, есть команда
              </Button>
              <Button
                variant={hasTeam === false ? 'primary' : 'outline'}
                onClick={() => setHasTeam(false)}
                fullWidth
              >
                Нет, ищу команду
              </Button>
            </div>
          </div>

          {hasTeam === true && (
            <div className={styles.teamSection}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Телеграм участников команды:</label>
                <div className={styles.teamMembers}>
                  {teamMembers.map((member, index) => (
                    <div key={index} className={styles.memberInputWrapper}>
                      <input
                        type="text"
                        value={member}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                        placeholder={`@username участника ${index + 1}`}
                        className={styles.memberInput}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(index)}
                          className={styles.removeButton}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleAddMember}
                >
                  + Добавить участника
                </Button>
              </div>
            </div>
          )}

          {hasTeam === false && (
            <div className={styles.teamSearchSection}>
              <p className={styles.infoText}>
                Вы будете зарегистрированы как участник без команды. Организатор распределит вас позже, или вы можете создать запрос на поиск команды в профиле.
              </p>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={
              hasTeam === null ||
              (hasTeam === true && teamMembers.filter(m => m.trim()).length === 0)
            }
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistrationModal;
