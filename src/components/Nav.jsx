import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BookmarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logoutSuccess } from "../redux/AuthSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import  {useLocalFavourites}  from "../utils/useFavourites";

const navigation = [
  { name: "Home", path: "/", current: true },
  { name: "Products", path: "/products", current: false },
  { name: "Find Product", path: "/find-product", current: false },
  { name: "Post Add", path: "/post-ad", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [myfavourites, setMyFavourites] = useState()
  
  const { favourites } = useLocalFavourites();
//  useEffect(() => {
//   setMyFavourites(favourites);
//   console.log("inside useeffect");
// }, [favourites]);

console.log( favourites,"navbar 2")
  const {isAuthenticated, user} = useSelector(state => state.auth)
 const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

const handleLogout = async () => {
  if (isLoggingOut) return; // prevent double logout
  setIsLoggingOut(true);
  try {
    dispatch(logoutSuccess());
  } catch (error) {
    toast.error("Error in signing out");
    console.log("Error", error);
  } finally {
    toast.success("Logout Successfully!");
    navigate('/');
    setIsLoggingOut(false);
  }
};


  return (
    <Disclosure as="nav" className="bg-gray-800 relative z-50 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="sm:flex flex-1 items-center justify-center sm:items-stretch sm:justify-start hidden">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/paktree.png"
                className="h-8 w-auto "
              />
            </div>
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className={classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
           <button
  type="button"
  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
>
  <span className="absolute -inset-1.5" />
  <span className="sr-only">Favourites</span>

  {/* Icon */}
  <BookmarkIcon aria-hidden="true" className="size-6" />

  {/* Red badge */}
  {favourites?.length > 0 && (
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs font-normal">
      {favourites?.length}
    </span>
  )}
</button>


            {/* Profile dropdown */}
            {!isAuthenticated ? (
  <div className="ml-3">
    <Link to="/login">
      <button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
        Login
      </button>
    </Link>
  </div>
) : (
  <Menu as="div" className="relative ml-3">
    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
      <span className="sr-only">Open user menu</span>
      <p className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">{user?.username ? user.username : "Gurst"}</p>
    </MenuButton>

    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
      <MenuItem>
        <Link
          to="/my-profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          My Profile
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to="/my-profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          My Ads
        </Link>
      </MenuItem>
      <MenuItem>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-gray-100"
        >
          Sign out
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
)}

          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.path}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
