import { useNavigate } from 'react-router-dom';
import { AnimeCardProps } from './AnimeCard.types';
import { IMG_HOST } from '../../api';
import { useInView } from 'react-intersection-observer';

export const AnimeCard = ({ code, image, title }: AnimeCardProps) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true, 
    rootMargin: '100px', 
  });

  return (
    <div
      className="w-full border border-gray-300 shadow-lg rounded-xl p-4 flex flex-col items-center bg-white transform transition-transform hover:scale-105 cursor-pointer"
      ref={ref}
      onClick={() => navigate(`/title/${code}`)}
    >
      {inView && (
        <img
          src={`${IMG_HOST}/${image}`}
          alt={title}
          className="rounded-t-xl w-full h-auto object-cover"
          loading="lazy"
        />
      )}
      <div className="w-full p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2 truncate w-full">
          {title}
        </h2>
        <button
          onClick={() => navigate(`/title/${code}`)}
          className="mt-2 bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-800 transition-colors w-full"
        >
          Перейти к просмотру
        </button>
      </div>
    </div>
  );
};
