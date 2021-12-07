import { React, useState, useEffect, useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import HeaderSecundario from "../HeaderSecundario/HeaderSecundario";
import TituloBloque from "../TituloBloque/TituloBloque";
import NumberInput from "./NumberInput/NumberInput";
import EstandarInput from "./EstandarInput/EstandarInput";
import TextAreaInput from "./TextAreaInput/TextAreaInput";
import SelectInput from "./SelectInput/SelectInput";
import CityInput from "../Searcher/CityInput/CityInput";
import styles from "./Administracion.module.css";
import caracteristicas from "../../resources/caracteristicas.json";
import stylesInputsFromOtherside from "../Producto/ProductoReserva/ProductoFormDatos/InputsFromOtherside.module.css";
import RowImagenes from "./RowImagenes/RowImagenes";
import FilledButton from "../Buttons/FilledButton";

export default function Administracion() {
  const [propertyName, setPropertyName] = useState("");
  const [onChangeCategory, setOnChangeCategory] = useState("");
  const [address, setAddress] = useState("");
  const [hora, setHora] = useState(null);
  const [onChangeCity, setOnChangeCity] = useState("");
  const [country, setCountry] = useState("");
  const autocompletadoInputCountry = true;
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [normasDeLaCasa, setNormasDeLaCasa] = useState("");
  const [saludSeguridad, setSaludSeguridad] = useState("");
  const [cancelacion, setCancelacion] = useState("");
  const [descripcionImagen, setDescripcionImagen] = useState("");

  const data = useFetch("categorias");

  /* CheckIn (horario min)*/

  let horasDisponibles = [];

  for (let i = 0; i <= 23; i++) {
    horasDisponibles.push(i);
  }

  const handleChangeCheckIn = (e) => setHora(e.target.value);

  /* Categoria*/

  const [categoryItems, setCategoryItems] = useState([]);
  let categoriasDisponibles = [];
  useEffect(() => {
    if (data.isLoaded) {
      setCategoryItems(data.items);
    }
  }, [data.isLoaded, data.items]);

  categoryItems.forEach((item) => {
    categoriasDisponibles.push(item.titulo);
  });

  const handleChangeCategory = (e) => setOnChangeCategory(e.target.value);

  /*Imagenes */
  const [imagenesDetails, setImagenesDetails] = useState([
    {
      index: Math.random(),
      url: "",
      descripcion: "",
    },
  ]);

  const [imagenes, setImagenes] = useState([]);

  const agregarImagen = (imagen) => setImagenes([...imagenes, imagen]);

  const handleAdd = (e) => {
    setImagenesDetails([
      ...imagenesDetails,
      {
        index: Math.random(),
        url: "",
        descripcion: "",
      },
    ]);
  };

  const handleDelete = (val) => {
    setImagenesDetails([...imagenesDetails.filter((r) => r !== val)]);
  };

  console.log("IMAGENES EN ADMINISTRACION");
  console.log(imagenes)

  return (
    <>
      <HeaderSecundario>Administración</HeaderSecundario>
      <section className={styles.containerPrincipal}>
        <TituloBloque>Crear propiedad</TituloBloque>
        <p className={styles.camposObligatorios}>
          (Los campos identificados con * son obligatorios)
        </p>
        <form className={styles.formAdmin}>
          <div className={styles.subContainer}>
            <div className={styles.lineContainerInformacion}>
              <EstandarInput
                onChangeItem={propertyName}
                setOnChangeItem={setPropertyName}
                label="* Nombre de la propiedad"
                name="nombre"
              />

              <SelectInput
                label="* Categoría"
                name="tituloCategoria"
                handleChange={handleChangeCategory}
                opcionesDisponibles={categoriasDisponibles}
                showOptions={false}
              />
            </div>
            <div className={styles.lineContainerInformacion}>
              <EstandarInput
                onChangeItem={address}
                setOnChangeItem={setAddress}
                label="* Dirección"
                name="direccion"
              />

              <SelectInput
                label="* CheckIn (horario min)"
                name="horarioCheckIn"
                handleChange={handleChangeCheckIn}
                opcionesDisponibles={horasDisponibles}
                showOptions={true}
              />
            </div>
            <div className={styles.lineContainerInformacion}>
              <div className={styles.containerCityInput}>
                <label>* Ciudad</label>
                <CityInput
                  setOnChangeCity={setOnChangeCity}
                  onChangeCity={onChangeCity}
                  specificStyle1={stylesInputsFromOtherside.ocultar}
                  specificStyle2={stylesInputsFromOtherside.inputFormDatos}
                  specificStyle3={stylesInputsFromOtherside.divDrawer}
                  setCountry={setCountry}
                  autocompletadoInputCountry={autocompletadoInputCountry}
                />
              </div>

              <EstandarInput
                onChangeItem={country}
                setOnChangeItem={setCountry}
                label="* País"
                name="pais"
              />
            </div>
            <div className={styles.lineContainerInformacion}>
              <NumberInput
                onChangeItem={latitud}
                setOnChangeItem={setLatitud}
                label="Latitud"
                name="latitud"
              />
              <NumberInput
                onChangeItem={longitud}
                setOnChangeItem={setLongitud}
                label="Longitud"
                name="longitud"
              />
            </div>
            <div className={`${styles.lineContainerInformacion}`}>
              <TextAreaInput
                onChangeItem={descripcion}
                setOnChangeItem={setDescripcion}
                label="Descripción"
                name="descripcion"
              />
            </div>
          </div>
          <div className={styles.subContainer}>
            <TituloBloque>Agregar atributos</TituloBloque>
            <ul className={styles.checkboxes}>
              {caracteristicas.map((caracteristica) => (
                <li key={caracteristica.id}>
                  <input
                    type="checkbox"
                    name="caracteristicas"
                    id={caracteristica.id}
                    value={caracteristica.nombre}
                  />
                  <label htmlFor={caracteristica.id}>
                    <i className={caracteristica.icono}></i>
                    <span>{caracteristica.nombre}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.subContainer}>
            <TituloBloque>Políticas del producto</TituloBloque>
            <div className={styles.bloquePoliticas}>
              <div className={styles.columnPolitica}>
                <h3 className={styles.tipoPolitica}>Normas de la casa</h3>
                <TextAreaInput
                  onChangeItem={normasDeLaCasa}
                  setOnChangeItem={setNormasDeLaCasa}
                  label="Descripción"
                  name="normasDeLaCasa"
                  placeholder="Escribir aquí"
                />
              </div>
              <div className={styles.columnPolitica}>
                <h3 className={styles.tipoPolitica}>Salud y seguridad</h3>
                <TextAreaInput
                  onChangeItem={saludSeguridad}
                  setOnChangeItem={setSaludSeguridad}
                  label="Descripción"
                  name="saludSeguridad"
                  placeholder="Escribir aquí"
                />
              </div>
              <div className={styles.columnPolitica}>
                <h3 className={styles.tipoPolitica}>Política de cancelación</h3>
                <TextAreaInput
                  onChangeItem={cancelacion}
                  setOnChangeItem={setCancelacion}
                  label="Descripción"
                  name="cancelacion"
                  placeholder="Escribir aquí"
                />
              </div>
            </div>
          </div>
          <div className={styles.subContainer}>
            <TituloBloque>Cargar imágenes</TituloBloque>
            <RowImagenes
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              imagenesDetails={imagenesDetails}
              agregarImagen={agregarImagen}
            />
          </div>
          <div className={styles.subContainer}>
            <FilledButton styles={styles.buttonSubmit}>Crear</FilledButton>
          </div>
        </form>
      </section>
    </>
  );
}
