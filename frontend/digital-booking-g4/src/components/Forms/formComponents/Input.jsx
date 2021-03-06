import React, { useState } from "react";
import {
  ContenedorInput,
  GrupoInput,
  Input,
  Label,
  LeyendaError,
  IconoOjoClave,
} from "../formElements";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./input.module.css"

export default function InputComponent({
  estado,
  cambiarEstado,
  tipo,
  label,
  name,
  expresionRegular,
  leyendaError,
  funcion,
  tieneIcono,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onChange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value.trim() });
  };

  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: "true" });
      } else {
        cambiarEstado({ ...estado, valido: "false" });
      }
    }

    if (funcion) {
      funcion();
    }
  };

  return (
    <ContenedorInput>
      <Label valido={estado.valido}>
        {label}
        <GrupoInput>
          <div className={styles.sombraConAutocompletado}>
          <Input
            type={tipo !== "password" ? tipo : !isVisible ? "password" : "text"}
            name={name}
            value={estado.campo}
            onChange={onChange}
            onKeyUp={validacion}
            onBlur={validacion}
            valido={estado.valido}
          />
          </div>
          {!tieneIcono ? null : isVisible ? (
            <IconoOjoClave icon={faEye} onClick={toggleVisibility} />
          ) : (
            <IconoOjoClave icon={faEyeSlash} onClick={toggleVisibility} />
          )}
        </GrupoInput>
      </Label>
      <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
    </ContenedorInput>
  );
}
