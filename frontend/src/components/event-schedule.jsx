"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { eventSchema } from "@/lib/schedule-schema";
import { Icons } from "./ui/icons";

export default function ScheduleEventForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventTitle: "",
      date: "", 
      time: "",
      location: "",
      thumbnail1: undefined,
      thumbnail2: undefined,
      description: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
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

              
              <div className="flex gap-4">
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
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
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

                

                
          

             
              <div className="flex gap-4">
                
                <FormField
                  control={form.control}
                  name="thumbnail1"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Upload Thumbnail 1</FormLabel>
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
                  name="thumbnail2"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Upload Thumbnail 2</FormLabel>
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