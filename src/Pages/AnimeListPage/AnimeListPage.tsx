import { useEffect, useState } from 'react';
import { $api } from '../../api';
import { Pagination, PaginationProps } from 'antd';
import { AnimeList, IPagination, Title } from '../../Types/anime.types';
import { Link } from 'react-router-dom'; 

export const AnimeListPage = () => {
  const [titles, setTitles] = useState<Title[]>();
  const [pagination, setPagination] = useState<IPagination>();
  const [activePage, setActivePage] = useState(1);

  const changePage: PaginationProps['onChange'] = page => {
    setActivePage(page);
  };

  useEffect(() => {
    $api
      .get<AnimeList>('/title/updates', {
        params: {
          playlist_type: 'array',
          page: activePage,
          items_per_page: 6,
        },
      })
      .then(response => {
        setTitles(response.data.list);
        setPagination(response.data.pagination);
      });
  }, [activePage]);

  console.log(titles);

  return (
    <>
      <div className="container py-5">
        <div className=" grid md: grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 justify-items-center py-5">
          {titles &&
            titles.map(title => (
              <div
                key={title.id}
                className=" w-full border border-slate-500 rounded-lg md:p-2 p-5 "
              >
                <img
                  src={`https://static-libria.weekstorm.one${title.posters.original.url}`}
                  alt=""
                  className="mx-auto"
                />

                <div />
                <h2 className="text-center text-lg mt-2 ">{title?.names.ru}</h2>
                <div className='flex  items-center justify-center p-2'>
                <Link to={`/title/${title?.code}`} className='bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-2 rounded-lg font-semibold hover:opacity-85 transition-opacity' >Перейти к просмотру</Link>
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-center">
          <Pagination
            className="md:hidden block"
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
