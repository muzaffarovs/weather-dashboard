import { Component } from "react";
import type { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      message: "",
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("Caught in ErrorBoundary:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: "" });
    window.location.reload(); // optional: full reload
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong 💥</h2>
          <p>{this.state.message}</p>
          <button onClick={this.handleReset}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}
