"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthProvider = "email" | "google" | "github";
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};
const isValidPassword = (password: string): boolean => {
  return password.trim().length >= 6;
};
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<AuthProvider | null>(null);
  const router = useRouter();

  const isLoading = loadingProvider !== null;

  const handleEmailSignIn = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }
    if (!isValidPassword(password)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoadingProvider("email");

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
        fetchOptions: {
          onError: (ctx) => {
            setLoadingProvider(null);
            toast.error(ctx.error.message || "Failed to sign in");
          },
          onSuccess: () => {
            toast.success("Sign in successful! Redirecting...");
            // router.push( "/dashboard");
            window.location.href = "/dashboard";

          },
        },
      });

      if (result && 'redirect' in result) {
        router.push("/dashboard");
      } else {
        setLoadingProvider(null);
      }
    } catch (error) {
      setLoadingProvider(null);
      toast.error("An unexpected error occurred");
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setLoadingProvider(provider);

    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
        fetchOptions: {
          onError: () => {
            setLoadingProvider(null);
          }
        }
      });
    } catch (error) {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      name: "google" as const,
      label: "Sign in with Google",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
          <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
          <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
          <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
          <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
        </svg>
      )
    },
    {
      name: "github" as const,
      label: "Sign in with GitHub",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
        </svg>
      )
    }
  ];

  return (
    <Card className="max-w-md rounded-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                email && !isValidEmail(email) ? "border-alert-solid" : ""
              )}
            />
            {email && !isValidEmail(email) && (
              <p className="text-xs text-alert-text">Please enter a valid email address</p>
            )}
          </div>

          {/* Password Input */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forget-password"
                className={cn(
                  "ml-auto inline-block text-sm underline",
                  isLoading ? "pointer-events-none opacity-50" : ""
                )}
                tabIndex={isLoading ? -1 : 0}
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                password && !isValidPassword(password) ? "border-alert-solid" : ""
              )}
            />
            {password && !isValidPassword(password) && (
              <p className="text-xs text-alert-text">Password must be at least 6 characters</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              disabled={isLoading}
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember" className={isLoading ? "opacity-50" : ""}>
              Remember me
            </Label>
          </div>

          {/* Email Sign In Button */}
          <Button
            variant="solid"
            size="default"
            fullWidth
            disabled={isLoading}
            onClick={handleEmailSignIn}
            isLoading={loadingProvider === "email"}
          >
            Login
          </Button>

          {/* Social Sign In Buttons */}
          <div className="w-full gap-2 flex flex-col items-center justify-between">
            {socialProviders.map((provider) => (
              <Button
                key={provider.name}
                variant="outline"
                size="default"
                disabled={isLoading}
                onClick={() => handleSocialSignIn(provider.name)}
                isLoading={loadingProvider === provider.name}
                fullWidth
              >
                {provider.icon}
                {provider.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-canvas-text">
            Powered by{" "}
            <Link
              href="https://better-auth.com"
              className={cn(
                "underline",
                isLoading ? "pointer-events-none opacity-50" : ""
              )}
              target="_blank"
              tabIndex={isLoading ? -1 : 0}
            >
              <span className="dark:text-orange-200/90">better-auth.</span>
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}