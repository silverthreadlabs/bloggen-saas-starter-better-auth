'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import CopyButton from '@/components/ui/copy-button';
import {
    organization,
    useListOrganizations,
    useSession
} from '@/lib/auth/auth-client';
import { ActiveOrganization, Session } from '@/lib/auth/auth-types';
import { 
    ChevronDownIcon, 
    PlusIcon 
} from '@radix-ui/react-icons';
import { 
    Loader2, 
    MailPlus, 
    Building2, 
    Users, 
    UserPlus, 
    Settings 
} from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

interface OrganizationSectionProps {
    session: Session | null;
    activeOrganization: ActiveOrganization | null;
}

export default function OrganizationSection({ session, activeOrganization }: OrganizationSectionProps) {
    const organizations = useListOrganizations();
    const [optimisticOrg, setOptimisticOrg] = useState<ActiveOrganization | null>(activeOrganization);
    const { data } = useSession();
    const currentSession = data || session;

    const currentMember = optimisticOrg?.members.find(
        (member) => member.userId === currentSession?.user.id
    );

    const inviteVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="border-b border-canvas-border pb-6">
                <h1 className="text-2xl font-semibold text-canvas-text-contrast">Organization</h1>
                <p className="text-canvas-text mt-1">
                    Manage your team, workspace, and organization settings
                </p>
            </div>

            {/* Organization Selector */}
            <Card className="border-canvas-border bg-canvas-bg">
                <CardHeader className="border-b border-canvas-border bg-canvas-bg-subtle">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary-bg flex h-10 w-10 items-center justify-center rounded-lg">
                                <Building2 className="text-primary-solid h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-canvas-text-contrast">Current Organization</CardTitle>
                                <p className="text-canvas-text text-sm">Switch between organizations</p>
                            </div>
                        </div>
                        <CreateOrganizationDialog />
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-auto justify-start border-canvas-border text-canvas-text-contrast hover:bg-canvas-bg-hover"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            className="object-cover"
                                            src={optimisticOrg?.logo || undefined}
                                        />
                                        <AvatarFallback className="text-sm bg-primary-bg text-primary-solid">
                                            {optimisticOrg?.name?.charAt(0) || 'P'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">
                                        {optimisticOrg?.name || 'Personal'}
                                    </span>
                                    <ChevronDownIcon className="h-4 w-4 ml-auto" />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64">
                            <DropdownMenuItem
                                className="py-3"
                                onClick={async () => {
                                    organization.setActive({ organizationId: null });
                                    setOptimisticOrg(null);
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-sm bg-primary-bg text-primary-solid">
                                            P
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>Personal</span>
                                </div>
                            </DropdownMenuItem>
                            {organizations.data?.map((org) => (
                                <DropdownMenuItem
                                    className="py-3"
                                    key={org.id}
                                    onClick={async () => {
                                        if (org.id === optimisticOrg?.id) return;
                                        setOptimisticOrg({
                                            members: [],
                                            invitations: [],
                                            ...org
                                        });
                                        const { data } = await organization.setActive({
                                            organizationId: org.id
                                        });
                                        setOptimisticOrg(data);
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={org.logo || undefined} />
                                            <AvatarFallback className="text-sm bg-primary-bg text-primary-solid">
                                                {org.name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>{org.name}</span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardContent>
            </Card>

            {/* Organization Details */}
            {optimisticOrg && (
                <Card className="border-canvas-border bg-canvas-bg">
                    <CardHeader className="border-b border-canvas-border bg-canvas-bg-subtle">
                        <CardTitle className="text-canvas-text-contrast">Organization Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-canvas-border">
                                <AvatarImage
                                    className="object-cover"
                                    src={optimisticOrg?.logo || undefined}
                                />
                                <AvatarFallback className="text-xl font-semibold bg-primary-bg text-primary-solid">
                                    {optimisticOrg?.name?.charAt(0) || 'P'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h3 className="text-xl font-semibold text-canvas-text-contrast">
                                    {optimisticOrg?.name}
                                </h3>
                                <p className="text-canvas-text">
                                    {optimisticOrg?.members.length || 1} member{(optimisticOrg?.members.length || 1) !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Members Section */}
            <Card className="border-canvas-border bg-canvas-bg">
                <CardHeader className="border-b border-canvas-border bg-canvas-bg-subtle">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary-bg flex h-10 w-10 items-center justify-center rounded-lg">
                                <Users className="text-primary-solid h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-canvas-text-contrast">Team Members</CardTitle>
                                <p className="text-canvas-text text-sm">
                                    {optimisticOrg?.members.length || 1} member{(optimisticOrg?.members.length || 1) !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                        {optimisticOrg && (currentMember?.role === 'owner' || currentMember?.role === 'admin') && (
                            <InviteMemberDialog
                                setOptimisticOrg={setOptimisticOrg}
                                optimisticOrg={optimisticOrg}
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-3">
                        {optimisticOrg?.members.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between p-4 rounded-lg border border-canvas-border bg-canvas-bg-subtle"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage
                                            src={member.user.image || undefined}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-primary-bg text-primary-solid">
                                            {member.user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-canvas-text-contrast">
                                            {member.user.name}
                                        </p>
                                        <p className="text-sm text-canvas-text">
                                            {member.user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="capitalize">
                                        {member.role}
                                    </Badge>
                                    {member.role !== 'owner' &&
                                        (currentMember?.role === 'owner' || currentMember?.role === 'admin') && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-alert-border text-alert-text hover:bg-alert-bg"
                                                onClick={() => {
                                                    organization.removeMember({
                                                        memberIdOrEmail: member.id
                                                    });
                                                }}
                                            >
                                                {currentMember?.id === member.id ? 'Leave' : 'Remove'}
                                            </Button>
                                        )}
                                </div>
                            </div>
                        ))}
                        {!optimisticOrg?.id && (
                            <div className="flex items-center justify-between p-4 rounded-lg border border-canvas-border bg-canvas-bg-subtle">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={currentSession?.user.image || undefined} />
                                        <AvatarFallback className="bg-primary-bg text-primary-solid">
                                            {currentSession?.user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-canvas-text-contrast">
                                            {currentSession?.user.name}
                                        </p>
                                        <p className="text-sm text-canvas-text">
                                            {currentSession?.user.email}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline">Owner</Badge>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Pending Invitations */}
            {optimisticOrg?.invitations && optimisticOrg.invitations.length > 0 && (
                <Card className="border-canvas-border bg-canvas-bg">
                    <CardHeader className="border-b border-canvas-border bg-canvas-bg-subtle">
                        <div className="flex items-center gap-3">
                            <div className="bg-warning-bg flex h-10 w-10 items-center justify-center rounded-lg">
                                <MailPlus className="text-warning-text h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-canvas-text-contrast">Pending Invitations</CardTitle>
                                <p className="text-canvas-text text-sm">
                                    {optimisticOrg.invitations.length} invitation{optimisticOrg.invitations.length !== 1 ? 's' : ''} pending
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-3">
                            <AnimatePresence>
                                {optimisticOrg.invitations.map((invitation) => (
                                    <motion.div
                                        key={invitation.id}
                                        variants={inviteVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 rounded-lg border border-warning-border bg-warning-bg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-warning-bg-active flex h-10 w-10 items-center justify-center rounded-lg">
                                                <MailPlus className="text-warning-text h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-warning-text-contrast">
                                                    {invitation.email}
                                                </p>
                                                <p className="text-sm text-warning-text">
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
                                                        invitationId: invitation.id
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
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function CreateOrganizationDialog() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isSlugEdited, setIsSlugEdited] = useState(false);
    const [logo, setLogo] = useState<string | null>(null);

    useEffect(() => {
        if (!isSlugEdited) {
            const generatedSlug = name.trim().toLowerCase().replace(/\s+/g, '-');
            setSlug(generatedSlug);
        }
    }, [name, isSlugEdited]);

    useEffect(() => {
        if (open) {
            setName('');
            setSlug('');
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
                <Button size="sm" variant="solid" className="gap-2">
                    <PlusIcon className="h-4 w-4" />
                    New Organization
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Organization</DialogTitle>
                    <DialogDescription>
                        Create a new organization to collaborate with your team.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Organization Name</Label>
                        <Input
                            placeholder="Enter organization name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Organization Slug</Label>
                        <Input
                            value={slug}
                            onChange={(e) => {
                                setSlug(e.target.value);
                                setIsSlugEdited(true);
                            }}
                            placeholder="organization-slug"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Logo (Optional)</Label>
                        <Input type="file" accept="image/*" onChange={handleLogoChange} />
                        {logo && (
                            <div className="mt-2">
                                <Image
                                    src={logo}
                                    alt="Logo preview"
                                    className="w-16 h-16 object-cover rounded-lg border border-canvas-border"
                                    width={64}
                                    height={64}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        disabled={loading || !name.trim()}
                        isLoading={loading}
                        onClick={async () => {
                            setLoading(true);
                            await organization.create(
                                {
                                    name: name,
                                    slug: slug,
                                    logo: logo || undefined
                                },
                                {
                                    onResponse: () => {
                                        setLoading(false);
                                    },
                                    onSuccess: () => {
                                        toast.success('Organization created successfully');
                                        setOpen(false);
                                    },
                                    onError: (error) => {
                                        toast.error(error.error.message);
                                        setLoading(false);
                                    }
                                }
                            );
                        }}
                    >
                        Create Organization
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function InviteMemberDialog({
    setOptimisticOrg,
    optimisticOrg
}: {
    setOptimisticOrg: (org: ActiveOrganization | null) => void;
    optimisticOrg: ActiveOrganization | null;
}) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('member');
    const [loading, setLoading] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="gap-2">
                    <UserPlus size={16} />
                    Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                        Invite a new member to join your organization.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
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
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            disabled={loading || !email.trim()}
                            isLoading={loading}
                            onClick={async () => {
                                setLoading(true);
                                const invite = organization.inviteMember({
                                    email: email,
                                    role: role as 'member',
                                    fetchOptions: {
                                        throw: true,
                                        onSuccess: (ctx) => {
                                            if (optimisticOrg) {
                                                setOptimisticOrg({
                                                    ...optimisticOrg,
                                                    invitations: [
                                                        ...(optimisticOrg?.invitations || []),
                                                        ctx.data
                                                    ]
                                                });
                                            }
                                            setEmail('');
                                            setRole('member');
                                        }
                                    }
                                });
                                toast.promise(invite, {
                                    loading: 'Sending invitation...',
                                    success: 'Invitation sent successfully',
                                    error: (error) => error.error.message
                                });
                                setLoading(false);
                            }}
                        >
                            Send Invitation
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 