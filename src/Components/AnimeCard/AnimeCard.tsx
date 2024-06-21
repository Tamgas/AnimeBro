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
      className="w-full border border-slate-500 rounded-lg p-5 flex flex-col items-center cursor-pointer"
      ref={ref}
      onClick={() => navigate(`/title/${code}`)}
    >
      {inView && (
        <img
          src={`${IMG_HOST}/${image}`}
          alt={title}
          className="rounded-lg w-full md:w-auto"
          loading="lazy"
        />
      )}
      <h2 className="mt-2 text-lg font-semibold text-center">{title}</h2>
      <button
        onClick={() => navigate(`/title/${code}`)}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full md:w-auto"
      >
        Перейти к просмотру
      </button>
    </div>
  );
};
