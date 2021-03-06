import useFetch from "../../../hooks/useFetch";
import styles from "./TarjetaCategoria.module.css";

export default function TarjetaCategoria({
  fotoPortada,
  indice,
  estaActiva,
  nombre,
  descripcion,
  onToggleSelect,
}) {
  const { isLoaded, items } = useFetch(`productos/categoria?titulo=${nombre}`);
  return (
    <div
      className={estaActiva ? styles.tarjetaSeleccionada : styles.tarjeta}
      onClick={() => onToggleSelect(indice, nombre)}
    >
      <div
        className={styles.fotoPortada}
        style={{
          backgroundImage: `url(${fotoPortada})`,
        }}
      ></div>
      <div className={styles.contenidoTarjeta}>
        <h2 className={styles.nombreCategoria}>{nombre}</h2>
        <p className={styles.descripcion}>
          {isLoaded ? `${items.length} ${nombre}` : ""}
        </p>
      </div>
    </div>
  );
}
