import { Route, Routes } from 'react-router-dom';
import { AnimeDetailPages, AnimeListPage, HomePage, LastChange } from './Pages';
import { Layout } from './Components';
import Schedule from './Pages/Schedule/Schedule';
import Schedule from './Pages/Schedule/Schedule';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/anime-list" element={<AnimeListPage />} />
          <Route path="/title/:code" element={<AnimeDetailPages />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/last-changes" element={<LastChange />} />
        </Route>
      </Routes>
    </>
  );
};
