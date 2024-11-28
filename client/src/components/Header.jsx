import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import countries from "./countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowDown,
  faSearch,
  faGlobeAsia,
  faSun,
  faMoon,
  faStickyNote,
  faCloudSunRain,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-between p-4">
        <div className="flex items-center ml-14 ">
          <FontAwesomeIcon
            icon={faGlobeAsia}
            style={{
              fontSize: "24px",
              marginRight: "5px",
            }}
          />
          <Link to="/">
            <h3 className="heading font-extrabold text-2xl ">News_Sphere</h3>
          </Link>
        </div>

        <ul
          className={`nav-ul flex items-center gap-3 whitespace-nowrap text-white mr-5 ${
            active ? "block" : "hidden"
          } lg:flex`}
        >
          <li className="font-bold hover:drop-shadow-xl changeonHover">
            <Link to="/" onClick={() => setActive(!active)}>
              All News
            </Link>
          </li>

          <li className="dropdown-li">
            <Link
              className="no-underline font-bold flex items-center gap-2 hover:drop-shadow-xl changeonHover"
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowCountryDropdown(false);
              }}
            >
              Top-Headlines{" "}
              <FontAwesomeIcon
                className={
                  showCategoryDropdown
                    ? "down-arrow-icon down-arrow-icon-active"
                    : "down-arrow-icon"
                }
                icon={faCircleArrowDown}
              />
            </Link>
            <ul
              className={
                showCategoryDropdown
                  ? "dropdown p-2 show-dropdown "
                  : "dropdown p-2"
              }
            >
              {category.map((element, index) => (
                <li key={index}>
                  <Link
                    to={`/top-headlines/${element}`}
                    className="flex gap-3 capitalize changeonHover"
                    onClick={() => {
                      setActive(!active);
                    }}
                  >
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {/* Country Dropdown */}
          <li className="dropdown-li">
            <Link
              className="no-underline font-bold flex items-center gap-2 hover:drop-shadow-xl changeonHover"
              onClick={() => {
                setShowCountryDropdown(!showCountryDropdown);
                setShowCategoryDropdown(false);
              }}
            >
              Country{" "}
              <FontAwesomeIcon
                className={
                  showCountryDropdown
                    ? "down-arrow-icon down-arrow-icon-active "
                    : "down-arrow-icon"
                }
                icon={faCircleArrowDown}
              />
            </Link>
            <ul
              className={
                showCountryDropdown
                  ? "dropdown p-2 show-dropdown"
                  : "dropdown p-2"
              }
            >
              {countries.map((element, index) => (
                <li key={index}>
                  <Link
                    to={"/country/" + element?.iso_2_alpha}
                    className="flex gap-3 changeonHover"
                    onClick={() => {
                      setActive(!active);
                      setShowCountryDropdown(false);
                    }}
                  >
                    <img
                      src={element?.png}
                      srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`}
                      alt={element?.countryName}
                    />
                    <span className="">{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {/* Search Icon */}

          <li>
            <Link to="/weather" className="text-white font-bold ">
              <FontAwesomeIcon
                icon={faCloudSunRain}
                style={{ fontSize: "24px" }}
              />
            </Link>
          </li>

          <li className="relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`border border-gray-300 rounded-md p-1
                `}
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-transparent border-none ml-2"
              >
                <FontAwesomeIcon icon={faSearch} style={{ fontSize: "24px" }} />
              </button>
            </form>
          </li>

          <li>
            <Link to="/messages" className="text-white font-bold">
              <FontAwesomeIcon
                icon={faStickyNote}
                style={{ fontSize: "24px" }}
              />
            </Link>
          </li>

          <li>
            <Link to="/feedback" className="text-white font-bold ">
              <FontAwesomeIcon
                icon={faCommentDots}
                style={{ fontSize: "24px" }}
              />
            </Link>
          </li>

          {/* Theme Toggle Button */}
          <li>
            <button
              className="flex items-center text-white"
              onClick={toggleTheme}
            >
              <FontAwesomeIcon
                icon={theme === "dark-theme" ? faSun : faMoon}
                style={{ fontSize: "20px", marginRight: "10px" }}
              />
            </button>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div
          className={`ham-burger z-index-1100 ${active ? "ham-open" : ""}`}
          onClick={() => setActive(!active)}
          aria-label={active ? "Close menu" : "Open menu"}
          role="button"
          tabIndex="0"
        >
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
