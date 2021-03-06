function obtenerFechasReservadasAnteriores(startDate, fechasReservadas) {
  const fechasNoSeleccionablesAnteriores = [];
  const excludeDates = fechasReservadas;
  const beforeBookingDates = excludeDates.filter(
    (element) => new Date(element) < new Date(startDate)
  );
  const maxDate = new Date(Math.max.apply(null, beforeBookingDates));

  const auxMaxDate = new Date(maxDate);
  const beforeExcludeDates = auxMaxDate.setDate(auxMaxDate.getDate() - 62);

  if (!isNaN(maxDate) && !isNaN(beforeExcludeDates)) {
    for (
      let d = new Date(beforeExcludeDates);
      d <= new Date(maxDate);
      d.setDate(d.getDate() + 1)
    ) {
      fechasNoSeleccionablesAnteriores.push(new Date(d));
    }
  }
  return fechasNoSeleccionablesAnteriores;
}

function obtenerFechasReservadasPosteriores(startDate, fechasReservadas) {
  const fechasNoSeleccionablesPosteriores = [];
  const excludeDates = fechasReservadas;
  const excludeDateOrdenado = excludeDates.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const nextExcludeDate = excludeDateOrdenado.find(
    (element) => element > startDate
  );
  const auxExcludeDate = new Date(nextExcludeDate);
  const endExcludeDate = auxExcludeDate.setDate(auxExcludeDate.getDate() + 62);
  for (let d = new Date(nextExcludeDate); d <= new Date(endExcludeDate); d.setDate(d.getDate() + 1)) {
    fechasNoSeleccionablesPosteriores.push(new Date(d));
  }

  return fechasNoSeleccionablesPosteriores;
}

export default function obtenerFechasNoSeleccionables(
  startDate,
  fechasReservadas
) {
  const fechasNoSeleccionablesPosteriores = obtenerFechasReservadasPosteriores(
    startDate,
    fechasReservadas
  );
  const fechasNoSeleccionablesAnteriores = obtenerFechasReservadasAnteriores(
    startDate,
    fechasReservadas
  );
  const fechasNoSeleccionables = fechasNoSeleccionablesAnteriores.concat(
    fechasNoSeleccionablesPosteriores
  );

  return fechasNoSeleccionables;
}
