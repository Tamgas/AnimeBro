import { useEffect, useState } from 'react';
import { Title } from '../../Types/anime.types';
import { $api } from '../../api';

export const HomePage = () => {
  const [title, setTitle] = useState<Title>();

  useEffect(() => {
    $api.get<Title>('/title/random')
      .then(response => setTitle(response?.data));
  }, []);
  
  console.log(title);
  

  return (
    <>
      <div className="container py-5 "></div>
    </>
  );
};
