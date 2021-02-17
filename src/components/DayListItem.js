import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  console.log(props);

  const dayClass = classNames(
    "day-list__item",
    {"day-list__item--selected": props.selected}, 
    {"day-list__item--full": props.spots === 0});

  const formatSpots = function() {
    console.log("props spots:",props.spots);
    if (props.spots < 1)
      return "no spots remaining";
    if (props.spots < 2) 
      return "1 spot remaining";

    return props.spots + " spots remaining";
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
      <h3>{formatSpots()}</h3>
    </li>
  );
}