'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { client, useSession } from '@/lib/auth/auth-client';
import { Session } from '@/lib/auth/auth-types';
import { Edit, User, Mail, X } from 'lucide-react';
import { toast } from 'sonner';
import { SubscriptionTierLabel } from '@/components/tier-labels';
import { Component as ChangePlanComponent } from '@/app/(app)/(protected)/settings/change-plan';

interface SubscriptionData {
    plan?: string;
    status?: string;
}

interface ProfileSectionProps {
    session: Session | null;
    subscription?: SubscriptionData;
}

export default function ProfileSection({ session, subscription }: ProfileSectionProps) {
    const router = useRouter();
    const { data } = useSession();
    const currentSession = data || session;
    const [emailVerificationPending, setEmailVerificationPending] = useState<boolean>(false);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="border-b border-canvas-border pb-6">
                <h1 className="text-2xl font-semibold text-canvas-text-contrast">Profile</h1>
                <p className="text-canvas-text mt-1">
                    Manage your account settings and personal information
                </p>
            </div>

            {/* Email Verification Alert */}
            {currentSession?.user.emailVerified ? null : (
                <Alert className="border-warning-border bg-warning-bg">
                    <Mail className="h-4 w-4 text-warning-text" />
                    <AlertTitle className="text-warning-text-contrast">Verify Your Email Address</AlertTitle>
                    <AlertDescription className="text-warning-text flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <span>Please verify your email address to secure your account.</span>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-warning-border text-warning-text hover:bg-warning-bg-hover"
                            isLoading={emailVerificationPending}
                            onClick={async () => {
                                await client.sendVerificationEmail(
                                    {
                                        email: currentSession?.user.email || ''
                                    },
                                    {
                                        onRequest(context) {
                                            setEmailVerificationPending(true);
                                        },
                                        onError(context) {
                                            toast.error(context.error.message);
                                            setEmailVerificationPending(false);
                                        },
                                        onSuccess() {
                                            toast.success('Verification email sent successfully');
                                            setEmailVerificationPending(false);
                                        }
                                    }
                                );
                            }}>
                            Resend Verification
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {/* Account Settings Card */}
            <Card className="border-canvas-border bg-canvas-bg">
                <CardHeader className="border-b border-canvas-border bg-canvas-bg-subtle">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-bg flex h-10 w-10 items-center justify-center rounded-sm">
                            <User className="text-primary-solid h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-canvas-text-contrast">Account Settings</CardTitle>
                            <p className="text-canvas-text text-sm">Manage your profile information</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        {/* Profile Picture and Basic Info */}
                        <div className="flex items-center gap-4 flex-1">
                            <Avatar className="h-20 w-20 border-2 border-canvas-border">
                                <AvatarImage
                                    src={currentSession?.user.image || undefined}
                                    alt="Profile picture"
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-primary-bg text-primary-solid text-xl font-semibold">
                                    {currentSession?.user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-xl font-semibold text-canvas-text-contrast">
                                        {currentSession?.user.name}
                                    </h3>
                                    {currentSession?.user.emailVerified && (
                                        <Badge className="bg-success-bg text-success-text border-success-border">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 24 24"
                                                className="mr-1">
                                                <path
                                                    fill="currentColor"
                                                    d="m9.023 21.23l-1.67-2.814l-3.176-.685l.312-3.277L2.346 12L4.49 9.546L4.177 6.27l3.177-.685L9.023 2.77L12 4.027l2.977-1.258l1.67 2.816l3.176.684l-.312 3.277L21.655 12l-2.142 2.454l.311 3.277l-3.177.684l-1.669 2.816L12 19.973zm1.927-6.372L15.908 9.9l-.708-.72l-4.25 4.25l-2.15-2.138l-.708.708z"
                                                />
                                            </svg>
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-canvas-text">{currentSession?.user.email}</p>
                                <div className="flex items-center gap-2">
                                    <SubscriptionTierLabel
                                        tier={(subscription as SubscriptionData)?.plan?.toLowerCase() as 'starter'}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Edit Button and Plan Management */}
                        <div className="flex flex-col gap-2">
                            <EditUserDialog />
                            <ChangePlanComponent
                                currentPlan={(subscription as SubscriptionData)?.plan?.toLowerCase() as 'starter'}
                                isTrial={(subscription as SubscriptionData)?.status === 'trialing'}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function EditUserDialog() {
    const { data, isPending, error } = useSession();
    const [name, setName] = useState<string>('');
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const convertImageToBase64 = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="gap-2">
                    <Edit size={16} />
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your profile information and settings.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder={data?.user.name || 'Enter your name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image">Profile Picture</Label>
                        <div className="flex items-center gap-4">
                            {imagePreview && (
                                <div className="relative h-16 w-16 overflow-hidden rounded-sm border border-canvas-border">
                                    <Image 
                                        src={imagePreview} 
                                        alt="Profile preview" 
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 flex items-center gap-2">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="flex-1"
                                />
                                {imagePreview && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            setImage(null);
                                            setImagePreview(null);
                                        }}
                                    >
                                        <X size={16} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        disabled={isLoading}
                        isLoading={isLoading}
                        onClick={async () => {
                            setIsLoading(true);
                            await client.updateUser({
                                image: image ? await convertImageToBase64(image) : undefined,
                                name: name || undefined,
                                fetchOptions: {
                                    onSuccess: () => {
                                        toast.success('Profile updated successfully');
                                        setOpen(false);
                                        router.refresh();
                                    },
                                    onError: (error) => {
                                        toast.error(error.error.message);
                                    }
                                }
                            });
                            setName('');
                            setImage(null);
                            setImagePreview(null);
                            setIsLoading(false);
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 