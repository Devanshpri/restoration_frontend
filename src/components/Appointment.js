import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import Datetime from "react-datetime";

import LoadingOverlay from "react-loading-overlay";

import "react-datetime/css/react-datetime.css";

import useCreateAppointment from "../hooks/useCreateAppointment";

const Appointment = () => {
  const [notesValue, setNotesValue] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [
    isSavingAppointment,
    responseSavingAppointment,
    errorSavingAppointment,
    createAppointment,
  ] = useCreateAppointment();

  const onTimeChange = (date) => {
    setSelectedDate(date.formate);
  };

  const onNotesValueChanged = (e) => {
    setNotesValue(e.target.value);
  };

  useEffect(() => {
    if (!isSavingAppointment && responseSavingAppointment) {
      setNotesValue("");
      alert("Appointment Registered");
    }
  }, [responseSavingAppointment, isSavingAppointment]);

  const onAppointmentSubmit = () => {
    if (!selectedDate || !notesValue) {
      alert("Please enter all the required value");
      return;
    }

    const payload = {
      userId: localStorage.getItem("currUserId"),
      coachId: localStorage.getItem("id"),
      appointmentTitle: notesValue,
      appointmentDate: selectedDate,
    };

    createAppointment(payload);
  };

  return (
    <LoadingOverlay active={isSavingAppointment} spinner text="Loading...">
      <div className="appointmentContainer">
        <div className="titleHolder">
          <Form>
            <Form.Row>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Appointment Reason"
                onChange={onNotesValueChanged}
                value={notesValue}
              />
            </Form.Row>
          </Form>
        </div>
        <div className="timeHolder">
          <p>Select Time of Appointment</p>
          <Datetime onClose={onTimeChange} />
        </div>
      </div>
      <div className="prescriptionContainer">
        <Button
          variant="success"
          onClick={onAppointmentSubmit}
          className="mr-2"
        >
          Submit
        </Button>
      </div>
    </LoadingOverlay>
  );
};

export default Appointment;
