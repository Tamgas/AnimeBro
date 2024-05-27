import { Outlet } from "react-router-dom";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { DescTopMenu } from "./DesctopMenu/DesctopMenu";

export const Layout = () => {
  return (
    <>
    <DescTopMenu/>
     <MobileMenu/>
      <Outlet />
    </>
  );
};
