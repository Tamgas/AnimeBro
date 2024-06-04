import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimeDetailPages, AnimeListPage, HomePage } from './Pages';
import Schedule from './Pages/Schedule/Schedule';
import { Layout } from './Components';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/anime-list" element={<AnimeListPage />} />
          <Route path="/title/:code" element={<AnimeDetailPages />} />
          <Route path="/schedule" element={<Schedule />} />
        </Route>
      </Routes>
    </>
  );
};
