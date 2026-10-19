import { z } from "zod";

export const challengeSchema = z.object({ challenge: z.string().trim().min(20, "Please describe your challenge in at least 20 characters.").max(4000, "Please keep your challenge within 4,000 characters.") });