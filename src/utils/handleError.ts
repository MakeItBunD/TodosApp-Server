import type { Response } from 'express';

const handleError = (res: Response, status: number, message: string) => {
  res.status(status).json({ message });
};

export default handleError;