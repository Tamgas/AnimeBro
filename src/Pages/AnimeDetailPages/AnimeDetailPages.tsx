import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { $api, IMG_HOST, VIDEO_HOST } from '../../api';
import { Title } from '../../Types/anime.types';
import ReactPlayer from 'react-player';
import { Badge } from '../../Components';
import { Loader } from '../../Components/Loader/Loader';

export const AnimeDetailPages = () => {
  const [title, setTitle] = useState<Title>();
  const [activeEpisode, setActiveEpisode] = useState(1);
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<string>('sd')

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container py-5">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
          <img src={IMG_HOST + title?.posters.original.url} alt="" />
          <p className="text-justify">
            {title?.description}
            <div className="flex flex-wrap gap-2 p-2 ">
              {title?.genres.map(genre => (
                <Badge key={genre} text={genre} />
              ))}
            </div>
          </p>
        </div>
      </div>
      <div className="container py-5">
        <div className="p-5 bg-slate-800/20 rounded-lg ">
          <select
            value={activeEpisode}
            onChange={e => setActiveEpisode(Number(e.target.value))}
            className=" w-full bg-slate-800 p-2 rounded-lg outline-none cursor-pointer "
          >
            {title?.player.list.map(episode => (
              <option key={episode?.uuid} value={episode?.episode}>Серия {episode?.episode}</option>
            ))}
          </select>
          <select onChange={e => setVideo(e.target.value)} >
            <option value="sd">SD</option>
            <option value="hd">HD</option>
            <option value="fhd">FullHD</option>
          </select>

          {title?.player.list.map(episode => (
            <div className="mt-5" key={episode?.uuid}>
              {episode?.episode === activeEpisode ? (
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={VIDEO_HOST + episode?.hls[video]}
                  controls
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
