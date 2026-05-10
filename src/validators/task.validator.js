const { z } = require("zod");

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().optional().default(""),
  }),
});

const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    status: z.enum(["pending", "completed"]).optional(),
  }),
  params: z.object({
    id: z.string().min(1, "Task id is required"),
  }),
});

const idParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task id is required"),
  }),
});

module.exports = { createTaskSchema, updateTaskSchema, idParamSchema };
