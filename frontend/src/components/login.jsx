import { useAuth } from '@/context/auth-context';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { Icons } from "./ui/icons";
import { Link } from "react-router";
import { loginSchema } from "@/lib/login-schema";

function LoginForm() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const success = await login(values.username, values.password);
      if (success) {
        const redirectTo = location.state?.from?.pathname || '/';
        if (redirectTo === '/add_event') {
          window.location.href = 'http://127.0.0.1:8000/add_event/';
        } else {
          navigate(redirectTo);
        }
      } else {
        form.setError('root', {
          type: 'manual',
          message: 'Invalid credentials'
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-semibold">Login</CardTitle>
          <CardDescription>Welcome back</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input id="username" autoComplete="username" placeholder="Enter your username" {...field} disabled={isLoading} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground z-10" />
                        <PasswordInput
                          id="password"
                          placeholder="Enter your password"
                          {...field}
                          disabled={isLoading}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <div className="text-red-500 text-sm">
                  {form.formState.errors.root.message}
                </div>
              )}
              <Button className="w-full bg-[#00A8E5] hover:bg-[#4299cc] text-white" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 my-4">
          <Link to="/" className="text-primary">Go back to home</Link>
        </CardFooter>
      </Card>
      <div className="mt-5">
      </div>
    </div>
  );
}

export default LoginForm;
