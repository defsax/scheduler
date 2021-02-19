import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";

import "components/Application.scss";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({...state, appointments});
    })
    .catch((err) => console.log(err));

  };  

  function deleteInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null 
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log(appointment, appointments);
    
    console.log('delete interview');
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments});
    })
    .catch((err) => console.log(err));

  };

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const GET_DAYS = axios.get("/api/days");
    const GET_APPOINTMENTS = axios.get("/api/appointments");
    const GET_INTERVIEWERS = axios.get("/api/interviewers");

    Promise.all([
      GET_DAYS,
      GET_APPOINTMENTS,
      GET_INTERVIEWERS,
    ]).then((all) => {
      setState((prev) => ({ 
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
  }, []);

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
