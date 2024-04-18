import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if the NavLink should be active
  const isActive = currentPath === to || currentPath.startsWith(`${to}/`);

  // Return the NavLink with the "active" class conditionally applied
  return (
    <Link to={to} className="flex items-center select-none">
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`${
            isActive && "bg-gray-900 text-white"
          } p-1 w-full font-normal rounded-md px-3 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all duration-200`}
       
      >
            {children}
      </Typography> 
    </Link> 
  );
};

const Header = () => {
    const navigate = useNavigate();
    
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 960) {
            setOpenNav(false);
          }
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

      const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavLink to="/" active={true}>
            Acceuil
          </NavLink>
          <NavLink to="/explore">Explorer</NavLink>
          <NavLink to="/categories">Catégories</NavLink>
          <NavLink to="/about">A Propos</NavLink>
        </ul>
    );
    
    // Function to close the navigation menu when the user navigates to a new page
    const handleCloseNavOnRouteChange = () => {
        setOpenNav(false);
    };

    // Use the useLocation hook to listen for changes in the pathname

    const location = useLocation();
    useEffect(() => {
        handleCloseNavOnRouteChange();
    }, [location.pathname]);

    const handleToggleNav = () => {
        setOpenNav(!openNav);
      };

    //Search Bar

    return (
    <>
            <ScrollToTop />
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
            onClick={() => navigate("/")}
          >
            Kongo Dev
          </Typography>

          <div className="flex items-center gap-4">
            <div>
                <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-900 cursor-pointer"
                    aria-hidden="true"
                    // onClick={()=>{setSearchBar(true)}}
                  />
            </div>
            <div className="mr-4 hidden lg:block">{navList}</div>

            <Button
                  variant="text"
                  size="md"
                  className="hidden rounded-full lg:inline-block text-blue-500  hover:bg-blue-50"
                  onClick={() => navigate("/login")}
                >
                  Connexion
                </Button>
                <Button
                  variant=""
                  size="md"
                  className="hidden rounded-full lg:inline-block bg-blue-500 "
                  onClick={() => navigate("/register")}
                >
                  Commencer
                </Button>

                <IconButton
                   variant="text"
                   className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                   ripple={false}
                   onClick={handleToggleNav}
                >
                    { openNav ? (
                         <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         className="h-6 w-6"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                         strokeWidth={2}
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M6 18L18 6M6 6l12 12"
                         />
                       </svg>
                    ) : ( 
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>  
                    )}
                </IconButton>

            </div>
            </div>

            <Collapse open={openNav}>
                {navList}
                <Button
                variant="text"
                size="sm"
                fullWidth
                className="mb-2"
                onClick={() => navigate("/login")}
              >
                Connexion
              </Button>

              <Button
                variant="gradient"
                size="sm"
                fullWidth
                className="mb-2"
                onClick={() => navigate("/register")}
              >
                Commencer
              </Button>
            </Collapse>

            </Navbar>

        </>
    )
}

export default Header




