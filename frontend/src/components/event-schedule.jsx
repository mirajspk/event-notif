"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { eventSchema } from "@/lib/schedule-schema"; // Import your Zod schema
import { Icons } from "./ui/icons";
import { DatePickerDemo } from "./ui/date-picker";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TimePicker from "./ui/time-picker"; // Import the TimePicker component

export default function ScheduleEventForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventTitle: "",
      date: new Date(),
      time: "", // Time will be handled by TimePicker
      location: "",
      thumbnail1: undefined,
      thumbnail2: undefined,
      description: "",
      host: "",
      programType: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.eventTitle);
      formData.append("location", values.location);
      formData.append("date", values.date.toISOString().split("T")[0]); // Convert date
      formData.append("startTime", values.time);
      formData.append("host", values.host);
      formData.append("type", values.programType);
      formData.append("description", values.description);
      formData.append("registration_link", "https://example.com");

      if (values.img1) formData.append("image", values.img1);
      if (values.img2) formData.append("imageTwo", values.img2);

      const response = await axios.post("http://127.0.0.1:8000/Api/events/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Success:", response.data);
      alert("Event Created Successfully!");
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      alert("Failed to create event: " + (error.response?.data?.detail || error.message));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-semibold">Schedule Event</CardTitle>
          <CardDescription>Create and schedule your event</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Event Title and Location */}
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="eventTitle"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter event title"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter location"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Host and Program Type */}
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="host"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Host</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select host" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="KUCC">Computer Club (KUCC)</SelectItem>
                          <SelectItem value="KURC">Robotics Club (KURC)</SelectItem>
                          <SelectItem value="KUCEC">Civil Engineering Club (KUCEC)</SelectItem>
                          <SelectItem value="KUCMC">Computational Mathematics Club (KUCMC)</SelectItem>
                          <SelectItem value="KUARC">Architecture Students’ Club (KUARC)</SelectItem>
                          <SelectItem value="GES">Geomatics Engineering Society (GES)</SelectItem>
                          <SelectItem value="KUBIC">Biotechnology Creatives (KUBiC)</SelectItem>
                          <SelectItem value="SEEE">Society of Electrical and Electronic Engineering (SEEE)</SelectItem>
                          <SelectItem value="FoP">Forum for Pharmacy (FoP)</SelectItem>
                          <SelectItem value="SBIS">Society of Business Information Students (SBIS)</SelectItem>
                          <SelectItem value="KUAIC">Artificial Intelligence Club (KUAIC)</SelectItem>
                          <SelectItem value="KUGIC">Indoors Games Clubs (KUIGC)</SelectItem>
                          <SelectItem value="KUSMC">Society of Music and Culture (KUSMC)</SelectItem>
                          <SelectItem value="FECAM">Forum for Environmental Conservation and Management (FECAM)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="programType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Program Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select program type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date and Time */}
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePickerDemo
                          {...field}
                          disabled={isLoading}
                          selected={form.watch("date")} 
                          onSelect={(date) => form.setValue("date", date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <TimePicker
                          onTimeChange={(time) => field.onChange(time)} // Pass the selected time to react-hook-form
                          disabled={isLoading}
                          className="w-full" // Ensure TimePicker takes full width
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="img1"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Upload Image 1</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="img2"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Upload Image 2</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter event description"
                        {...field}
                        disabled={isLoading}
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button className="w-full bg-[#00A8E5] hover:bg-[#4299cc]" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                    "Schedule Event"
                  )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
