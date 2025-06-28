"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function UpgradeButton() {
	return (
		<Button variant="solid" leadingIcon={<Sparkles className="w-5 h-5 mr-2" />}>
			<Sparkles className="w-5 h-5 mr-2" />
			Upgrade to Pro
		</Button>
	);
}
