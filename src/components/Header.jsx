import { useEffect } from "react";
import Profile from "./Profile";

const Header = () => {
  useEffect(() => {
    console.log("log in Header useeffect...");
  }, []);
  return (
    <header className="border mb-10 min-h-[60px] px-24 flex items-center justify-between">
      <a className="/">Logo</a>

      <Profile />
    </header>
  );
};

export default Header;
