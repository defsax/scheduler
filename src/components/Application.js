import React from "react";
import DayList from "components/DayList";
// import axios from "axios";

import "components/Application.scss";
import Appointment from "components/Appointment"
import useApplicationData from "hooks/useApplicationData"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {

  const {
		state,
		setDay,
		bookInterview,
		deleteInterview,
	} = useApplicationData();

  let interviewersList = getInterviewersForDay(state, state.day);
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersList} 
        bookInterview={bookInterview}
        cancelInterview={deleteInterview}
      />
    )
  });


  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule} 
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
