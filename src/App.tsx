import { Route, Routes } from 'react-router-dom';
import { AnimeListPage, HomePage } from './Pages';
import { Layout } from './Components';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/anime-list" element={<AnimeListPage />} />
        </Route>
      </Routes>
    </>
  );
};
  