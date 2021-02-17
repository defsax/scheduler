import React from "react";

import DayListItem from "components/DayListItem"

export default function DayList(props) {

  console.log(props.days);

  const parsedDays = props.days.map(day => (
    <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
    )
  )

  return (
    <ul>{parsedDays}</ul>
  )
}
