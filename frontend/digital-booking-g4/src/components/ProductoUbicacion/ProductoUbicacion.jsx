import Estrellas from "../Estrellas/Estrellas";
import styles from "./ProductoUbicacion.module.css";

export default function ProductoUbicacion({ alojamiento }) {
  return (
    <section className={styles.ubicacionContainer}>
      <div className={styles.direccionContainer}>
        <div className={styles.ubicacion}>
          <i className="fas fa-map-marker-alt"></i>
          <p>{`${alojamiento.ciudad.nombre}, ${alojamiento.ciudad.pais}`}</p>
        </div>
        <p className={styles.distancia}>
          {distanciaCentro(alojamiento.ciudad.nombre)}
        </p>
      </div>
      <div className={styles.detalle}>
        <div className={styles.detalleYEstrellas}>
          <div className={styles.detalleCalificacion}>Muy bueno</div>
          <Estrellas puntaje={8} />
        </div>
        <div className={styles.puntajeNumerico}>{8}</div>
      </div>
    </section>
  );
}

function distanciaCentro(ubicacion) {
  // TODO: calcular la distancia
  return "A 940m del centro";
}
