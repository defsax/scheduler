import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const updateSpots = function(state, appointments, id) {
 
    let spotsAvailable = 0;
    // console.log('appointments:', appointments,'state:', state,'id:', id);

    //get day ID
    let dayID = state.days.filter(day => {
      return day.name === state.day;
    })[0].id;

    //we have appointment id. go through state.days.appointments to see if theres a match.
    //if there is, return state.days.id, which will be current day id
    
    //we have day id, so we can get that day's appointments
    //minus 1 because day ids are not zero based
    let appointmentsForDay = state.days[dayID - 1].appointments;

    //loop day's appointments
    for (let appointment of appointmentsForDay) {
      //if all appointments at appointment (id)'s interview is null, increment spots
      if (appointments[appointment].interview === null) {
        spotsAvailable++;
      }
    }

    //reconstruct days object with updated spots
    const days = state.days.map((day) => {
			if (day.id === dayID) {
        return { ...day, spots: spotsAvailable}
      }
				return day;
		});

    return days;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    let days = updateSpots(state, appointments, id);
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({...state, appointments, days});
    })
  };  

  function deleteInterview(id) {

    //reenter all appointment information except interview which is null
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };

    //reenter all appointments except appointment at id which has null interview
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let days = updateSpots(state, appointments, id);
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments, days});
    })

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


  return { state, setDay, bookInterview, deleteInterview };
};