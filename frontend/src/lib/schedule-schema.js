import { z } from "zod"

export const eventSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),
  date: z.string().min(1, "Date is required"), // Use string type for native date input
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  thumbnail1: z.instanceof(File).optional(),
  thumbnail2: z.instanceof(File).optional(),
  description: z.string().min(1, "Description is required"),
});
