import React, { useState, useEffect } from 'react';
import { AnimeList, Title } from '../../Types/anime.types';
import { $api } from '../../api';
import { AnimeCard } from '../../Components';
import { Loader } from '../../Components/Loader/Loader';

export const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [titles, setTitles] = useState<Title[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (search.trim() === '') {
      setTitles(undefined);
      setLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      getSearchTitles();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const getSearchTitles = () => {
    setLoading(true);
    $api
      .get<AnimeList>('/title/search', {
        params: {
          items_per_page: 9,
          search: search,
          
        },
      })
      .then(response => {
        setTitles(response?.data.list);
        setLoading(false);
      });
  };

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-5">Добро пожаловать на главную страницу аниме!</h1>
        <p className="text-lg mb-8">
          Здесь вы можете насладиться увлекательным миром японской анимации. Независимо от ваших предпочтений, здесь вы
          обязательно найдете что-то интересное для себя.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            getSearchTitles();
          }}
          className="flex justify-center items-center gap-4"
        >
          <input
            type="text"
            placeholder="Начните вводить название аниме..."
            className="outline-none bg-gray-100 border border-gray-300 text-black w-full py-2 px-4 rounded-md focus:border-blue-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Найти
          </button>
        </form>
      </div>
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <Loader />
          ) : titles && titles.length ? (
            titles.map(title => (
              <AnimeCard
                key={title.id}
                image={title?.posters.original.url}
                title={title?.names.ru}
                code={title?.code}
              />
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};
