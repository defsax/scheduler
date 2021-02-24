import React, { useEffect } from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import { useVisualMode } from "hooks/useVisualMode"; 

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        console.error(`An error occured while attempting to save: ${err}`);
        transition(ERROR_SAVE, true);
      });
  }

  function cancelInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        console.error(`An error occured while attempting to delete: ${err}`);
        transition(ERROR_DELETE, true)
      });
  }

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return (
    <article 
      className="appointment"
      data-testid="appointment"
    >
      <Header time={props.time}/>
      
      {mode === ERROR_SAVE && 
        <Error
          message="ERROR: Could not save appointment."
          onClose={() => back()}
        />
      }

      {mode === ERROR_DELETE && 
        <Error
          message="ERROR: Could not delete appointment."
          onClose={() => back()}
        />
      }

      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      }

      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === EDIT && 
        <Form 
          name={props.interview.student} 
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      }

      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()}
          onSave={save}
        />
      }
      
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you want to delete this?" 
          onConfirm={cancelInterview} 
          onCancel={() => transition(SHOW)}
        />
      )}

      {mode === SAVING && (<Status message="Saving..."/>)}
      {mode === DELETING && (<Status message="Deleting..."/>)}
    </article>
  );
}