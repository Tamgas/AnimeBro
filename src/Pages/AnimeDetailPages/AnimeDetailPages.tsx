import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { $api, IMG_HOST, VIDEO_HOST } from '../../api';
import { Title } from '../../Types/anime.types';
import ReactPlayer from 'react-player';

export const AnimeDetailPages = () => {
  const [title, setTitle] = useState<Title>();
  const [activeEpisode, setActiveEpisode] = useState(1);
  const { code } = useParams();

  useEffect(() => {
    $api
      .get<Title>('./title', {
        params: {
          code: code,
          playlist_type: 'array',
        },
      })
      .then(response => {
        console.log(response);

        setTitle(response?.data);
      });
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="flex flex-col items-center gap-5">
          <img src={IMG_HOST + title?.posters.original.url} alt="" />
          <p className="text-justify">{title?.description}</p>
        </div>
      </div>
      <div className="container py-5">
        <select
          value={activeEpisode}
          onChange={e => setActiveEpisode(Number(e.target.value))}
          className="bg-slate-800 p-2 rounded-lg outline-none"
        >
          {title?.player.list.map(episode => (
            <option value={episode?.episode}>Серия {episode?.episode}</option>
          ))}
        </select>

        {title?.player.list.map(episode => (
          <div>
            {episode?.episode == activeEpisode ? (
              <ReactPlayer url={VIDEO_HOST + episode?.hls.fhd} controls />
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
};
