"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/auth/auth-client";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
	const [totpCode, setTotpCode] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
			setError("TOTP code must be 6 digits");
			
			return;
		}
		try {
			const res = await client.twoFactor.verifyTotp({
				code: totpCode,
			});
			if (res.data?.token) {
				setSuccess(true);
				setError("");
			} else {
				setError("Invalid TOTP code");
			}
		} catch (error) {
			setError("An error occurred during verification");
		}
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
			<Card className="max-w-80 w-full">
				<CardHeader>
					<CardTitle>TOTP Verification</CardTitle>
					<CardDescription>
						Enter your 6-digit TOTP code to authenticate
					</CardDescription>
				</CardHeader>
				<CardContent>
					{!success ? (
						<form onSubmit={handleSubmit}>
							<div className="space-y-2">
								<Label htmlFor="totp">TOTP Code</Label>
								<Input
									id="totp"
									type="text"
									inputMode="numeric"
									pattern="\d{6}"
									maxLength={6}
									value={totpCode}
									onChange={(e) => setTotpCode(e.target.value)}
									placeholder="Enter 6-digit code"
									required
								/>
							</div>
							{error && (
								<div className="flex items-center mt-2 text-alert-text">
									<AlertCircle className="w-4 h-4 mr-2" />
									<span className="text-sm">{error}</span>
								</div>
							)}
							<Button type="submit" className="mt-4" size="default" fullWidth variant="solid" disabled={totpCode.length !== 6 || !/^\d+$/.test(totpCode)}>
								Verify
							</Button>
						</form>
					) : (
						<div className="flex flex-col items-center justify-center space-y-2">
							<CheckCircle2 className="w-12 h-12 text-success-text" />
							<p className="text-lg font-semibold">Verification Successful</p>
						</div>
					)}
				</CardContent>
				<CardFooter className="text-sm flex w-full justify-center text-canvas-text gap-2">
					<Link href="/two-factor/otp">
						<Button variant="outline" size="default" fullWidth>
							Switch to Email Verification
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</main>
	);
}
