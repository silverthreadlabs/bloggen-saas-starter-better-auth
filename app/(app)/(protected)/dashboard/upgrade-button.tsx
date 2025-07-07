"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Crown } from "lucide-react";

export default function UpgradeButton() {
	return (
		<Button 
			variant="solid" 
			className="bg-gradient-to-r from-primary-solid to-primary-solid-hover text-primary-on-primary hover:from-primary-solid-hover hover:to-primary-solid shadow-lg hover:shadow-xl transition-all duration-200"
			leadingIcon={<Crown className="w-4 h-4" />}
		>
			Upgrade to Pro
		</Button>
	);
}
