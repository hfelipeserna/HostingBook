import styles from "./TarjetaReservaExitosa.module.css";
import { useHistory } from "react-router-dom";
import FilledButton from "../Buttons/FilledButton";

export default function TarjetaReservaExitosa() {
  const history = useHistory();

  return (
    // TODO: cambiar esto por un modal cuando este mergeado el template de reserva
    <div className={styles.mainSuccess}>
      <div className={styles.card}>
        <i className={`bx bxs-badge-check ${styles.icono}`}></i>
        <h2 className={styles.title}>¡Muchas gracias!</h2>
        <p>Su reserva ha sido realizada con éxito</p>
        <FilledButton onClick={() => history.push(`/`)} styles={styles.btnOK}>
          OK
        </FilledButton>
      </div>
    </div>
  );
}
