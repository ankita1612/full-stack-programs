// ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state when error occurs
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error caught by boundary: ", error);
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{ color: "red" }}>Something went wrong!</h1>;
    }
    return this.props.children;
  }
}
