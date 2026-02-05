import { z } from "zod";

export const bookingSchema = z.object({
  locationId: z.string().min(1, "Please select a location"),
  dateRange: z.object({
    from: z.date({ message: "Start date is required" }),
    to: z.date({ message: "End date is required" }),
  }).refine((data) => data.from < data.to, {
    message: "End date must be after start date",
    path: ["to"],
  }),
  guests: z.coerce.number().min(1, "At least 1 guest required").max(20, "Max 20 guests allowed"),
  roomType: z.string().min(1, "Please select a room type"),
  primaryGuestName: z.string().min(3, "Name must be at least 3 characters"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number (10 digits)"),
  idProof: z.string().min(1, "ID Proof is required"),
  acceptedRules: z.boolean().refine(val => val === true, "You must accept the rules"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
