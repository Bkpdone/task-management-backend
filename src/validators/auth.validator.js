const { z } = require("zod");

const signupSchema = z.object({
  body: z.object({
    fName: z.string().trim().min(1, "First name is required"),
    lName: z.string().trim().min(1, "Last name is required"),
    emailid: z.string().trim().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

const loginSchema = z.object({
  body: z.object({
    emailid: z.string().trim().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

module.exports = { signupSchema, loginSchema };
