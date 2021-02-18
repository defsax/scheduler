export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];

  const filteredDays = state.days.filter((currentDay) => {
    return currentDay.name === day
  });
  
  if (!filteredDays.length)
    return filteredDays;
  else {
    const filteredAppointments = filteredDays[0].appointments.filter((id) => {
      return id === state.appointments[id].id;
    });
    
    filteredAppointments.forEach((appointment) => {
      appointmentsForDay.push(state.appointments[appointment])
    });
  }
  return appointmentsForDay;
}
