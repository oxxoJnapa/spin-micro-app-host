import React from 'react';

type BoundaryStates = {
  hasError: boolean;
}

type BoundaryProps = React.PropsWithChildren<{
  fallback: React.ReactNode;
}>;

export default class ErrorBoundary extends React.Component<BoundaryProps, BoundaryStates> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('getDerivedStateFromError', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.log('componentDidCatch', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
