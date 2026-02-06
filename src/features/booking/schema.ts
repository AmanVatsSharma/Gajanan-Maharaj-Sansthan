import { z } from "zod";

export const bookingSchema = z.object({
  locationId: z.string().min(1, "Please select a location"),
  checkIn: z.date({ message: "Check-in date is required" }),
  checkOut: z.date({ message: "Check-out date is required" }),
  guests: z.coerce.number().min(1, "At least 1 guest required").max(20, "Max 20 guests allowed"),
  roomType: z.string().min(1, "Please select a room type"),
  primaryGuestName: z.string().min(3, "Name must be at least 3 characters"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number (10 digits)"),
  idProof: z.string().min(1, "ID Proof is required"),
  acceptedRules: z.boolean().refine(val => val === true, "You must accept the rules"),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
