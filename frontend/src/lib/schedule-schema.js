import { z } from "zod"

export const eventSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),

  date: z.coerce.date(),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  img1: z.instanceof(File).optional(),
  img2: z.instanceof(File).optional(),
  description: z.string().min(1, "Description is required"),
  host: z.string().min(1, "Host is required"),
  programType: z.string().min(1,"Program type is required")
});

