import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames(
    "day-list__item",
    {"day-list__item--selected": props.selected}, 
    {"day-list__item--full": props.spots === 0});

  const formatSpots = function() {
    if (props.spots < 1)
      return "no spots remaining";
    if (props.spots < 2) 
      return "1 spot remaining";

    return props.spots + " spots remaining";
  };

  return (
    <li 
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2>{props.name}</h2> 
      <h3>{formatSpots()}</h3>
    </li>
  );
}