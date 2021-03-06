import React, { useState, useEffect, useRef, useContext } from "react";
import FilledButton from "../Buttons/FilledButton";
import DatePicker, { registerLocale } from "react-datepicker";
import CityInput from "./CityInput/CityInput";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Searcher.module.css";
import currentCityContext from "../../contexts/currentFilterContext";
import useScreenWidth from "../../hooks/useScreenWidth";

registerLocale("es", es);

export default function Searcher({ setReset, reset }) {
  const [iconDate, setIconDate] = useState(styles.dateIcon);
  const [dateRange, setDateRange] = useState([null, null]);
  const [onChangeCity, setOnChangeCity] = useState("");
  const { setCurrentCity, setCurrentDateRange } =
    useContext(currentCityContext);
  const [startDate, endDate] = dateRange;
  const anchoPantalla = useScreenWidth();
  let datePickerRef = useRef(null);

  const handleCloseCalendar = () => {
    datePickerRef.setOpen(false);
    localStorage.setItem("startDate", JSON.stringify(startDate));
    localStorage.setItem("endDate", JSON.stringify(endDate));
  };

  const styleChange = (input) => {
    if (!input.target.value === "") {
      setIconDate(styles.dateIconEmpty);
    } else {
      setIconDate(styles.dateIcon);
    }

    if (reset) {
      setReset(false);
      setOnChangeCity("");
    }
  };

  const styleChangeClick = (input) => {
    if (input !== false) {
      setIconDate(styles.dateIconEmpty);
    } else {
      setIconDate(styles.dateIcon);
    }
    if (reset) {
      setReset(false);
      setOnChangeCity("");
    }
  };

  const handleSubmit = () => {
    setCurrentCity(onChangeCity);
    setCurrentDateRange({ fechaInicio: startDate, fechaFin: endDate });
  };

  return (
    <div className={styles.globalContainer}>
      <div className={styles.boxing}>
        <h2 className={styles.letter}>
          Busca ofertas en hoteles, casas y mucho más
        </h2>
        <div className={styles.inputs}>
          <div className={styles.anchoFijo}>
            <CityInput
              setOnChangeCity={setOnChangeCity}
              onChangeCity={onChangeCity}
              setReset={setReset}
              reset={reset}
              setDateRange={setDateRange}
            />
          </div>
          <div className={styles.dateContainer}>
            <span className={iconDate}>
              <i className="far fa-calendar-alt"></i>
            </span>
          </div>
          <DatePicker
            onSelect={(e) => styleChangeClick(e)}
            onChangeRaw={(e) => styleChange(e)}
            dateFormat="dd 'de' MMM."
            placeholderText="Check in  -  Check out"
            locale={es}
            selectsRange={true}
            startDate={reset ? null : startDate}
            endDate={reset ? null : endDate}
            shouldCloseOnSelect={false}
            monthsShown={anchoPantalla <= 480 ? 1 : 2}
            minDate={new Date()}
            onChange={(update) => {
              setDateRange(update);
            }}
            ref={(r) => (datePickerRef = r)}
          >
            <div className={styles.applyContainer}>
              <FilledButton onClick={handleCloseCalendar}>Aplicar</FilledButton>
            </div>
          </DatePicker>
          <FilledButton onClick={handleSubmit}>Buscar</FilledButton>
        </div>
      </div>
    </div>
  );
}
