import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
};

function reducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

export default function Eg1() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <>
      <h2>Registration Form</h2>

      <input
        name="name"
        placeholder="Enter Name"
        value={state.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Enter Email"
        value={state.email}
        onChange={handleChange}
      />

      <h3>Output</h3>
      <p>Name: {state.name}</p>
      <p>Email: {state.email}</p>
    </>
  );
}
