import React, { Component, ErrorInfo } from "react";
import { ErrorBoundaryProps } from "./error-boundary.props";


export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  
  state: Readonly<ErrorBoundaryProps> = { hasError: false };
 

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  // с помощью этого метода логируем информацию об ошибке:
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Возникла ошибка!", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Что-то пошло не так :(</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }
    return this.props.children;
  }
}
