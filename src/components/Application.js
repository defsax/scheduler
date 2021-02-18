import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";

import "components/Application.scss";
import Appointment from "components/Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }, 
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Florence Antal",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Marianna Romà",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


export default function Application(props) {

  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get("/api/days").then((response) => {
      setDays(response.data);
    });
  }, []);

  const [currentDay, setDay] = useState("Monday");
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
              days={days}
              day={currentDay}
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
        {appointments.map(appointment => (
          <Appointment 
            key={appointment.id}
            {...appointment}
          />
        ))} 
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
