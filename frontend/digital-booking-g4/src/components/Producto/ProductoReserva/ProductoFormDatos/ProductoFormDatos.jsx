import { useEffect, useState, useContext } from "react";
import TituloBloque from "../../../TituloBloque/TituloBloque";
import InputComponent from "../../../Forms/formComponents/Input";
import CityInput from "../../../Searcher/CityInput/CityInput";
import stylesInputsFromOtherside from "./InputsFromOtherside.module.css";
import loggedContext from "../../../../contexts/loggedContext";
import styles from "./ProductoFormDatos.module.css";

export default function ProductoFormDatos({ setNombre, setApellido, setMail, setCiudad, setTextArea, setIsVacunadx }) {
  const { isLogged, userInformation } = useContext(loggedContext);
  const loadedName = isLogged ? userInformation.nombre : "";
  const loadedLastname = isLogged ? userInformation.apellido : "";
  const loadedEmail = isLogged ? userInformation.email : "";
  const [name, setName] = useState({ campo: loadedName, valido: null });
  const [surname, setSurname] = useState({ campo: loadedLastname, valido: null });
  const [email, setEmail] = useState({ campo: loadedEmail, valido: null });
  const [onChangeCity, setOnChangeCity] = useState("");
  const [commentText, setCommentText] = useState("");
  const [covid, setCovid] = useState(null);

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{2,25}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{2,25}$/,
    correo: /[A-z0-9]+@[A-z]+.[A-z]{3}/,
  };

  useEffect(() => {
    setNombre(name.campo);
    setApellido(surname.campo);
    setMail(email.campo);
    setCiudad(onChangeCity);
    setTextArea(commentText)
    setIsVacunadx(covid)
  }, [name, surname, email, onChangeCity,commentText, covid]);


  return (
    <>
      <TituloBloque>Completá tus datos</TituloBloque>
      <div className={styles.formDatos}>
        <div className={styles.lineContainer}>
          <InputComponent
            estado={name}
            cambiarEstado={setName}
            tipo="text"
            label="Nombre"
            name="nombre"
            expresionRegular={expresiones.nombre}
            leyendaError="El nombre sólo debe contener letras. Entre 2 y 25 caracteres."
          />
          <InputComponent
            estado={surname}
            cambiarEstado={setSurname}
            tipo="text"
            label="Apellido"
            name="apellido"
            expresionRegular={expresiones.apellido}
            leyendaError="El apellido sólo debe contener letras. Entre 2 y 25 caracteres."
          />
        </div>
        <div className={styles.lineContainer}>
          <InputComponent
            estado={email}
            cambiarEstado={setEmail}
            tipo="email"
            label="Correo electrónico"
            name="correo"
            expresionRegular={expresiones.correo}
            leyendaError="Formato de correo inválido."
          />
          <div className={styles.containerInput}>
            <label>Ciudad</label>
            <CityInput
              setOnChangeCity={setOnChangeCity}
              onChangeCity={onChangeCity}
              specificStyle1={stylesInputsFromOtherside.ocultar}
              specificStyle2={stylesInputsFromOtherside.inputFormDatos}
              specificStyle3={stylesInputsFromOtherside.divDrawer}
            />
          </div>
        </div>
        <div className={`${styles.containerInput} ${styles.lineContainer}`}>
          <label>Mensaje para el dueño</label>
          <textarea
            name="comentario"
            id="comentario"
            cols="30"
            rows="6"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.radioButtons}>
          <h4>¿Te aplicaste ambas dosis de la vacuna contra COVID-19?</h4>
          <div>
            <input
              type="radio"
              name="covid"
              id="true"
              value={true}
              onClick={() => setCovid(true)}
              required
            />
            <label htmlFor="true">
              SI
            </label>
            <input
              type="radio"
              name="covid"
              id="false"
              value={false}
              onClick={() => setCovid(false)}
              required
            />
            <label htmlFor="false">
              NO
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
