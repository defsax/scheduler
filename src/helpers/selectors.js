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
    
    filteredAppointments.forEach((id) => {
      appointmentsForDay.push(state.appointments[id])
    });
  }
  return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {

  let interviewersForDay = [];
  console.log('\n', 'state', state, '\n\nday',day);

  const filteredDays = state.days.filter((currentDay) => {
    return currentDay.name === day;
  });
  
  if (!filteredDays.length)
    return filteredDays;
  else {
    const filteredInterviewers = filteredDays[0].interviewers.filter((id) => {
      return id === state.interviewers[id].id;
    });
    
    filteredInterviewers.forEach((id) => {
      interviewersForDay.push(state.interviewers[id])
    });
  }
  return interviewersForDay;
}

export function getInterview(state, interview) {
  if (interview === null)
    return null;

  return {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  }
}