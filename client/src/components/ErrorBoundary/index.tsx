import { Component, ErrorInfo, ReactNode } from 'react';

interface FallbackProps<ExtendedError extends Error> {
  error: ExtendedError;
  resetError: () => void;
}

export interface FallbackUIType<ExtendedError extends Error> {
  (props: FallbackProps<ExtendedError>): React.ReactNode;
}

interface State {
  error: Error | null;
}

interface Props<ExtendedError extends Error = { name: string; message: string }> {
  children?: ReactNode;
  fallback: FallbackUIType<ExtendedError>;
}

const INITIAL_STATE = {
  error: null,
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  resetError() {
    this.setState(INITIAL_STATE);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (error !== null) {
      return fallback({ error, resetError: this.resetError.bind(this) });
    }

    return children;
  }
}

export default ErrorBoundary;
