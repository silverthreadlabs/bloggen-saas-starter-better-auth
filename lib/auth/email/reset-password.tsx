import Head from "next/head";
import * as React from "react";

interface BetterAuthResetPasswordEmailProps {
	username?: string;
	resetLink?: string;
}

export const ResetPasswordEmail = ({
	username,
	resetLink,
}: BetterAuthResetPasswordEmailProps) => {
	const previewText = `Reset your Better Auth password`;

	return (
		<html>
			<Head>
				<title>Reset your Better Auth password</title>
			</Head>
			<body style={{ backgroundColor: 'white', margin: 'auto', fontFamily: 'sans-serif', padding: '8px' }}>
				<div style={{ border: '1px solid #eaeaea', borderRadius: '4px', margin: '40px auto', padding: '20px', maxWidth: '465px' }}>
					<h1 style={{ color: 'black', fontSize: '24px', fontWeight: 'normal', textAlign: 'center', padding: '0', margin: '30px 0' }}>
						Reset your <strong>Better Auth</strong> password
					</h1>
					<p style={{ color: 'black', fontSize: '14px', lineHeight: '24px' }}>
						Hello {username},
					</p>
					<p style={{ color: 'black', fontSize: '14px', lineHeight: '24px' }}>
						We received a request to reset your password for your Better Auth
						account. If you didn't make this request, you can safely ignore
						this email.
					</p>
					<div style={{ textAlign: 'center', margin: '32px 0' }}>
						<a
							style={{ backgroundColor: '#000000', borderRadius: '4px', color: 'white', fontSize: '12px', fontWeight: '600', textDecoration: 'none', textAlign: 'center', padding: '12px 20px', display: 'inline-block' }}
							href={resetLink}
						>
							Reset Password
						</a>
					</div>
					<p style={{ color: 'black', fontSize: '14px', lineHeight: '24px' }}>
						Or copy and paste this URL into your browser:{" "}
						<a href={resetLink} style={{ color: '#2563eb', textDecoration: 'none' }}>
							{resetLink}
						</a>
					</p>
					<hr style={{ border: '1px solid #eaeaea', margin: '26px 0', width: '100%' }} />
					<p style={{ color: '#666666', fontSize: '12px', lineHeight: '24px' }}>
						If you didn't request a password reset, please ignore this email
						or contact support if you have concerns.
					</p>
				</div>
			</body>
		</html>
	);
};

export function reactResetPasswordEmail(
	props: BetterAuthResetPasswordEmailProps,
) {
	console.log(props);
	
	return <ResetPasswordEmail {...props} />;
}
