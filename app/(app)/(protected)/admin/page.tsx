"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { toast, Toaster } from "sonner";
import { client } from "@/lib/auth/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
	Loader2,
	Plus,
	Trash,
	RefreshCw,
	UserCircle,
	Calendar as CalendarIcon,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type User = {
	id: string;
	email: string;
	name: string;
	role: "admin" | "user";
	banned?: boolean;
};

export default function AdminDashboard() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newUser, setNewUser] = useState({
		email: "",
		password: "",
		name: "",
		role: "user" as const,
	});
	const [isLoading, setIsLoading] = useState<string | undefined>();
	const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
	const [banForm, setBanForm] = useState({
		userId: "",
		reason: "",
		expirationDate: undefined as Date | undefined,
	});

	const { data: users, isLoading: isUsersLoading } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const data = await client.admin.listUsers(
				{
					query: {
						limit: 10,
						sortBy: "createdAt",
						sortDirection: "desc",
					},
				},
				{
					throw: true,
				},
			);
			
			return data?.users || [];
		},
	});

	const handleCreateUser = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading("create");
		try {
			await client.admin.createUser({
				email: newUser.email,
				password: newUser.password,
				name: newUser.name,
				role: newUser.role,
			});
			toast.success("User created successfully");
			setNewUser({ email: "", password: "", name: "", role: "user" });
			setIsDialogOpen(false);
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : "Failed to create user";
			toast.error(errorMessage);
		} finally {
			setIsLoading(undefined);
		}
	};

	const handleDeleteUser = async (id: string) => {
		setIsLoading(`delete-${id}`);
		try {
			await client.admin.removeUser({ userId: id });
			toast.success("User deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : "Failed to delete user";
			toast.error(errorMessage);
		} finally {
			setIsLoading(undefined);
		}
	};

	const handleRevokeSessions = async (id: string) => {
		setIsLoading(`revoke-${id}`);
		try {
			await client.admin.revokeUserSessions({ userId: id });
			toast.success("Sessions revoked for user");
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : "Failed to revoke sessions";
			toast.error(errorMessage);
		} finally {
			setIsLoading(undefined);
		}
	};

	const handleImpersonateUser = async (id: string) => {
		setIsLoading(`impersonate-${id}`);
		try {
			await client.admin.impersonateUser({ userId: id });
			toast.success("Impersonated user");
			router.push("/dashboard");
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : "Failed to impersonate user";
			toast.error(errorMessage);
		} finally {
			setIsLoading(undefined);
		}
	};

	const handleBanUser = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(`ban-${banForm.userId}`);
		try {
			if (!banForm.expirationDate) {
				throw new Error("Expiration date is required");
			}
			await client.admin.banUser({
				userId: banForm.userId,
				banReason: banForm.reason,
				banExpiresIn: banForm.expirationDate.getTime() - new Date().getTime(),
			});
			toast.success("User banned successfully");
			setIsBanDialogOpen(false);
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : "Failed to ban user";
			toast.error(errorMessage);
		} finally {
			setIsLoading(undefined);
		}
	};

	return (
		<div className="w-full min-h-screen max-w-7xl mx-auto space-y-8 py-10 px-4 sm:px-0 sm:py-16">
			<Toaster richColors />
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-2xl">Admin Dashboard</CardTitle>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button size="default" variant="solid" leadingIcon={<Plus className="mr-2 h-4 w-4" />}>
								Create User
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create New User</DialogTitle>
							</DialogHeader>
							<form onSubmit={handleCreateUser} className="space-y-4">
								<div className="flex flex-col space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={newUser.email}
										onChange={(e) =>
											setNewUser({ ...newUser, email: e.target.value })
										}
										required
									/>
								</div>
								<div className="flex flex-col space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										value={newUser.password}
										onChange={(e) =>
											setNewUser({ ...newUser, password: e.target.value })
										}
										required
									/>
								</div>
								<div className="flex flex-col space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										value={newUser.name}
										onChange={(e) =>
											setNewUser({ ...newUser, name: e.target.value })
										}
										required
									/>
								</div>
								<div className="flex flex-col space-y-2">
									<Label htmlFor="role">Role</Label>
									<Select
										value={newUser.role}
										onValueChange={(value: "admin" | "user") =>
											setNewUser({ ...newUser, role: value as "user" })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="user">User</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button
									type="submit"
									size="default"
									fullWidth
									variant="solid"
									isLoading={isLoading === "create"}
									disabled={isLoading === "create"}
								>
									Create User
								</Button>
							</form>
						</DialogContent>
					</Dialog>
					<Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Ban User</DialogTitle>
							</DialogHeader>
							<form onSubmit={handleBanUser} className="space-y-4">
								<div>
									<Label htmlFor="reason">Reason</Label>
									<Input
										id="reason"
										value={banForm.reason}
										onChange={(e) =>
											setBanForm({ ...banForm, reason: e.target.value })
										}
										required
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="expirationDate">Expiration Date</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												id="expirationDate"
												variant={"outline"}
												size="default"
												className={cn(
													"w-full justify-start text-left font-normal",
													!banForm.expirationDate && "text-canvas-text",
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{banForm.expirationDate ? (
													format(banForm.expirationDate, "PPP")
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={banForm.expirationDate}
												onSelect={(date) =>
													setBanForm({ ...banForm, expirationDate: date })
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
								<Button
									type="submit"
									size="default"
									fullWidth
									variant="solid"
									isLoading={isLoading === `ban-${banForm.userId}`}
									disabled={isLoading === `ban-${banForm.userId}`}
									className="mt-4"
								>
									Ban User
								</Button>
							</form>
						</DialogContent>
					</Dialog>
				</CardHeader>
				<CardContent>
					{isUsersLoading ? (
						<div className="flex justify-center items-center h-64">
							<Loader2 className="h-8 w-8 animate-spin" />
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Email</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Banned</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users?.map((user) => (
									<TableRow key={user.id}>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.role || "user"}</TableCell>
										<TableCell>
											{user.banned ? (
												<Badge variant="destructive">Yes</Badge>
											) : (
												<Badge variant="outline">No</Badge>
											)}
										</TableCell>
										<TableCell>
											<div className="flex space-x-2">
												<Button
													variant="destructive"
													size="default"
													onClick={() => handleDeleteUser(user.id)}
													disabled={isLoading?.startsWith("delete")}
													isLoading={isLoading === `delete-${user.id}`}
												>
													<Trash className="h-4 w-4" />
												</Button>
												<Button
													variant="outline"
													size="default"
													onClick={() => handleRevokeSessions(user.id)}
													disabled={isLoading?.startsWith("revoke")}
													isLoading={isLoading === `revoke-${user.id}`}
												>
													<RefreshCw className="h-4 w-4" />
												</Button>
												<Button
													variant="outline"
													size="default"
													onClick={() => handleImpersonateUser(user.id)}
													disabled={isLoading?.startsWith("impersonate")}
													isLoading={isLoading === `impersonate-${user.id}`}
												>
													<UserCircle className="h-4 w-4 mr-2" />
													Impersonate
												</Button>
												<Button
													variant="outline"
													size="default"
													onClick={async () => {
														setBanForm({
															userId: user.id,
															reason: "",
															expirationDate: undefined,
														});
														if (user.banned) {
															setIsLoading(`ban-${user.id}`);
															await client.admin.unbanUser(
																{
																	userId: user.id,
																},
																{
																	onError(context) {
																		toast.error(
																			context.error.message ||
																				"Failed to unban user",
																		);
																		setIsLoading(undefined);
																	},
																	onSuccess() {
																		queryClient.invalidateQueries({
																			queryKey: ["users"],
																		});
																		toast.success("User unbanned successfully");
																	},
																},
															);
															queryClient.invalidateQueries({
																queryKey: ["users"],
															});
														} else {
															setIsBanDialogOpen(true);
														}
													}}
													disabled={isLoading?.startsWith("ban")}
													isLoading={isLoading === `ban-${user.id}`}
												>
													{user.banned ? "Unban" : "Ban"}
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
