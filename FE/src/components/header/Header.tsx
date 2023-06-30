import { NavLink } from "react-router-dom";
import headerStyles from "./Header.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

export const Header = () => {
  const authContext = useContext(AuthContext);
  return (
    <nav
      className={`navbar navbar-expand-md navbar-light py-3 ${headerStyles.header}`}
    >
      <div className="container-fluid">
        <NavLink className={`navbar-brand ${headerStyles.logo}`} to="/about">
          GetYourDiet
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className={`navbar-nav ${headerStyles["primary-nav"]}`}>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            {authContext.isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/fridge">
                  My Fridge
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/generator">
                Recipes Generator
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item m-1">
              {authContext.isLoggedIn ? (
                <NavLink
                  onClick={authContext.onLogout}
                  type="button"
                  className="btn btn-outline-dark"
                  to="/sign-in"
                >
                  Sign Out
                </NavLink>
              ) : (
                <NavLink
                  type="button"
                  className="btn btn-outline-dark"
                  to="/sign-in"
                >
                  Sign In
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
