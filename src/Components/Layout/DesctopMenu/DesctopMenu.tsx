import { Link } from "react-router-dom";

export const DescTopMenu = () => {
  return (
    <>
      <header className="hidden md:block">
        <nav>
          <h1 className="text-2xl bg-gradient-to-r from-blue-500 to-violet-500 font-bold bg-clip-text text-transparent">
            <Link to="/">AniBro</Link>
          </h1>
        </nav>
      </header>
    </>
  );
};
