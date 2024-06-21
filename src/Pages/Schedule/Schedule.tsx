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
  posters: {
    original: {
      url: string;
    };
  };
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
        setError('крч ошибка берип атат, нормальный код жазбайсынбы');
        setLoading(false);
      });
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

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
      <h2 className="text-center text-lg mt-2 py-6">Расписание выхода тайтлов</h2>
      {schedule.map(daySchedule => (
        <div
          key={daySchedule.day}
          
          className="py-5 animate-fadeIn"
        >
          <h3 className={`text-xl py-5 text-center text-white ${getDayStyle(daySchedule.day)}`}>
            {daysOfWeek[daySchedule.day]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center py-5">
            {daySchedule.list.map(item => (
              <AnimeCard
                key={item.id}
                image={item.posters.original.url}
                title={item.names.ru}
                code={item.code}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 fixed bottom-10 right-10"
        onClick={scrollToBottom}
      >
        Вниз
      </button>
    </div>
  );
}

const getDayStyle = (day: number) => {
  switch (day) {
    case 0: return "bg-red-500"; 
    case 1: return "bg-orange-500"; 
    case 2: return "bg-yellow-500"; 
    case 3: return "bg-green-500"; 
    case 4: return "bg-blue-500"; 
    case 5: return "bg-indigo-500"; 
    case 6: return "bg-purple-500"; 
    default: return "bg-gray-500";
  }
}

export default Schedule;
