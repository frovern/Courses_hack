import { mockHackathons } from '../../data/mockData';

const HackathonsPage = () => {
  return (
    <div>
      <h1>Выберите хакатон</h1>
      <p>Для начала выберите хакатон, в котором хотите участвовать</p>
      
      {mockHackathons.map(hackathon => (
        <div key={hackathon.id}>
          <h3>{hackathon.title}</h3>
          <p>{hackathon.description}</p>
          <p>Дата: {hackathon.startDate} - {hackathon.endDate}</p>
          <p>Локация: {hackathon.location}</p>
          <p>Статус: {hackathon.isActive ? 'Активный' : 'Завершён'}</p>
          
          <button>Выбрать этот хакатон</button>
        </div>
      ))}
    </div>
  );
};
export default HackathonsPage;