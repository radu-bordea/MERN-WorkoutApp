import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // Access workouts and dispatch function from context
  const { workouts, dispatch } = useWorkoutsContext();

  // State to toggle the workout form visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to open/close the workout form
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // Fetch workouts from the API when the component mounts
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      // If the fetch is successful, update the context state
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]); // Only run once on mount

  return (
    <div className={isOpen ? "home" : "home-click"}>
      {/* Show the workout form if isOpen is true */}
      {isOpen && <WorkoutForm isOpen={isOpen} setIsOpen={setIsOpen} />}

      <div className="workouts">
        {/* Button to toggle the form open/close */}
        <button className="formBtn" onClick={handleIsOpen}>
          {!isOpen ? "open form" : "close form"}
        </button>
        {/* Render each workout using the WorkoutDetails component */}
        <div className="scrollable-container">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
