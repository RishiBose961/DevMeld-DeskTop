import {
  Bell,
  Code,
  Edit2,
  LayoutDashboard,
  MessageSquare,
  SquareGanttChart,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import { Button } from "../ui/button";
// import { useSelector } from "react-redux";
// import { Link } from "react-router";
// import { ModeToggle } from "../mode-toggle";

export const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        user: {
          avatar: string | undefined; username: string; id: number 
};
      };
    }) => state.auth
  );


  const navItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { id: "Create", label: "Create", icon: Edit2, href: "create" },
    { id: "Review", label: "Review", icon: SquareGanttChart, href: "review" },
    {
      id: "Community",
      label: "Community",
      icon: MessageSquare,
      href: "community",
    },
  ];

  return (
    <header className="border-b bg-white z-10  border-gray-200 dark:border-gray-700 sticky top-0">
      <div>
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              DevMeld
            </h1>
          </div>

          {/* Navigation */}
          {isAuthenticated && (
            <>
              <nav className="hidden md:flex space-x-8">
                {navItems.map(({ id, label, icon: Icon, href }) => (
                  <NavLink
                    key={id}
                    to={`/${href}`}
                    className={({ isActive }) =>
                      `flex flex-col items-center py-2 px-4 text-xs font-medium 
         transition-all duration-300 ease-in-out
         ${isActive
                        ? "text-black bg-primary/50 rounded-xl dark:text-white font-semibold shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 mb-1 transition-all duration-300" />
                    <span className="transition-all duration-300">{label}</span>
                  </NavLink>
                ))}
              </nav>
            </>
          )}

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                 {/* <Button
            onClick={handleLogout}
            className="w-full rounded-full bg-red-500 text-white hover:bg-red-900 mt-3"
          >
            Logout
          </Button> */}
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.username}
                  </p>
               
                </div>
                <img
                  src={user?.avatar}
                  alt="User Avatar"
                  className="size-10 rounded-full border-2 border-gray-200 bg-yellow-500 dark:border-gray-700"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/signin">
                  <Button className="text-sm font-medium transition-colors">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isAuthenticated && (
        <>
          <div className="md:hidden border-t border-gray-200 bg-white dark:border-gray-700">
            <div className="flex justify-around py-2">
              {navItems.map(({ id, label, icon: Icon, href }) => (
                <NavLink
                  key={id}
                  to={`/${href}`}
                  className={({ isActive }) =>
                    `flex flex-col items-center py-2 px-4 text-xs font-medium
           transition-all duration-300 ease-in-out
           ${isActive
                      ? "text-black bg-primary/50 rounded-xl dark:text-white font-semibold shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 mb-1 transition-all duration-300" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
};
