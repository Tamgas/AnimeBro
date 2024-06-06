import { Bars3BottomLeftIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const MobileMenu = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 left-0 bg-slate-900 border-b border-slate-500 z-10 ">
        <nav className="container flex item-center justify-between py-2">
          <h1 className="text-2xl bg-gradient-to-r from-blue-500 to-violet-500 font-bold bg-clip-text text-transparent">
            <Link to="/">AniBro</Link>
          </h1>
          <button onClick={() => setActive(!active)}>
            <Bars3BottomLeftIcon className="w-9" />
          </button>
        </nav>
      </header>
      <div
        className={`md:hidden absolute top-0 left-0 w-full h-full bg-slate-800 py-24 transition-transform ${
          active ? '-translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="w-full h-full container flex flex-col items-end gap-5 ">
          <NavLink onClick={() => setActive(false)} to="/anime-list" className="text-2xl font-semibold ">
            Список Аниме
          </NavLink>
          <NavLink  onClick={() => setActive(false)}  to="/last-updates" className="text-2xl font-semibold">
            Последние Обновление
          </NavLink>
          <NavLink onClick={() => setActive(false)} to="schedule" className="text-2xl font-semibold">
            Расписание
          </NavLink>
        </nav>
      </div>
    </>
  );
};
