import { useEffect, useState } from 'react';
import { AnimeList, Title } from '../../Types/anime.types';
import { $api } from '../../api';
import { AnimeCard } from '../../Components';
import { Loader } from '../../Components/Loader/Loader';

export const HomePage = () => {
  const [title, setTitle] = useState<Title>();
  const [search, setSearch] = useState<string>('');
  const [titles, setTitles] = useState<Title[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    $api.get<Title>('/title/random').then(response => {
      setTitle(response.data);
      setLoading(false);
    });
  }, []);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container py-5 ">
        <div className="max-w-96 mx-auto">
          {title && (
            <AnimeCard
              code={title?.code}
              image={title?.posters.original.url}
              title={title?.names.ru}
            />
          )}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            getSearchTitles();
          }}
          className="py-5 flex flex-col md:flex-row items-center gap-2 "
        >
          <input
            type="text"
            placeholder="Начните вводить название аниме... "
            className=" outline-none bg-slate-950 border border-slate-800 w-full py-1 px-2 rounded-lg "
            value={search}
            onChange={e => setSearch((e.target as HTMLInputElement).value)}
          />
          <button className="w-full md:w-auto bg-slate-800 rounded-lg px-2 py-1 border border-slate-500">
            Найти
          </button>
        </form>
      </div>
      <div className="container py-5 ">
        {' '}
        <div className=" grid md: grid-cols-2 lg:grid-cols-3  gap-5 justify-items-center py-5">
          {titles &&
            titles.map(title => (
              <AnimeCard
                key={title.id}
                image={title?.posters.original.url}
                title={title?.names.ru}
                code={title?.code}
              />
            ))}
        </div>
      </div>
    </>
  );
};
