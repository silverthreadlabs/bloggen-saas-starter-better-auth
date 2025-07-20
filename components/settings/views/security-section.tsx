'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import CopyButton from '@/components/ui/copy-button';
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
import { PasswordInput } from '@/components/ui/password-input';
import { client, signOut, useSession } from '@/lib/auth/auth-client';
import { Session } from '@/lib/auth/auth-types';
import { MobileIcon } from '@radix-ui/react-icons';

import {
    Key,
    Laptop,
    Loader2,
    LogOut,
    Monitor,
    QrCode,
    Shield,
    ShieldCheck,
    ShieldOff,
    Smartphone,
    StopCircle
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import { UAParser } from 'ua-parser-js';

interface SecuritySectionProps {
    session: Session | null;
    activeSessions: Session['session'][];
}

export default function SecuritySection({ session, activeSessions: initialActiveSessions }: SecuritySectionProps) {
    const router = useRouter();
    const { data } = useSession();
    const currentSession = data || session;
    const [activeSessions, setActiveSessions] = useState(initialActiveSessions);
    const [isTerminating, setIsTerminating] = useState<string>();
    const [isSignOut, setIsSignOut] = useState<boolean>(false);

    const removeActiveSession = (id: string) =>
        setActiveSessions(activeSessions.filter((session) => session.id !== id));

    return (
        <div className='space-y-6'>
            {/* Page Header */}
            <div className='border-canvas-border border-b pb-6'>
                <h1 className='text-canvas-text-contrast text-2xl font-semibold'>Security</h1>
                <p className='text-canvas-text mt-1'>
                    Manage your account security, sessions, and authentication settings
                </p>
            </div>

            {/* Active Sessions */}
            <Card className='border-canvas-border bg-canvas-bg'>
                <CardHeader className='border-canvas-border bg-canvas-bg-subtle border-b'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-primary-bg flex h-10 w-10 items-center justify-center rounded-sm'>
                            <Monitor className='text-primary-solid h-5 w-5' />
                        </div>
                        <div>
                            <CardTitle className='text-canvas-text-contrast'>Active Sessions</CardTitle>
                            <p className='text-canvas-text text-sm'>Manage your active login sessions across devices</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='p-6'>
                    <div className='space-y-4'>
                        {activeSessions
                            .filter((session) => session.userAgent)
                            .map((session) => {
                                const ua = new UAParser(session.userAgent || '');
                                const device = ua.getDevice();
                                const os = ua.getOS();
                                const browser = ua.getBrowser();
                                const isCurrentSession = session.id === currentSession?.session.id;

                                return (
                                    <div
                                        key={session.id}
                                        className={`flex items-center justify-between rounded-sm border p-4 ${
                                            isCurrentSession
                                                ? 'border-primary-border bg-canvas-bg-subtle/40'
                                                : 'border-canvas-border bg-canvas-bg-subtle'
                                        }`}>
                                        <div className='flex items-center gap-4'>
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-sm ${
                                                    isCurrentSession ? 'bg-primary-solid' : 'bg-canvas-bg-active'
                                                }`}>
                                                {device.type === 'mobile' ? (
                                                    <Smartphone
                                                        className={`h-6 w-6 ${
                                                            isCurrentSession
                                                                ? 'text-primary-on-primary'
                                                                : 'text-canvas-text'
                                                        }`}
                                                    />
                                                ) : (
                                                    <Laptop
                                                        className={`h-6 w-6 ${
                                                            isCurrentSession
                                                                ? 'text-primary-on-primary'
                                                                : 'text-canvas-text'
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                            <div className='space-y-1'>
                                                <div className='flex items-center gap-2'>
                                                    <p className='text-canvas-text-contrast font-medium'>
                                                        {os.name} • {browser.name}
                                                    </p>
                                                </div>
                                                <p className='text-canvas-text text-sm'>
                                                    {device.type === 'mobile' ? 'Mobile Device' : 'Desktop'} •{' '}
                                                    {session.ipAddress || 'Unknown IP'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'>
                                            {isCurrentSession && (
                                                <Badge variant="outline" className='bg-success-bg text-success-text border-success-border'>
                                                    Current
                                                </Badge>
                                            )}
                                            <Button
                                                size='sm'
                                                variant={isCurrentSession ? 'solid' : 'outline'}
                                                // className={
                                                //     isCurrentSession
                                                //         ? 'bg-alert-solid text-alert-on-solid hover:bg-alert-solid-hover'
                                                //         : 'border-alert-border text-alert-text hover:bg-alert-bg'
                                                // }
                                                disabled={isTerminating === session.id}
                                                onClick={async () => {
                                                    setIsTerminating(session.id);
                                                    const res = await client.revokeSession({
                                                        token: session.token
                                                    });

                                                    if (res.error) {
                                                        toast.error(res.error.message);
                                                    } else {
                                                        toast.success('Session terminated successfully');
                                                        removeActiveSession(session.id);
                                                    }
                                                    if (isCurrentSession) router.refresh();
                                                    setIsTerminating(undefined);
                                                }}>
                                                {isTerminating === session.id ? (
                                                    <Loader2 size={16} className='animate-spin' />
                                                ) : isCurrentSession ? (
                                                    'Sign Out'
                                                ) : (
                                                    'Terminate'
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </CardContent>
            </Card>

            {/* Two Factor Authentication */}
            <Card className='border-canvas-border bg-canvas-bg'>
                <CardHeader className='border-canvas-border bg-canvas-bg-subtle border-b'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-primary-bg flex h-10 w-10 items-center justify-center rounded-sm'>
                            <Shield className='text-primary-solid h-5 w-5' />
                        </div>
                        <div>
                            <CardTitle className='text-canvas-text-contrast'>Two-Factor Authentication</CardTitle>
                            <p className='text-canvas-text text-sm'>Add an extra layer of security to your account</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='p-6'>
                    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
                        <div className='flex items-center gap-3'>
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-sm ${
                                    currentSession?.user.twoFactorEnabled ? 'bg-success-bg' : 'bg-warning-bg'
                                }`}>
                                {currentSession?.user.twoFactorEnabled ? (
                                    <ShieldCheck className='text-success-text h-6 w-6' />
                                ) : (
                                    <ShieldOff className='text-warning-text h-6 w-6' />
                                )}
                            </div>
                            <div>
                                <p className='text-canvas-text-contrast font-medium'>
                                    {currentSession?.user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                </p>
                                <p className='text-canvas-text text-sm'>
                                    {currentSession?.user.twoFactorEnabled
                                        ? 'Your account is protected with 2FA'
                                        : 'Enable 2FA to secure your account'}
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            {currentSession?.user.twoFactorEnabled && <TwoFactorQRDialog />}
                            <TwoFactorToggleDialog />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card className='border-canvas-border bg-canvas-bg'>
                <CardHeader className='border-canvas-border bg-canvas-bg-subtle border-b'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-primary-bg flex h-10 w-10 items-center justify-center rounded-sm'>
                            <Key className='text-primary-solid h-5 w-5' />
                        </div>
                        <div>
                            <CardTitle className='text-canvas-text-contrast'>Password</CardTitle>
                            <p className='text-canvas-text text-sm'>Change your account password</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-canvas-text-contrast font-medium'>Password</p>
                            <p className='text-canvas-text text-sm'>Last changed: Never</p>
                        </div>
                        <ChangePasswordDialog />
                    </div>
                </CardContent>
            </Card>

            {/* Sign Out */}
            <Card className='border-canvas-border bg-canvas-bg'>
                <CardContent className='p-6'>
                    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
                        <div>
                            <h3 className='text-canvas-text-contrast font-medium'>Sign Out</h3>
                            <p className='text-canvas-text text-sm'>Sign out of your account on this device</p>
                        </div>
                        {currentSession?.session.impersonatedBy ? (
                            <Button
                                variant='outline'
                                className='border-alert-border text-alert-text hover:bg-alert-bg gap-2'
                                onClick={async () => {
                                    setIsSignOut(true);
                                    await client.admin.stopImpersonating();
                                    setIsSignOut(false);
                                    toast.info('Impersonation stopped successfully');
                                    router.push('/admin');
                                }}
                                disabled={isSignOut}
                                isLoading={isSignOut}>
                                <StopCircle size={16} />
                                Stop Impersonation
                            </Button>
                        ) : (
                            <Button
                                variant='outline'
                                // className='border-alert-border text-alert-text hover:bg-alert-bg gap-2'
                                onClick={async () => {
                                    setIsSignOut(true);
                                    await signOut({
                                        fetchOptions: {
                                            onSuccess() {
                                                router.refresh();
                                            }
                                        }
                                    });
                                    setIsSignOut(false);
                                }}
                                disabled={isSignOut}
                                isLoading={isSignOut}>
                                <LogOut size={16} />
                                Sign Out
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function TwoFactorQRDialog() {
    const [twoFaPassword, setTwoFaPassword] = useState<string>('');
    const [twoFactorVerifyURI, setTwoFactorVerifyURI] = useState<string>('');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm' className='gap-2'>
                    <QrCode size={16} />
                    View QR Code
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Two-Factor Authentication QR Code</DialogTitle>
                    <DialogDescription>Scan this QR code with your authenticator app</DialogDescription>
                </DialogHeader>

                {twoFactorVerifyURI ? (
                    <div className='space-y-4'>
                        <div className='flex items-center justify-center rounded-sm bg-white p-4'>
                            <QRCode value={twoFactorVerifyURI} size={200} />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-canvas-text text-sm'>Copy URI to clipboard</p>
                            <CopyButton textToCopy={twoFactorVerifyURI} />
                        </div>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='password'>Enter your password to view QR code</Label>
                            <PasswordInput
                                id='password'
                                value={twoFaPassword}
                                onChange={(e) => setTwoFaPassword(e.target.value)}
                                placeholder='Enter your password'
                            />
                        </div>
                        <Button
                            onClick={async () => {
                                if (twoFaPassword.length < 8) {
                                    toast.error('Password must be at least 8 characters');
                                    
return;
                                }
                                await client.twoFactor.getTotpUri(
                                    { password: twoFaPassword },
                                    {
                                        onSuccess(context) {
                                            setTwoFactorVerifyURI(context.data.totpURI);
                                        },
                                        onError(context) {
                                            toast.error(context.error.message);
                                        }
                                    }
                                );
                                setTwoFaPassword('');
                            }}
                            className='w-full'>
                            Show QR Code
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

function TwoFactorToggleDialog() {
    const { data } = useSession();
    const [isPendingTwoFa, setIsPendingTwoFa] = useState<boolean>(false);
    const [twoFaPassword, setTwoFaPassword] = useState<string>('');
    const [twoFactorDialog, setTwoFactorDialog] = useState<boolean>(false);
    const [twoFactorVerifyURI, setTwoFactorVerifyURI] = useState<string>('');

    const isEnabled = data?.user.twoFactorEnabled;

    return (
        <Dialog open={twoFactorDialog} onOpenChange={setTwoFactorDialog}>
            <DialogTrigger asChild>
                <Button
                    variant={isEnabled ? 'outline' : 'solid'}
                    size='sm'
                    className={isEnabled ? 'border-alert-border text-alert-text hover:bg-alert-bg gap-2' : 'gap-2'}>
                    {isEnabled ? <ShieldOff size={16} /> : <ShieldCheck size={16} />}
                    {isEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>
                        {isEnabled ? 'Disable Two-Factor Authentication' : 'Enable Two-Factor Authentication'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEnabled
                            ? 'Disable two-factor authentication for your account'
                            : 'Add an extra layer of security to your account'}
                    </DialogDescription>
                </DialogHeader>

                <div className='space-y-4'>
                    {twoFactorVerifyURI ? (
                        <div className='space-y-4'>
                            <div className='flex items-center justify-center rounded-sm bg-white p-4'>
                                <QRCode value={twoFactorVerifyURI} size={200} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='otp'>Enter the 6-digit code from your authenticator app</Label>
                                <Input
                                    id='otp'
                                    value={twoFaPassword}
                                    onChange={(e) => setTwoFaPassword(e.target.value)}
                                    placeholder='123456'
                                    maxLength={6}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-2'>
                            <Label htmlFor='password'>Password</Label>
                            <PasswordInput
                                id='password'
                                placeholder='Enter your password'
                                value={twoFaPassword}
                                onChange={(e) => setTwoFaPassword(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        disabled={isPendingTwoFa || !twoFaPassword.trim()}
                        isLoading={isPendingTwoFa}
                        onClick={async () => {
                            if (twoFaPassword.length < 6 && !twoFactorVerifyURI) {
                                toast.error('Password must be at least 8 characters');
                                
return;
                            }
                            setIsPendingTwoFa(true);

                            if (isEnabled) {
                                await client.twoFactor.disable({
                                    password: twoFaPassword,
                                    fetchOptions: {
                                        onError(context) {
                                            toast.error(context.error.message);
                                        },
                                        onSuccess() {
                                            toast.success('2FA disabled successfully');
                                            setTwoFactorDialog(false);
                                        }
                                    }
                                });
                            } else {
                                if (twoFactorVerifyURI) {
                                    await client.twoFactor.verifyTotp({
                                        code: twoFaPassword,
                                        fetchOptions: {
                                            onError(context) {
                                                toast.error(context.error.message);
                                            },
                                            onSuccess() {
                                                toast.success('2FA enabled successfully');
                                                setTwoFactorVerifyURI('');
                                                setTwoFactorDialog(false);
                                            }
                                        }
                                    });
                                } else {
                                    await client.twoFactor.enable({
                                        password: twoFaPassword,
                                        fetchOptions: {
                                            onError(context) {
                                                toast.error(context.error.message);
                                            },
                                            onSuccess(ctx) {
                                                setTwoFactorVerifyURI(ctx.data.totpURI);
                                            }
                                        }
                                    });
                                }
                            }
                            setIsPendingTwoFa(false);
                            setTwoFaPassword('');
                        }}>
                        {isEnabled ? 'Disable 2FA' : twoFactorVerifyURI ? 'Verify & Enable' : 'Continue'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ChangePasswordDialog() {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [signOutDevices, setSignOutDevices] = useState<boolean>(false);

    const resetForm = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setSignOutDevices(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm' className='gap-2'>
                    <Key size={16} />
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>Enter your current password and choose a new one.</DialogDescription>
                </DialogHeader>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='current-password'>Current Password</Label>
                        <PasswordInput
                            id='current-password'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder='Enter current password'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='new-password'>New Password</Label>
                        <PasswordInput
                            id='new-password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='Enter new password'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='confirm-password'>Confirm New Password</Label>
                        <PasswordInput
                            id='confirm-password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm new password'
                        />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Checkbox
                            id='sign-out-devices'
                            checked={signOutDevices}
                            onCheckedChange={(checked) => setSignOutDevices(checked as boolean)}
                        />
                        <Label htmlFor='sign-out-devices' className='text-sm'>
                            Sign out from all other devices
                        </Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                        isLoading={loading}
                        onClick={async () => {
                            if (newPassword !== confirmPassword) {
                                toast.error('Passwords do not match');
                                
return;
                            }
                            if (newPassword.length < 8) {
                                toast.error('Password must be at least 8 characters');
                                
return;
                            }
                            setLoading(true);
                            const res = await client.changePassword({
                                newPassword: newPassword,
                                currentPassword: currentPassword,
                                revokeOtherSessions: signOutDevices
                            });
                            setLoading(false);
                            if (res.error) {
                                toast.error(res.error.message || 'Failed to change password');
                            } else {
                                setOpen(false);
                                toast.success('Password changed successfully');
                                resetForm();
                            }
                        }}>
                        Change Password
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
