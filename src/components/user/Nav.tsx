import { IoMenu, IoLogOut } from "react-icons/io5";
import { IoIosArrowDropleftCircle, IoMdSettings } from "react-icons/io";
import { MdOutlineQueryStats } from "react-icons/md";
import { FaTableCellsLarge } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUser } from "@/Providers/UserContext";

interface Props {
  children?: React.ReactNode;
}

const Nav: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const [__, _, removeCookie] = useCookies(["token"]);
  const [show, setShow] = useState<boolean>(true);
  const handleToggle = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    removeCookie("token");
  };

  return (
    <motion.div
      className="relative w-auto flex"
      animate={{ x: show ? 0 : -320 }}
    >
      {show ? (
        <IoIosArrowDropleftCircle
          className="absolute top-0 z-10 text-slate-900 left-80 ml-3 mt-3 text-2xl cursor-pointer"
          onClick={handleToggle}
        />
      ) : (
        <IoMenu
          className="absolute top-0 z-10 left-80 text-slate-900 ml-3 mt-3 text-2xl cursor-pointer"
          onClick={handleToggle}
        />
      )}
      <div className="bg-slate-900 xl:w-80 h-screen flex flex-col gap-3 text-white py-12 px-12">
        <div className="flex flex-col">
          <p className="text-bold">Hi, Admin</p>
          <p className="text-sm">{user?.email}</p>
        </div>
        <div className="flex flex-col justify-between h-screen">
          <div>
            <Link
              to="/account/"
              className="flex items-center gap-3 hover:pl-3 transition-all cursor-pointer"
            >
              <MdSpaceDashboard className="text-xl" />
              <p>Dashboard</p>
            </Link>
            <Link
              to="/account/tables/"
              className="flex items-center gap-3 hover:pl-3 transition-all cursor-pointer"
            >
              <FaTableCellsLarge className="text-xl" />
              <p>Tables</p>
            </Link>
            <Link
              to="/account/stats/"
              className="flex items-center gap-3 hover:pl-3 transition-all cursor-pointer"
            >
              <MdOutlineQueryStats className="text-xl" />
              <p>Statistics</p>
            </Link>
            <Link
              to="/account/setting/"
              className="flex items-center gap-3 hover:pl-3 transition-all cursor-pointer"
            >
              <IoMdSettings className="text-xl" />
              <p>Account Setting</p>
            </Link>
          </div>
          <div
            className="flex items-center gap-3 hover:pl-3 transition-all cursor-pointer"
            onClick={handleLogout}
          >
            <IoLogOut className="text-xl" />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="w-[1000px]">{children}</div>
    </motion.div>
  );
};

export default Nav;
