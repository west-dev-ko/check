class ServerError extends Error {
     message: string;
     status: number;
     constructor(message: string, status: number) {
          super();
          this.message = message;
          this.status = status;
     }
}

export class UnauthorizedError extends ServerError {
     constructor(message: string = 'Unauthorized') {
          super(message, 401);
     }
}
export class BadRequestError extends ServerError {
     constructor(message: string = 'BadRequestError') {
          super(message, 400);
     }
}
export class ForbiddenError extends ServerError {
     constructor(message: string = 'ForbiddenError') {
          super(message, 403);
     }
}
