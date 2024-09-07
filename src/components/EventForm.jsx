// components/EventForm.js
import React from "react";
import { useFormState } from "../hooks";

const EventForm = ({ onSubmit }) => {
  const [formState, handleChange] = useFormState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    teacher: "",
    center: "",
    typeYoga: "",
    modality: "",
    description: "",
    allDay: false,
    resource: {
      userId: "",
      username: "",
    },
  });

  const handleResourceChange = (e) => {
    setState({
      ...formState,
      resource: { ...formState.resource, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState); // Pass the form state to the onSubmit function
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="datetime-local"
          name="startDate"
          value={formState.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="datetime-local"
          name="endDate"
          value={formState.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>All Day:</label>
        <input
          type="checkbox"
          name="allDay"
          checked={formState.allDay}
          onChange={(e) =>
            handleChange({
              target: { name: "allDay", value: e.target.checked },
            })
          }
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={formState.resource.userId}
          onChange={handleResourceChange}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formState.resource.username}
          onChange={handleResourceChange}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formState.resource.location}
          onChange={handleResourceChange}
          required
        />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
