/**
 * File: src/features/booking/components/BookingWizard.tsx
 * Module: booking
 * Purpose: Guided booking request wizard (WhatsApp + call based).
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - This does not confirm a booking. It prepares a request for WhatsApp/call.
 * - Keep this flow mobile-first: one clear action per step.
 */
"use client";

import { useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormValues } from "../schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sansthanLocations, bookingRules } from "@/data/sansthan-data";
import { CONTACT_DETAILS, WHATSAPP_LINK } from "@/data/contact";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, Loader2, PhoneCall, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function BookingWizard() {
  const searchParams = useSearchParams();
  const defaultLocationId = searchParams.get("location") || "";

  const [step, setStep] = useState(1);
  const [isPreparing, setIsPreparing] = useState(false);
  const [requestUrl, setRequestUrl] = useState<string | null>(null);

  const bookingCallHref = `tel:${CONTACT_DETAILS.booking.mobile.replace(/[^0-9+]/g, "")}`;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as unknown as Resolver<BookingFormValues>,
    defaultValues: {
      locationId: defaultLocationId,
      guests: 2,
      acceptedRules: false,
    },
    mode: "onChange",
  });

  const { watch, trigger } = form;
  const selectedLocationId = watch("locationId");
  const selectedLocation = sansthanLocations.find(l => l.id === selectedLocationId);

  const resetWizard = () => {
    setRequestUrl(null);
    setIsPreparing(false);
    setStep(1);
    form.reset({
      locationId: defaultLocationId,
      guests: 2,
      acceptedRules: false,
    });
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = ["locationId", "dateRange", "guests"];
    } else if (step === 2) {
      fieldsToValidate = ["roomType"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (values: BookingFormValues) => {
    setIsPreparing(true);

    const locationLabel = selectedLocation
      ? `${selectedLocation.name}${selectedLocation.city ? `, ${selectedLocation.city}` : ""}`
      : values.locationId;
    const from = format(values.dateRange.from, "dd MMM yyyy");
    const to = format(values.dateRange.to, "dd MMM yyyy");

    const message = [
      "🙏 Gan Gan Ganaat Bote 🙏",
      "",
      "Accommodation Booking Request",
      `Name: ${values.primaryGuestName}`,
      `Mobile: ${values.mobile}`,
      `Location: ${locationLabel}`,
      `Dates: ${from} to ${to}`,
      `Guests: ${values.guests}`,
      `Room type: ${values.roomType}`,
      "",
      "I accept the Sansthan rules and will carry valid ID proof. Kindly confirm availability and next steps.",
    ].join("\n");

    const separator = WHATSAPP_LINK.includes("?") ? "&" : "?";
    const url = `${WHATSAPP_LINK}${separator}text=${encodeURIComponent(message)}`;

    setRequestUrl(url);
    setIsPreparing(false);
    setStep(4);

    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      window.location.href = url;
    }
  };

  if (step === 4 && requestUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl mx-auto text-center py-12 border-brand-saffron/20 shadow-lg">
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              >
                <CheckCircle2 className="h-24 w-24 text-brand-saffron" />
              </motion.div>
            </div>
            <h2 className="text-3xl font-bold font-heading text-brand-maroon">Request Ready on WhatsApp</h2>
            <p className="text-muted-foreground text-lg">
              We&apos;ve prepared your booking request message. Please review it in WhatsApp and press <span className="font-medium">Send</span>.
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Final confirmation is provided by the Sansthan office based on availability and rules.
              Please carry a valid ID proof during check-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button asChild variant="premium" className="rounded-full h-12 px-6 text-base">
                <a href={requestUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Open WhatsApp Again
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full h-12 px-6 text-base border-brand-maroon/20">
                <a href={bookingCallHref}>
                  <PhoneCall className="h-4 w-4" />
                  Call Booking Helpline
                </a>
              </Button>
            </div>
            <Button onClick={resetWizard} variant="outline" className="rounded-full h-11 border-brand-maroon/20">
              Start New Request
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-muted -z-10" />
          <motion.div 
            className="absolute left-0 top-1/2 h-1 bg-brand-saffron -z-10"
            initial={{ width: "0%" }}
            animate={{ width: `${((step - 1) / 2) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              initial={false}
              animate={{
                scale: step >= s ? 1.1 : 1,
                borderColor: step >= s ? "var(--brand-saffron)" : "var(--muted)",
                backgroundColor: step >= s ? "var(--brand-saffron)" : "var(--background)",
                color: step >= s ? "#ffffff" : "var(--muted-foreground)"
              }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 z-10"
              )}
            >
              {s}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs font-medium text-muted-foreground px-2">
          <span>Details</span>
          <span>Room</span>
          <span>Confirm</span>
        </div>
      </div>

      <Card className="border-t-4 border-t-brand-saffron shadow-md">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-brand-maroon">
            {step === 1 && "Stay Details"}
            {step === 2 && "Select Accommodation"}
            {step === 3 && "Guest Information"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Select where and when you want to stay."}
            {step === 2 && "Choose from available room types."}
            {step === 3 && "Enter your details and review rules."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="locationId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Location</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sansthanLocations.map((loc) => (
                                <SelectItem key={loc.id} value={loc.id}>
                                  {loc.name}, {loc.city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateRange"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Check-in & Check-out</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value?.from ? (
                                      field.value.to ? (
                                        <>
                                          {format(field.value.from, "LLL dd, y")} -{" "}
                                          {format(field.value.to, "LLL dd, y")}
                                        </>
                                      ) : (
                                        format(field.value.from, "LLL dd, y")
                                      )
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="range"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Guests</FormLabel>
                            <FormControl>
                              <Input type="number" min={1} max={20} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && selectedLocation && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Available Room Types at {selectedLocation.name}</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 gap-4">
                              {selectedLocation.facilities.map((facility) => (
                                <div
                                  key={facility.name}
                                  className={cn(
                                    "border rounded-lg p-4 cursor-pointer transition-all hover:border-brand-saffron hover:shadow-sm",
                                    field.value === facility.name
                                      ? "border-brand-saffron bg-brand-saffron/5 ring-1 ring-brand-saffron"
                                      : "bg-card"
                                  )}
                                  onClick={() => field.onChange(facility.name)}
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-semibold text-brand-maroon">{facility.name}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Capacity: {facility.capacity} Persons • {facility.ac ? "AC" : "Non-AC"}
                                      </p>
                                    </div>
                                    <div className={cn(
                                      "h-5 w-5 rounded-full border border-primary flex items-center justify-center",
                                      field.value === facility.name ? "bg-primary border-primary" : "bg-transparent"
                                    )}>
                                      {field.value === facility.name && <div className="h-2 w-2 rounded-full bg-white" />}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="primaryGuestName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Guest Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <Input placeholder="10-digit mobile number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="idProof"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>ID Proof Number (Aadhar/Voter ID)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ID Number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg border border-brand-maroon/10">
                      <h4 className="font-semibold mb-2 text-brand-maroon">Important Rules</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        {bookingRules.map((rule) => (
                          <li key={rule.id}>{rule.description}</li>
                        ))}
                      </ul>
                    </div>

                    <FormField
                      control={form.control}
                      name="acceptedRules"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer">
                              I accept the Sansthan rules and regulations.
                            </FormLabel>
                            <FormDescription>
                              I confirm that I am booking for a family and will carry valid ID proof.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="w-full sm:w-auto border-brand-maroon/20"
                  >
                    Back
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto sm:ml-auto bg-brand-saffron hover:bg-brand-saffron/90 text-white"
                  >
                    Next Step
                  </Button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto h-11 rounded-full border-brand-maroon/20"
                    >
                      <a href={bookingCallHref}>
                        <PhoneCall className="h-4 w-4" />
                        Call Helpline
                      </a>
                    </Button>

                    <Button
                      type="submit"
                      variant="premium"
                      className="w-full sm:w-auto h-11 rounded-full"
                      disabled={isPreparing}
                    >
                      {isPreparing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Preparing...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-4 w-4" />
                          Send on WhatsApp
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
