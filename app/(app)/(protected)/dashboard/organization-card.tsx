"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	organization,
	useListOrganizations,
	useSession,
} from "@/lib/auth/auth-client";
import { ActiveOrganization, Session } from "@/lib/auth/auth-types";
import { ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";
import { Loader2, MailPlus, Building2, Users, UserPlus, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import CopyButton from "@/components/ui/copy-button";
import Image from "next/image";

export function OrganizationCard(props: {
	session: Session | null;
	activeOrganization: ActiveOrganization | null;
}) {
	const organizations = useListOrganizations();
	const [optimisticOrg, setOptimisticOrg] = useState<ActiveOrganization | null>(
		props.activeOrganization,
	);
	const [isRevoking, setIsRevoking] = useState<string[]>([]);
	const inviteVariants = {
		hidden: { opacity: 0, height: 0 },
		visible: { opacity: 1, height: "auto" },
		exit: { opacity: 0, height: 0 },
	};

	const { data } = useSession();
	const session = data || props.session;

	const currentMember = optimisticOrg?.members.find(
		(member) => member.userId === session?.user.id,
	);

	return (
		<Card className="border-canvas-border bg-canvas-bg shadow-sm">
			<CardHeader className="rounded-t-lg border-b border-canvas-line bg-canvas-bg-subtle">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-bg">
							<Building2 className="h-5 w-5 text-primary-solid" />
						</div>
						<div>
							<CardTitle className="text-canvas-text-contrast">Organization</CardTitle>
							<p className="text-sm text-canvas-text">Manage your team and workspace</p>
						</div>
					</div>
					<CreateOrganizationDialog />
				</div>
			</CardHeader>
			<CardContent className="p-6">
				<div className="space-y-6">
					{/* Organization Selector */}
					<div className="flex items-center justify-between">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="border-canvas-border text-canvas-text-contrast hover:bg-canvas-bg-hover">
									<div className="flex items-center gap-2">
										<Avatar className="h-6 w-6">
											<AvatarImage
												className="object-cover"
												src={optimisticOrg?.logo || undefined}
											/>
											<AvatarFallback className="text-xs">
												{optimisticOrg?.name?.charAt(0) || "P"}
											</AvatarFallback>
										</Avatar>
										<span className="font-medium">
											{optimisticOrg?.name || "Personal"}
										</span>
										<ChevronDownIcon className="h-4 w-4" />
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-56">
								<DropdownMenuItem
									className="py-2"
									onClick={async () => {
										organization.setActive({
											organizationId: null,
										});
										setOptimisticOrg(null);
									}}
								>
									<div className="flex items-center gap-2">
										<Avatar className="h-6 w-6">
											<AvatarFallback className="text-xs">P</AvatarFallback>
										</Avatar>
										<span>Personal</span>
									</div>
								</DropdownMenuItem>
								{organizations.data?.map((org) => (
									<DropdownMenuItem
										className="py-2"
										key={org.id}
										onClick={async () => {
											if (org.id === optimisticOrg?.id) {
												return;
											}
											setOptimisticOrg({
												members: [],
												invitations: [],
												...org,
											});
											const { data } = await organization.setActive({
												organizationId: org.id,
											});
											setOptimisticOrg(data);
										}}
									>
										<div className="flex items-center gap-2">
											<Avatar className="h-6 w-6">
												<AvatarImage src={org.logo || undefined} />
												<AvatarFallback className="text-xs">
													{org.name?.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<span>{org.name}</span>
										</div>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Organization Info */}
					{optimisticOrg && (
						<div className="rounded-lg border border-canvas-border p-4">
							<div className="flex items-center gap-4">
								<Avatar className="h-12 w-12 border-2 border-canvas-border">
									<AvatarImage
										className="object-cover"
										src={optimisticOrg?.logo || undefined}
									/>
									<AvatarFallback className="text-lg font-semibold bg-primary-bg text-primary-solid">
										{optimisticOrg?.name?.charAt(0) || "P"}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<h3 className="text-lg font-semibold text-canvas-text-contrast">
										{optimisticOrg?.name}
									</h3>
									<p className="text-sm text-canvas-text">
										{optimisticOrg?.members.length || 1} members
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Members Section */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-canvas-text" />
								<h4 className="font-medium text-canvas-text-contrast">Members</h4>
								<span className="text-sm text-canvas-text">
									({optimisticOrg?.members.length || 1})
								</span>
							</div>
							{optimisticOrg && (currentMember?.role === "owner" || currentMember?.role === "admin") && (
								<InviteMemberDialog
									setOptimisticOrg={setOptimisticOrg}
									optimisticOrg={optimisticOrg}
								/>
							)}
						</div>
						<div className="space-y-2">
							{optimisticOrg?.members.map((member) => (
								<div
									key={member.id}
									className="flex items-center justify-between rounded-lg border border-canvas-border bg-canvas-bg p-3"
								>
									<div className="flex items-center gap-3">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={member.user.image || undefined}
												className="object-cover"
											/>
											<AvatarFallback className="text-sm">
												{member.user.name?.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium text-canvas-text-contrast">
												{member.user.name}
											</p>
											<p className="text-xs text-canvas-text capitalize">
												{member.role}
											</p>
										</div>
									</div>
									{member.role !== "owner" &&
										(currentMember?.role === "owner" ||
											currentMember?.role === "admin") && (
											<Button
												size="sm"
												variant="outline"
												className="border-alert-border text-alert-text hover:bg-alert-bg"
												onClick={() => {
													organization.removeMember({
														memberIdOrEmail: member.id,
													});
												}}
											>
												{currentMember?.id === member.id ? "Leave" : "Remove"}
											</Button>
										)}
								</div>
							))}
							{!optimisticOrg?.id && (
								<div className="flex items-center justify-between rounded-lg border border-canvas-border bg-canvas-bg p-3">
									<div className="flex items-center gap-3">
										<Avatar className="h-8 w-8">
											<AvatarImage src={session?.user.image || undefined} />
											<AvatarFallback className="text-sm">
												{session?.user.name?.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium text-canvas-text-contrast">
												{session?.user.name}
											</p>
											<p className="text-xs text-canvas-text">Owner</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Invitations Section */}
					{optimisticOrg?.invitations && optimisticOrg.invitations.length > 0 && (
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<MailPlus className="h-4 w-4 text-canvas-text" />
								<h4 className="font-medium text-canvas-text-contrast">Pending Invitations</h4>
								<span className="text-sm text-canvas-text">
									({optimisticOrg.invitations.length})
								</span>
							</div>
							<AnimatePresence>
								{optimisticOrg.invitations.map((invitation) => (
									<motion.div
										key={invitation.id}
										variants={inviteVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-lg border border-warning-border bg-warning-bg p-3"
									>
										<div className="flex items-center gap-3">
											<div className="flex h-8 w-8 items-center justify-center rounded-md bg-warning-bg-active">
												<MailPlus className="h-4 w-4 text-warning-text" />
											</div>
											<div>
												<p className="text-sm font-medium text-warning-text-contrast">
													{invitation.email}
												</p>
												<p className="text-xs text-warning-text">
													Invited as {invitation.role}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<Button
												size="sm"
												variant="outline"
												className="border-warning-border text-warning-text hover:bg-warning-bg-hover"
												onClick={() => {
													organization.rejectInvitation({
														invitationId: invitation.id,
													});
												}}
											>
												Revoke
											</Button>
											<CopyButton
												textToCopy={`/accept-invitation/${invitation.id}`}
											/>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

function CreateOrganizationDialog() {
	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [isSlugEdited, setIsSlugEdited] = useState(false);
	const [logo, setLogo] = useState<string | null>(null);

	useEffect(() => {
		if (!isSlugEdited) {
			const generatedSlug = name.trim().toLowerCase().replace(/\s+/g, "-");
			setSlug(generatedSlug);
		}
	}, [name, isSlugEdited]);

	useEffect(() => {
		if (open) {
			setName("");
			setSlug("");
			setIsSlugEdited(false);
			setLogo(null);
		}
	}, [open]);

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setLogo(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="default" variant="solid" leadingIcon={<PlusIcon />}>
					New Organization
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] w-11/12">
				<DialogHeader>
					<DialogTitle>New Organization</DialogTitle>
					<DialogDescription>
						Create a new organization to collaborate with your team.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label>Organization Name</Label>
						<Input
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Organization Slug</Label>
						<Input
							value={slug}
							onChange={(e) => {
								setSlug(e.target.value);
								setIsSlugEdited(true);
							}}
							placeholder="Slug"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Logo</Label>
						<Input type="file" accept="image/*" onChange={handleLogoChange} />
						{logo && (
							<div className="mt-2">
								<Image
									src={logo}
									alt="Logo preview"
									className="w-16 h-16 object-cover"
									width={16}
									height={16}
								/>
							</div>
						)}
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={loading}
						onClick={async () => {
							setLoading(true);
							await organization.create(
								{
									name: name,
									slug: slug,
									logo: logo || undefined,
								},
								{
									onResponse: () => {
										setLoading(false);
									},
									onSuccess: () => {
										toast.success("Organization created successfully");
										setOpen(false);
									},
									onError: (error) => {
										toast.error(error.error.message);
										setLoading(false);
									},
								},
							);
						}}
					>
						{loading ? (
							<Loader2 className="animate-spin" size={16} />
						) : (
							"Create"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function InviteMemberDialog({
	setOptimisticOrg,
	optimisticOrg,
}: {
	setOptimisticOrg: (org: ActiveOrganization | null) => void;
	optimisticOrg: ActiveOrganization | null;
}) {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("member");
	const [loading, setLoading] = useState(false);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" leadingIcon={<MailPlus size={16} />}>
					Invite Member
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] w-11/12">
				<DialogHeader>
					<DialogTitle>Invite Member</DialogTitle>
					<DialogDescription>
						Invite a member to your organization.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<Label>Email</Label>
					<Input
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Label>Role</Label>
					<Select value={role} onValueChange={setRole}>
						<SelectTrigger>
							<SelectValue placeholder="Select a role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="admin">Admin</SelectItem>
							<SelectItem value="member">Member</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<DialogFooter>
					<DialogClose>
						<Button
							disabled={loading}
							onClick={async () => {
								const invite = organization.inviteMember({
									email: email,
									role: role as "member",
									fetchOptions: {
										throw: true,
										onSuccess: (ctx) => {
											if (optimisticOrg) {
												setOptimisticOrg({
													...optimisticOrg,
													invitations: [
														...(optimisticOrg?.invitations || []),
														ctx.data,
													],
												});
											}
										},
									},
								});
								toast.promise(invite, {
									loading: "Inviting member...",
									success: "Member invited successfully",
									error: (error) => error.error.message,
								});
							}}
						>
							Invite
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
