import { ErrorRequestHandler, response } from 'express';
import { ValidationError } from 'yup';

type ValidationErrors = {
  [key: string]: string[];
};

const errorHandler: ErrorRequestHandler = (error, request, reponse, next) => {
  console.log(error);

  if (error instanceof ValidationError) {
    let errors = error.inner.reduce<ValidationErrors>(
      (currentError, nextError) => {
        return {
          ...currentError,
          [nextError.path as string]: nextError.errors,
        };
      },
      {}
    );
    return response.status(400).json({ message: 'Validation fails', errors });
  }

  return response.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
