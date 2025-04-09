import { createContext, useReducer } from "react";

// Create a context to hold workout data and dispatch function
export const WorkoutsContext = createContext();

// Reducer function to handle workout-related actions
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    // Set workouts when data is fetched
    case "SET_WORKOUTS":
      return { workouts: action.payload };

    // Add a new workout to the top of the list
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };

    // Delete a workout from the list by filtering out the one that matches the ID
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };

    // Default case if no action matches
    default:
      return state;
  }
};

// Context provider component that wraps around children components to provide the state
export const WorkoutsContextProvider = ({ children }) => {
  // useReducer hook to manage workout state and dispatch actions
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null, // initial state is null for workouts
  });

  return (
    // Provide state and dispatch to children components
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
