import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages';
import { Layout } from './Components';
export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path="/" element={<HomePage />} index />
        </Route>
      </Routes>
    </>
  );
};
