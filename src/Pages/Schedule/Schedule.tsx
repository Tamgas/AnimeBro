import React, { useEffect, useState } from 'react';
import { $api } from '../../api';
import { Loader } from '../../Components/Loader/Loader';
import { AnimeCard } from '../../Components';

const daysOfWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
];

interface AnimeTitle {
  posters: any;
  id: number;
  code: string;
  names: {
    ru: string;
    en: string;
  };
  season: {
    year: number;
    week_day: number;
  };
  date: string;
}

interface ScheduleDay {
  day: number;
  list: AnimeTitle[];
}

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleDay[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    $api
      .get<ScheduleDay[]>('/title/schedule')
      .then(response => {
        console.log('API response:', response.data);
        setSchedule(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching schedule:', error);
        setError('Ошибка загрузки расписания');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!schedule || schedule.length === 0) {
    return <div>Расписание не найдено</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center text-lg mt-2">Расписание</h2>
      {schedule.map(daySchedule => (
        <div key={daySchedule.day} className="py-5">
          <h3 className="text-xl">{daysOfWeek[daySchedule.day]}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center py-5">
            {daySchedule.list.map(item => (
              <AnimeCard
                key={item.id}
                image={item?.posters.original.url}
                title={item?.names.ru}
                code={item?.code}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Schedule;
