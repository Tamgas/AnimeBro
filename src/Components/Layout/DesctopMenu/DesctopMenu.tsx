import { Link, NavLink } from 'react-router-dom';

export const DescTopMenu = () => {
  return (
    <>
      <header className="hidden md:block sticky top-0 left-0 bg-slate-900 border-b border-slate-500 z-10 ">
        <nav className="container py-3 flex items-center justify-between">
          <h1 className="text-2xl bg-gradient-to-r from-blue-500 to-violet-500 font-bold bg-clip-text text-transparent">
            <Link to="/">AniBro</Link>
          </h1>
          <div className="flex gap-5 items-center">
            <NavLink to="/anime-list" className="header-link text lg font-semibold ">
              Список Аниме
            </NavLink>
            <NavLink to="/last-updates" className="header-link text-lg font-semibold">
              Последние Обновление
            </NavLink>
            <NavLink to="schedule" className="header-link text-lg font-semibold">
              Расписание
            </NavLink>
            
          </div>
        </nav>
      </header>
    </>
  );
};
