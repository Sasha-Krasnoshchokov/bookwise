'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { emailJsSender } from '@/emailjs';

const SendEmail = () => {
	const sendEmail = async () => {
		await emailJsSender({
			message: 'Hello',
			recipient: 'apqa.soft@gmail.com',
			subject: 'Welcome to the platform',
		});
	};
	return (
		<div>
			<Button onClick={sendEmail}>Send email</Button>
		</div>
	);
};

export default SendEmail;
