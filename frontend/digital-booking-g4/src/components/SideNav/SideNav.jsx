import React, { useState, useContext } from "react";
import Profile from "../Profile/Profile";
import Options from "./Options";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideNav.module.css";
import loggedContext from "../../contexts/loggedContext";

export default function SideNav() {
  const { isLogged, setIsLogged, rol } = useContext(loggedContext);
  const location = useLocation();
  const [isOpened, setIsOpened] = useState(false);

  function cerrarSesion() {
    setIsLogged(false);
    localStorage.clear();
  }

  const RenderComponent = () => {
    switch (location.pathname) {
      default:
        return (
          <>
            <Link to="/register">
              <Options
                contenido={"Crear cuenta"}
                onClick={() => setIsOpened(false)}
              />
            </Link>
            <Link to="/login">
              <Options
                contenido={"Iniciar sesión"}
                onClick={() => setIsOpened(false)}
              />
            </Link>
          </>
        );
      case "/login":
        return (
          <Link to="/register">
            <Options
              contenido={"Crear cuenta"}
              onClick={() => setIsOpened(false)}
            />
          </Link>
        );
      case "/register":
        return (
          <Link to="/login">
            <Options
              contenido={"Iniciar sesión"}
              onClick={() => setIsOpened(false)}
            />
          </Link>
        );
    }
  };

  const RenderUserComponent = () => {
    switch (location.pathname) {
      default:
        return (
          <>
            <Link
              to="/favorites"
            >
              <Options
                contenido={"Favoritos"}
                onClick={() => setIsOpened(false)}
              />
            </Link>
            <Link
              to="/reservations"
            >
              <Options
                contenido={"Reservas"}
                onClick={() => setIsOpened(false)}
              />
            </Link>
          </>
        );
      case "/favorites":
        return (
          <Link
            to="/reservations"
          >
            <Options
              contenido={"Reservas"}
              onClick={() => setIsOpened(false)}
            />
          </Link>
        );
      case "/reservations":
        return (
          <Link
            to="/favorites"
          >
            <Options
              contenido={"Favoritos"}
              onClick={() => setIsOpened(false)}
            />
          </Link>
        );
    }
  };
  return (
    <>
      <div className={styles.menuHamburguesa} onClick={() => setIsOpened(true)}>
        <i className="bx bx-menu"></i>
      </div>
      <div
        className={isOpened ? styles.opacity : null}
        onClick={() => setIsOpened(false)}
      ></div>
      <div className={styles.menuDrawer}>
        <div className={isOpened ? styles.isOpened : null}>
          <div className={styles.header}>
            <span
              className={styles.cerrarSideNav}
              onClick={() => setIsOpened(false)}
            >
              X
            </span>
            {isLogged ? (
              <Profile />
            ) : (
              <span className={styles.menuWord}>MENÚ</span>
            )}
          </div>
          <div className={styles.main}>
            {!isLogged ? (
              <div className={styles.opciones}>
                <RenderComponent />
              </div>
            ) : (
              <div className={styles.containerLoggeado}>
                <div className={styles.opciones}>
                  {rol === "ROLE_ADMIN" ?
                  <Link
                    to="/management"
                  >
                    <Options
                      contenido={"Administración"}
                      onClick={() => setIsOpened(false)}
                    />
                  </Link>
                  : <RenderUserComponent/> 
                  }
                </div>
                <div>
                  <p className={styles.cerrarSesion}>
                    ¿Deseas
                    <span onClick={cerrarSesion}> cerrar sesión</span>?
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className={styles.footer}>
            <a
              className={styles.linkRedSocial}
              href="https://www.facebook.com/HostingBook-104939168676273"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bx bxl-facebook-circle"></i>
            </a>
            <a
              className={styles.linkRedSocial}
              href="https://www.linkedin.com/in/hostingbook/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
            <a
              className={styles.linkRedSocial}
              href="https://twitter.com/Hosting_Book"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bx bxl-twitter"></i>
            </a>
            <a
              className={styles.linkRedSocial}
              href="https://www.instagram.com/hostingbook/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bx bxl-instagram-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
