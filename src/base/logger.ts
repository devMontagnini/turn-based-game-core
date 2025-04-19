export class Logger {
  static logInternalError(message: string, data?: any): void {
    console.error('INTERNAL_ERROR: ', { message, ...(data ? { data }: {}) });
  }
}