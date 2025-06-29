import * as React from "react";
import Head from "next/head";

interface BetterAuthInviteUserEmailProps {
	username?: string;
	invitedByUsername?: string;
	invitedByEmail?: string;
	teamName?: string;
	teamImage?: string;
	inviteLink?: string;
}

export const InviteUserEmail = ({
	username,
	invitedByUsername,
	invitedByEmail,
	teamName,
	teamImage,
	inviteLink,
}: BetterAuthInviteUserEmailProps) => {
	const previewText = `Join ${invitedByUsername} on BetterAuth`;
	
	return (
		<html>
			<Head>
				<title>Invitation to {teamName}</title>
			</Head>
			<body style={{ backgroundColor: 'white', margin: 'auto', fontFamily: 'sans-serif', padding: '8px' }}>
				<div style={{ border: '1px solid #eaeaea', borderRadius: '4px', margin: '40px auto', padding: '20px', maxWidth: '465px' }}>
					<h1 style={{ color: 'black', fontSize: '24px', fontWeight: 'normal', textAlign: 'center', padding: '0', margin: '30px 0' }}>
						Join <strong>{invitedByUsername}</strong> on{" "}
						<strong>Better Auth.</strong>
					</h1>
					<p style={{ color: 'black', fontSize: '14px', lineHeight: '24px' }}>
						Hello there,
					</p>
					<p style={{ color: 'black', fontSize: '14px', lineHeight: '24px' }}>
						<strong>{invitedByUsername}</strong> (
						<a
							href={`mailto:${invitedByEmail}`}
							style={{ color: '#2563eb', textDecoration: 'none' }}
						>
							{invitedByEmail}
						</a>
						) has invited you to the <strong>{teamName}</strong> team on{" "}
						<strong>Better Auth</strong>.
					</p>
					<div>
						{teamImage ? (
							<div>
								<div style={{ textAlign: 'left' }}>
									<img
										style={{ borderRadius: '50%' }}
										src={teamImage}
										width="64"
										height="64"
										alt="Team"
									/>
								</div>
							</div>
						) : null}
					</div>
					<div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
						<a
							style={{ backgroundColor: '#000000', borderRadius: '4px', color: 'white', fontSize: '12px', fontWeight: '600', textDecoration: 'none', textAlign: 'center', padding: '12px 20px', display: 'inline-block' }}
							href={inviteLink}
						>
							Join the team
						</a>
					</div>
					<p style={{ color: 'black', fontSize: '14px', lineHeight: '24px' }}>
						or copy and paste this URL into your browser:{" "}
						<a href={inviteLink} style={{ color: '#2563eb', textDecoration: 'none' }}>
							{inviteLink}
						</a>
					</p>
					<hr style={{ border: '1px solid #eaeaea', margin: '26px 0', width: '100%' }} />
					<p style={{ color: '#666666', fontSize: '12px', lineHeight: '24px' }}>
						This invitation was intended for{" "}
						<span style={{ color: 'black' }}>{username}</span>. If you were not
						expecting this invitation, you can ignore this email.
					</p>
				</div>
			</body>
		</html>
	);
};

export function reactInvitationEmail(props: BetterAuthInviteUserEmailProps) {
	console.log(props);

	return <InviteUserEmail {...props} />;
}
