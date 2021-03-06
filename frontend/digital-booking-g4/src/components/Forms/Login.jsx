import { useState, useContext, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import FilledButton from "../Buttons/FilledButton";
import InputComponent from "./formComponents/Input";
import Loader from "../Loader/Loader";
import loggedContext from "../../contexts/loggedContext";
import styles from "./Form.module.css";
import post from "../../utils/post";

export default function Login() {
  const [showLoader, setShowLoader] = useState(false);
  const [email, setEmail] = useState({ campo: "", valido: null });
  const [password, setPassword] = useState({ campo: "", valido: null });
  const [error, setError] = useState({ mensaje: "", isError: false });
  const { setIsLogged, setUserInformation } = useContext(loggedContext);
  const { id } = useParams();
  const history = useHistory();
  const paginaAnteriorEsReserva = history.location.pathname.match(
    /\/login-redirect-booking\/(\d+)/
  );

  useEffect(() => {}, [error]);

  function handleSubmit(e) {
    e.preventDefault();
    iniciarSesion();
  }

  function iniciarSesion() {
    setShowLoader(true);
    post("login", {
      mail: email.campo,
      contrasenia: password.campo,
    })
      .then((response) => {
        const error = {
          mensaje:
            "Sus credenciales son inválidas. Por favor, vuelva a intentarlo.",
          isError: true,
        };
        if (response.status !== 200) throw error;
        setShowLoader(false);
        return response.json();
      })
      .then((data) => {
        if (data.cuentaValidada) {
          setIsLogged(true);
          guardarDatos(data);
          if (id !== undefined && paginaAnteriorEsReserva) {
            history.push(`/product/${id}/booking`);
          } else {
            history.push("/");
          }
        } else {
          const error = {
            mensaje:
              "Recordá revisar tu mail y confirmar la cuenta para poder iniciar sesión",
            isError: true,
          };
          throw error;
        }
      })
      .catch((error) => {
        setShowLoader(false);
        setError(error);
      });
  }

  function guardarDatos(data) {
    localStorage.setItem("jwt", JSON.stringify(data.jwt));
    localStorage.setItem("id", JSON.stringify(data.id));
    localStorage.setItem("email", JSON.stringify(email.campo));
    localStorage.setItem("nombre", JSON.stringify(data.nombre));
    localStorage.setItem("apellido", JSON.stringify(data.apellido));
    localStorage.setItem("rol", JSON.stringify(data.rol));
    setUserInformation({ nombre: data.nombre, apellido: data.apellido });
  }

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className={styles.mainForm}>
          <div className={styles.contenedorForm}>
            {paginaAnteriorEsReserva ? (
              <div className={styles.iniciarReservaSinLoguearse}>
                <span>
                  <i className="fas fa-exclamation-circle"></i>
                </span>
                <span>Para realizar una reserva necesitas estar logueado</span>
              </div>
            ) : null}
            <h2>Iniciar sesión</h2>
            <form
              className={`${styles.formLogin} ${styles.generalForms}`}
              onSubmit={handleSubmit}
              noValidate="novalidate"
            >
              <InputComponent
                estado={email}
                cambiarEstado={setEmail}
                tipo="email"
                label="Correo electrónico"
                name="correo"
              />
              <InputComponent
                estado={password}
                cambiarEstado={setPassword}
                tipo="password"
                label="Contraseña"
                name="contrasenia"
                tieneIcono={true}
              />

              {error.isError ? (
                <div className={styles.credencialesContainer}>
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <p className={styles.credencialesInvalidas}>
                    {error.mensaje}
                  </p>
                </div>
              ) : null}

              <FilledButton onClick={handleSubmit} testId="loginBtn">
                Iniciar sesión
              </FilledButton>
              <p>
                ¿Aún no tienes cuenta? <Link to="/register">Registrate</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
