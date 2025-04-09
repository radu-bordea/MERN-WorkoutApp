import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date-fns for formatting time
import formmatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  // Get dispatch from context to update global state
  const { dispatch } = useWorkoutsContext();

  // Function to handle deleting a workout
  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });

    const json = await response.json();

    // If deletion is successful, update context by dispatching action
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      {/* Display workout title */}
      <h4>{workout.title}</h4>

      {/* Display workout load */}
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>

      {/* Display number of reps */}
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>

      {/* Display time since workout was created */}
      <p>
        {formmatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
        })}
      </p>

      {/* Delete icon - triggers delete function on click */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
