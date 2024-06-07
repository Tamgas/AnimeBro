import { useEffect, useState } from 'react';
import { $api } from '../../api';
import { Pagination, PaginationProps } from 'antd';
import { AnimeList, IPagination, Title } from '../../Types/anime.types';
import { AnimeCard } from '../../Components';
import { Loader } from '../../Components/Loader/Loader';

export const LastChange = () => {
  const [titles, setTitles] = useState<Title[]>();
  const [pagination, setPagination] = useState<IPagination>();
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);

  const changePage: PaginationProps['onChange'] = page => {
    setActivePage(page);
  };

  useEffect(() => {
    setLoading(true);
    $api
      .get<AnimeList>('/title/changes', {
        params: {
          playlist_type: 'array',
          page: activePage,
          items_per_page: 9,
        },
      })
      .then(response => {
        setTitles(response.data.list);
        setPagination(response.data.pagination);
        setLoading(false);
      });
  }, [activePage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center text-lg mt-2 py-6">Последние Изменение в Тайтлах</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 justify-items-center py-5">
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
        <div className="flex items-center justify-center bg-white text-red-600">
          <Pagination
            className="md:hidden block text-red-600"
            current={activePage}
            total={pagination?.pages}
            defaultCurrent={1}
            onChange={changePage}
            showSizeChanger={false}
            size="small"
          />
          <Pagination
            className="hidden md:block"
            current={activePage}
            total={pagination?.pages}
            defaultCurrent={1}
            onChange={changePage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};
