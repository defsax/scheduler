import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Create from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import { useVisualMode } from "hooks/useVisualMode"; 

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";


export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      console.log('PUT COMPLETE');
      transition(SHOW, true);
    });
  } 

  function cancelInterview() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      console.log('DELETE COMPLETE');
      transition(EMPTY, true);
    });
  }

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return (
    <article className="appointment">
      <Header time={props.time}/>
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show student=
          {props.interview.student} 
          interviewer={props.interview.interviewer}
          onDelete={cancelInterview}
        />
      )}

      {mode === CREATE && 
        <Create 
          interviewers={props.interviewers} 
          onCancel={() => back()}
          onSave={save}
        />
      }
      
      {mode === SAVING && (<Status message="Saving..."/>)}
      {mode === DELETING && (<Status message="Deleting..."/>)}

    </article>
  );
}