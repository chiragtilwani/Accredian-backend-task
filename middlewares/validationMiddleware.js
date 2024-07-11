// validationMiddleware.js
const { z } = require('zod');

const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.safeParse(req.body);
    next();
  } catch (e) {
    return res.status(400).json(e.errors);
  }
};

const referralSchema = z.object({
  referrerName: z.string().min(1, "Referrer name is required"),
  referrerEmail: z.string().email("Invalid email format"),
  refereeName: z.string().min(1, "Referee name is required"),
  refereeEmail: z.string().email("Invalid email format"),
});

module.exports = {
  validateRequest,
  referralSchema,
};
