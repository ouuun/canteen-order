export function exceptionMessage(exception: any): string {
  if (!exception) return '';
  if (typeof exception === 'string') return exception;
  if (typeof exception === 'object' && exception instanceof Error) {
    const e = exception as any;
    return (
      e.response?.data?.msg ||
      e.response?.data?.message ||
      e.response?.message ||
      e.message
    );
  }
  return JSON.stringify(exception);
}
