import { useState, useEffect } from "react";
import { Search, ChevronDown, User2, Menu, X, Megaphone, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthModal from "@/components/auth/AuthModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar({
  onScrollToAbout,
  onSearch,
  searchTerm,
  setSearchTerm,
}) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [currentDate, setCurrentDate] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { isLoggedIn, user, logout, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isPricing = location.pathname.startsWith("/pricing");
  const isHome = location.pathname === "/";
  const isAdvertise = location.pathname === "/dashboard/advertise";

  // Handle advertise click with authentication check
  const handleAdvertiseClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setAuthMode("signin");
      setAuthModalOpen(true);
    }
  };

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    let timeoutId = null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 10);
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openSignUp = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const openSignIn = () => {
    setAuthMode("signin");
    setAuthModalOpen(true);
  };

  const handleSignOut = () => {
    logout();
    setShowProfileDropdown(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    navigate("/about");
    setIsMobileMenuOpen(false);
  };

  const getNavLinkClasses = (isActive) =>
    `px-4 py-2 font-medium rounded-full transition-all ${
      isActive
        ? "text-white bg-gradient-to-r from-[#00254A] to-[#003d6b] shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:text-[#00254a] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  const getMobileNavLinkClasses = (isActive) =>
    `block px-4 md:py-3 font-medium rounded-xl transition-all ${
      isActive
        ? "text-white bg-gradient-to-r from-[#00254A] to-[#003d6b] shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:text-[#00254a] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  return (
    <>
      <nav
        className={`
          fixed top-0 px-4 md:px-8 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm
          transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="mx-auto">
          <div className="hidden lg:grid lg:grid-cols-3 items-center py-2 gap-8">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Alamo City Pulse"
                  className="h-20 w-auto object-contain rounded-md cursor-pointer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "block";
                  }}
                />
              </Link>
              <div className="hidden text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                ALAMOCITYPULSE
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentDate}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Today's Paper</div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <Input
                  placeholder="Search articles, topics..."
                  className="
                    pl-12 pr-4 py-3 w-full
                    rounded-full
                    border border-gray-300 dark:border-gray-700
                    !bg-white dark:!bg-[#1a2332]
                    !text-black dark:!text-gray-100
                    placeholder:text-gray-500 dark:placeholder:text-gray-500
                    focus:!bg-white dark:focus:!bg-[#1a2332]
                    focus:border-[#00254A]
                    focus:ring-2 focus:ring-[#00254A]/30
                    focus-visible:outline-none
                    transition-all duration-200 shadow-sm
                  "
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    if (!value || !value.trim()) {
                      setTimeout(() => setSearchTerm(""), 0);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="relative profile-dropdown">
                    <button
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
                      className="flex items-center space-x-3 p-2 pr-4 bg-gradient-to-r from-[#00254A] to-[#003d6b] text-white rounded-full hover:shadow-lg transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <User2 size={18} />
                      </div>
                      <span className="text-sm font-medium">
                        {user?.firstName || "Profile"}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          showProfileDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {showProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <User2 size={16} className="mr-3" />
                          Profile Settings
                        </Link>
                        <Link
                          to="/dashboard/advertise"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={(e) => {
                            handleAdvertiseClick(e);
                            setShowProfileDropdown(false);
                          }}
                        >
                          <Megaphone size={16} className="mr-3" />
                          {isAdmin?.() ? "Manage Advertisements" : "Advertise with Us"}
                        </Link>
                        <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={openSignIn}
                    className="px-6 py-2 bg-white text-black dark:text-black border border-[#00254A] hover:bg-[#00254A] hover:text-white transition-all duration-200 rounded-full font-medium"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={openSignUp}
                    className="px-6 py-2 bg-gradient-to-r from-[#00254A] to-[#003d6b] text-white hover:shadow-lg transition-all duration-200 rounded-full font-medium"
                  >
                    Sign Up
                  </Button>
                  <div className="ml-4 px-4 py-2 text-sm text-[#b32021] font-medium bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-full">
                    🎉 SAVE 50% ON Premium
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex lg:hidden items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Alamo City Pulse"
                className="h-12 w-auto object-contain rounded-md"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div className="hidden text-xl font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                ALAMOCITYPULSE
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18}
                />
                <Input
                  placeholder="Search..."
                  className="
                    pl-10 pr-4 py-2 w-64
                    rounded-full
                    border border-gray-300 dark:border-gray-700
                    !bg-white dark:!bg-[#1a2332]
                    !text-black dark:!text-gray-100
                    placeholder:text-gray-500 dark:placeholder:text-gray-500
                    focus:!bg-white dark:focus:!bg-[#1a2332]
                    focus:border-[#00254A]
                    focus:ring-2 focus:ring-[#00254A]/30
                    focus-visible:outline-none
                    transition-all duration-200
                  "
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    if (!value || !value.trim()) {
                      setTimeout(() => setSearchTerm(""), 0);
                    }
                  }}
                />
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun size={18} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Moon size={18} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/dashboard/profile"
                    className="p-2 bg-gradient-to-r from-[#00254A] to-[#003d6b] rounded-full text-white hover:shadow-lg transition-all"
                  >
                    <User2 size={20} />
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#00254a] dark:hover:text-white font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={openSignIn}
                    className="px-4 py-2 bg-white text-black dark:text-black border border-[#00254A] hover:bg-[#00254A] hover:text-white rounded-full text-sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={openSignUp}
                    className="px-4 py-2 bg-gradient-to-r from-[#00254A] to-[#003d6b] text-white hover:shadow-lg rounded-full text-sm"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex md:hidden items-center justify-between py-1">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Alamo City Pulse"
                className="h-14 w-auto object-cover rounded-md"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div className="hidden text-lg font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                ALAMOCITYPULSE
              </div>
            </div>
            <div className="md:hidden">
              <div className="mt-3 text-center">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentDate}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Today's Paper</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun size={18} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Moon size={18} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
              {isLoggedIn ? (
                <Link
                  to="/dashboard/profile"
                  className="p-2 bg-gradient-to-r from-[#00254A] to-[#003d6b] rounded-full text-white"
                >
                  <User2 size={18} />
                </Link>
              ) : (
                <Button
                  onClick={openSignIn}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#00254A] to-[#003d6b]  text-black dark:text-black rounded-full text-xs font-medium"
                >
                  Sign In
                </Button>
              )}
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
          <div className="relative md:hidden py-2">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={18}
            />
            <Input
              placeholder="Search articles, topics..."
              className="
                pl-12 pr-4 py-3 w-full
                rounded-full
                border border-gray-300 dark:border-gray-700
                !bg-white dark:!bg-[#1a2332]
                !text-black dark:!text-gray-100
                placeholder:text-gray-500 dark:placeholder:text-gray-500
                focus:!bg-white dark:focus:!bg-[#1a2332]
                focus:border-[#00254A]
                focus:ring-2 focus:ring-[#00254A]/30
                focus-visible:outline-none
                transition-all duration-200
              "
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                if (!value || !value.trim()) {
                  setTimeout(() => setSearchTerm(""), 0);
                }
              }}
            />
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center space-x-8 py-3 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80">
          <Link to="/" className={getNavLinkClasses(isHome)}>
            Home
          </Link>
          {!(isDashboard || isPricing) && (
            <button
              onClick={handleAboutUsClick}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#00254a] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all"
            >
              About Us
            </button>
          )}
          <Link
            to="/dashboard/advertise"
            className={getNavLinkClasses(isAdvertise)}
            onClick={handleAdvertiseClick}
          >
            {isAdmin?.() ? "Manage Advertisements" : "Advertise with Us"}
          </Link>
          <Link to="/pricing" className={getNavLinkClasses(isPricing)}>
            Pricing
          </Link>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="px-4 md:py-2 space-y-1">
              <Link
                to="/"
                className={getMobileNavLinkClasses(isHome)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {!isDashboard && (
                <button
                  onClick={handleAboutUsClick}
                  className="block w-full text-left px-4 md:py-3 text-gray-700 dark:text-gray-300 font-medium hover:text-[#00254a] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
                >
                  About Us
                </button>
              )}
              <Link
                to="/dashboard/advertise"
                className={getMobileNavLinkClasses(isAdvertise)}
                onClick={(e) => {
                  handleAdvertiseClick(e);
                  setIsMobileMenuOpen(false);
                }}
              >
                {isAdmin?.() ? "Manage Advertisements" : "Advertise with Us"}
              </Link>
              <Link
                to="/pricing"
                className={getMobileNavLinkClasses(isPricing)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {isLoggedIn ? (
                <div className="px-4 py-2 md:py-4 border-t border-gray-100 dark:border-gray-700 mt-4">
                  <div className="flex flex-col space-y-3">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Welcome back!
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.firstName || "User"}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700 mt-4">
                  <div className="flex flex-col space-y-3">
                    <Button
                      onClick={() => {
                        openSignUp();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-[#00254A] to-[#003d6b] text-white hover:shadow-lg rounded-xl font-medium"
                    >
                      Sign Up
                    </Button>
                    <div className="px-4 py-2 text-sm text-[#b32021] dark:text-red-400 font-medium bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center">
                      🎉 SAVE 50% ON Premium
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
