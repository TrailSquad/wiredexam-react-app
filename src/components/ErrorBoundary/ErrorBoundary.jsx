import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "" , componentStack: ""};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, info) {
    this.setState({ error: error, componentStack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error.message}</p>
          <p>{this.state.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary