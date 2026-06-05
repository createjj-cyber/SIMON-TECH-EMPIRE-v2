import { body, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

export const validateEmail = body('email').isEmail().normalizeEmail();
export const validatePassword = body('password').isLength({ min: 6 });
export const validateName = body('name').isLength({ min: 2 });
