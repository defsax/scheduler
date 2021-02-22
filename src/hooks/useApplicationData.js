import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const updateSpots = function(currentDay, allDays, operation) {
    let value = 0;
    if (operation === 'add') {
      value = -1;
    } else if (operation === 'sub') {
      value = 1;
    } else {
      console.log('Incorrect.');
      return;
    }

    
    //get day ID
    //minus 1 because ids are not zero based
    let dayID = allDays.filter(day => {
      return day.name === currentDay;
    })[0].id - 1;

    //modify number of spots
    let spots = (state.days[dayID].spots += value);

    //reconstruct object
    const updatedDay = {
      ...state.days[dayID],
      spots: spots
    };

    const daysObj = {
      ...state.days,
      [dayID]: updatedDay
    };

    //push reconstructed objects into an array to match data
    let days = [];
    for (let i of Object.values(daysObj)) {
      days.push(i);
    }

    setState({
      ...state,
      days
    });
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
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      updateSpots(state.day, state.days, 'add');
      setState({...state, appointments});
      console.log('state.days.spots:', state.days.spots);
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

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      updateSpots(state.day, state.days, 'sub');
      setState({...state, appointments});
      console.log('state.days.spots:', state.days.spots);
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