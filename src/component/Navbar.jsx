import React, { use, useState } from "react";
import { RiCloseLine, RiMenuFoldFill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    logOut().then(() => {
      console.log('logout successfully')
  }).catch((error) => {
      console.error('Logout failed:', error);
  });
  }

  return (
    <nav className="flex items-center justify-between px-10 py-5 text-white bg-opacity-30 ">
      {/* logo title */}
      <div className="text-2xl font-bold">Afroja Travel</div>
      {/* laptop menu  */}
      <div className="">
        <ul className=" space-x-6 items-center hidden md:flex">
          <NavLink to="/" className="hover:text-yellow-400 cursor-pointer">
            Home
          </NavLink>
          <NavLink
            to="/destination"
            className="hover:text-yellow-400 cursor-pointer"
          >
            Destinations
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-yellow-400 cursor-pointer"
          >
            Contact
          </NavLink>
          {user && (
            <img
              className="w-14 h-14 rounded-full"
              src={user.photoURL}
              alt="Profile"
            />
          )}
          {user ? (
              <button
              onClick={handleLogin}
              className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 "
            >
              LogOut
            </button>
              
            ) : (
              <Link
                to="/auth/login"
                className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 "
              >
                LogIn
              </Link>
            )}
        </ul>

        <div className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiCloseLine size={28} /> : <RiMenuFoldFill size={28} />}
        </div>

        {/* mobile menu icon responsive */}
        {isOpen && (
          <ul className=" absolute top-0 right-0 bg-black bg-opacity-90 rounded-lg w-[50%] p-5 space-y-4 flex flex-col items-start z-10">
            <div
              className="block absolute right-1 top-1 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <RiCloseLine size={28} />
              ) : (
                <RiMenuFoldFill size={28} />
              )}
            </div>
            <NavLink to="/" className="hover:text-yellow-400 cursor-pointer">
              Home
            </NavLink>
            <NavLink
              to="/destination"
              className="hover:text-yellow-400 cursor-pointer"
            >
              Destinations
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-yellow-400 cursor-pointer"
            >
              Contact
            </NavLink>
            {user && (
              <img
                className="w-14 h-14 rounded-full"
                src={user.photoURL}
                alt="Profile"
              />
            )}
            {user ? (
              <button
              onClick={logOut}
              className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 "
            >
              LogOut
            </button>
              
            ) : (
              <Link
                to="/auth/login"
                className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 "
              >
                LogIn
              </Link>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
