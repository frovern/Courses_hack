// pages/FindTeamPage/FindTeamPage.tsx
import { useState } from "react";
import { useHackathonStore } from "../../../store/hackathonStore";
import { useUserStore } from "../../../store/userStore";
import { fakeHackathons } from "../../../data/mockData";
import styles from "./TeamPage.module.css";

const TeamPage = () => {
  const { teamRequests, applyToTeam } = useHackathonStore();
  const { currentUser } = useUserStore();

  const [filters, setFilters] = useState({
    hackathonId: "" as string,
    neededRoles: [] as string[],
    teamLevel: "" as string,
  });

  const hackathons = fakeHackathons;
  const [allRoles] = useState([
    "бэк",
    "фронт",
    "фулл стек",
    "дизайн",
    "аналитик",
    "продакт менеджер",
  ]);
  const [teamLevels] = useState([
    "новички",
    "опытные",
    "смешанная",
    "профессиональная",
  ]);

  const handleApply = (requestUserId: string, hackathonId: string) => {
    if (!currentUser) {
      alert("Войдите в систему, чтобы подать заявку");
      return;
    }

    if (requestUserId === currentUser.id) {
      alert("Вы не можете подать заявку на свой собственный запрос");
      return;
    }

    applyToTeam(hackathonId, requestUserId, currentUser.id);
    alert("Заявка подана!");
  };

  const handleRoleToggle = (role: string) => {
    if (filters.neededRoles.includes(role)) {
      setFilters({
        ...filters,
        neededRoles: filters.neededRoles.filter((r) => r !== role),
      });
    } else {
      setFilters({
        ...filters,
        neededRoles: [...filters.neededRoles, role],
      });
    }
  };

  const handleClearFilters = () => {
    setFilters({
      hackathonId: "",
      neededRoles: [],
      teamLevel: "",
    });
  };

  // Фильтруем запросы
  const filteredRequests = teamRequests.filter((request) => {
    // Фильтр по хакатону
    if (filters.hackathonId && request.hackathonId !== filters.hackathonId) {
      return false;
    }

    // Фильтр по ролям
    if (filters.neededRoles.length > 0) {
      const hasMatchingRole = filters.neededRoles.some((role) =>
        request.neededRoles.includes(role)
      );
      if (!hasMatchingRole) return false;
    }

    // Фильтр по уровню команды
    if (filters.teamLevel && request.teamLevel !== filters.teamLevel) {
      return false;
    }

    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Найти команду</h1>
        <p className={styles.subtitle}>
          Найдите подходящую команду для участия в хакатоне
        </p>
      </div>

      <div className={styles.content}>
        {/* Фильтры */}
        <div className={styles.filtersSection}>
          <h3 className={styles.filtersTitle}>Фильтры</h3>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Хакатон</label>
            <select
              className={styles.select}
              value={filters.hackathonId}
              onChange={(e) =>
                setFilters({ ...filters, hackathonId: e.target.value })
              }
            >
              <option value="">Все хакатоны</option>
              {hackathons.map((hackathon) => (
                <option key={hackathon.id} value={hackathon.id}>
                  {hackathon.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Нужные роли</label>
            <div className={styles.rolesGrid}>
              {allRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`${styles.roleButton} ${
                    filters.neededRoles.includes(role) ? styles.selected : ""
                  }`}
                  onClick={() => handleRoleToggle(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Уровень команды</label>
            <div className={styles.levelButtons}>
              {teamLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`${styles.levelButton} ${
                    filters.teamLevel === level ? styles.selected : ""
                  }`}
                  onClick={() => setFilters({ ...filters, teamLevel: level })}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button className={styles.clearButton} onClick={handleClearFilters}>
            Сбросить фильтры
          </button>
        </div>

        {/* Список запросов */}
        <div className={styles.requestsList}>
          {filteredRequests.length === 0 ? (
            <div className={styles.noResults}>
              <p>По вашим фильтрам ничего не найдено</p>
              <p>
                Попробуйте изменить фильтры или создайте свой запрос на странице
                профиля
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => {
              const hasApplied = currentUser
                ? request.applications.includes(currentUser.id)
                : false;
              const isOwnRequest = currentUser?.id === request.userId;

              return (
                <div
                  key={`${request.hackathonId}-${request.userId}`}
                  className={styles.requestCard}
                >
                  <div className={styles.requestHeader}>
                    <h3 className={styles.requestTitle}>
                      Поиск команды для хакатона #{request.hackathonId}
                    </h3>
                    <span className={styles.requestDate}>
                      {new Date(request.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>

                  <div className={styles.requestContent}>
                    <div className={styles.requestDetails}>
                      <p className={styles.detailItem}>
                        <strong>Нужные роли:</strong>{" "}
                        {request.neededRoles.join(", ")}
                      </p>
                      <p className={styles.detailItem}>
                        <strong>Уровень команды:</strong> {request.teamLevel}
                      </p>
                      <p className={styles.detailItem}>
                        <strong>Заявок подано:</strong>{" "}
                        {request.applications.length}
                      </p>
                      {request.description && (
                        <p className={styles.detailItem}>
                          <strong>Описание:</strong> {request.description}
                        </p>
                      )}
                    </div>

                    <div className={styles.requestActions}>
                      {!currentUser ? (
                        <p className={styles.loginPrompt}>
                          Войдите в систему, чтобы подать заявку
                        </p>
                      ) : isOwnRequest ? (
                        <p className={styles.ownRequest}>Это ваш запрос</p>
                      ) : hasApplied ? (
                        <p className={styles.applied}>Вы уже подали заявку</p>
                      ) : (
                        <button
                          className={styles.applyButton}
                          onClick={() =>
                            handleApply(request.userId, request.hackathonId)
                          }
                        >
                          Подать заявку
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
