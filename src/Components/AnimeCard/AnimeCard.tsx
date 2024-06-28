import { useState } from 'react';
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

  // State to manage visibility of the card
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    navigate(`/title/${code}`);
    setIsVisible(false); // Hide the card when navigating
  };

  return (
    <div
      className={`w-full border border-gray-300 rounded-xl p-4 flex flex-col items-center bg-white cursor-pointer ${isVisible ? '' : 'hidden'}`}
      ref={ref}
      onClick={handleClick}
    >
      {inView && (
        <img
          src={`${IMG_HOST}/${image}`}
          alt={title}
          className="rounded-xl w-full h-auto object-cover"
          loading="lazy"
        />
      )}
      <div className="w-full p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2 truncate w-full">
          {title}
        </h2>
        <button
          onClick={handleClick}
          className="mt-2 bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-800 transition-colors w-full"
        >
          Перейти к просмотру
        </button>
      </div>
    </div>
  );
};
