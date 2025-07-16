"use client";

import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";

export function ManageAccount() {
	return (
		<div className="flex items-center gap-3">
			<div className="flex items-center gap-2">
				<User className="h-4 w-4 text-canvas-text" />
				<p className="text-sm font-medium text-canvas-text-contrast">Manage Account</p>
			</div>
			<Button 
				variant="outline" 
				size="sm"
				className="border-canvas-border text-canvas-text hover:bg-canvas-bg-hover"
				leadingIcon={<Settings className="h-4 w-4" />}
			>
				Settings
			</Button>
		</div>
	);
}
