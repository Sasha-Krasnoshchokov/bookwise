'use client';
import React, { useRef, useState } from 'react';

import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';

import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

const authenticator = async () => {
	try {
		const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
		if (!res.ok) {
			throw new Error(`Request failed with status ${res.status}: ${res.statusText}.`);
		}
		const data = await res.json();
		return data;
	} catch (error: any) {
		throw new Error(`Authentication failed: ${error.message}.`);
	}
};

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
	const ikUploadRef = useRef(null);
	const [file, setFile] = useState<{ filePath: string } | null>(null);
	const [uploading, setUploading] = useState(false);

	const onError = (error: any) => {
		setUploading(false);
		console.error(error);
		toast({
			title: 'Image upload failed',
			description: 'Your image could not be uploaded. Please try again.',
			variant: 'destructive',
		});
	};
	const onSuccess = (result: any) => {
		setUploading(false);
		setFile(result);
		onFileChange(result.filePath);
		toast({
			title: 'Image uploaded successfully',
			description: `${result.filePath} uploaded successfully!`,
			variant: 'success',
		});
	};
	const handleSelectFile = () => {
		setUploading(true);
	};
	//@ts-ignore
	const handleUpload = (e) => {
		e.preventDefault();

		if (!ikUploadRef.current) return;
		//@ts-ignore
		ikUploadRef.current.click();
	};

	return (
		<ImageKitProvider
			publicKey={config.env.imagekit.publicKey}
			urlEndpoint={config.env.imagekit.urlEndpoint}
			authenticator={authenticator}>
			<IKUpload
				className='hidden'
				ref={ikUploadRef}
				onError={onError}
				onSuccess={onSuccess}
				onChange={handleSelectFile}
				fileName='test-upload.png'
			/>
			<button
				className='upload-btn'
				onClick={handleUpload}>
				<Image
					src='/icons/upload.svg'
					alt='upload icon'
					width={20}
					height={20}
					className='object-contain'
				/>

				<p className='text-base text-light-100'>Upload a File</p>

				{uploading && <span className='text-xs text-light-200'>Uploading...</span>}

				{file && <p className='upload-filename'>{file.filePath}</p>}
			</button>
			{file && (
				<IKImage
					path={file.filePath ?? ''}
					alt='uploaded image or placeholder'
					width={500}
					height={300}
				/>
			)}
		</ImageKitProvider>
	);
};

export default ImageUpload;
