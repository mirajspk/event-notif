import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function Club({ clubname, clubId, clubImage }) {
  const [email, setEmail] = useState("");

  // Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubscribe = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email, // Use the validated email from form submission
          clubs: [clubId],
        }),
      });

      if (response.ok) {
        alert(`Successfully subscribed to ${clubname}`);
        setEmail(""); // Clear the input field
      } else {
        const responseData = await response.json();
        alert(responseData.error || "Failed to subscribe");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex space-x-4 ml-2 justify-between">
      <div className="min-w-[50px] min-h-[50px] max-h-[50px] max-w-[50px] bg-gray-200 rounded-full">
        {clubImage ? (
          <img src={`http://127.0.0.1:8000/media/${clubImage}`} alt={`${clubname} Logo`} className="w-full h-full object-cover rounded-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
        )}
      </div>
      <div>
        <span className="font-medium">{clubname}</span>

        {/* Corrected Form Structure */}
        <form onSubmit={handleSubmit(handleSubscribe)} className="flex mt-2 w-full">
          <Input
            {...register("email")}
            type="email"
            placeholder="Email..."
            className="border border-[#000000] rounded-none w-full focus:ring-transparent placeholder:text-[#92989F] h-9 "
          />
          <Button type="submit" className="h-9 ml-0.45 rounded-none bg-[#00A8E5] text-white hover:bg-[#00A8E5]/80">
            Follow
          </Button>
        </form>

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
    </div>
  );
}
