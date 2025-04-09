import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = ({ isOpen, setIsOpen }) => {
  // Get dispatch from context to update global state
  const { dispatch } = useWorkoutsContext();

  // Local state for form inputs and error handling
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create workout object with form data
    const workout = { title, load, reps };

    // Send POST request to create a new workout
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the response JSON
    const json = await response.json();

    // Handle errors: if response is not OK, show errors
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields); // Highlight empty fields
    }

    // On success, clear form and update global state with new workout
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }

    // Close the form after submission
    setIsOpen(!isOpen);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      {/* Exercise Title input */}
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      {/* Load (in kg) input */}
      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      {/* Reps input */}
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      {/* Submit button */}
      <button>Add Workout</button>

      {/* Show error message if there is one */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
