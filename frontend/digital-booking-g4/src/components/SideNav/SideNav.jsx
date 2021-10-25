import React, {useEffect, useState} from "react";
import Profile from "../Profile/Profile";
import styles from "./SideNav.module.css";

export default function SideNav() {
    const [estaLogueado, setEstaLogueado] = useState(true);
    const [isOpened, setIsOpened] = useState(false);

    return (
      <section>
        <div
          className={styles.menuHamburguesa}
          onClick={() => setIsOpened(true)}
        >
          <i className="bx bx-menu"></i>
        </div>
        <div className={styles.menuDrawer}>
          <div className={isOpened ? styles.isOpened : null}>
            <div className={styles.header}>
              <p
                className={styles.cerrarSideNav}
                onClick={() => setIsOpened(false)}
              >
                X
              </p>
              {estaLogueado ? <Profile /> : <span>MENÚ</span>}
            </div>
            <div className={styles.main}>
              <p>Iniciar sesión</p>
              {estaLogueado ? (
                <p>
                  {" "}
                  ¿Deseas<span> cerrar sesión</span>?
                </p>
              ) : null}
            </div>
            <div className={styles.footer}>
              <i className="bx bxl-facebook-circle"></i>
              <i className="bx bxl-linkedin"></i>
              <i className="bx bxl-twitter"></i>
              <i className="bx bxl-instagram-alt"></i>
            </div>
          </div>
        </div>
      </section>
    );
}