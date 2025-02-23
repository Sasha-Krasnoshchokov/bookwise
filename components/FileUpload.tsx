'use client';
import React, { useRef, useState } from 'react';

import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next';

import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

const MAX_IMAGE_SIZE_MB = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE_MB = 50 * 1024 * 1024;
const authenticator = async () => {
	try {
		const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
		if (!res.ok) {
			throw new Error(`Request failed with status ${res.status}: ${res.statusText}.`);
		}
		const data = await res.json();
		return data;
		//@ts-ignore
	} catch (error: any) {
		throw new Error(`Authentication failed: ${error.message}.`);
	}
};

interface FileUploadProps {
	type?: 'image' | 'video';
	accept?: string;
	placeholder?: string;
	folder?: string;
	variant?: 'dark' | 'light';
	onFileChange: (filePath: string) => void;
}

const FileUpload = ({
	type = 'image',
	accept = 'image/*',
	placeholder,
	folder,
	variant = 'dark',
	onFileChange,
}: FileUploadProps) => {
	const ikUploadRef = useRef(null);

	const [file, setFile] = useState<{ filePath: string } | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);

	const styles = {
		button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border-gray-100 border',
		placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
		text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
	};
	//@ts-ignore
	const onError = (error: any) => {
		setUploading(false);
		console.error(error);
		toast({
			title: `${type} upload failed`,
			description: `Your ${type} could not be uploaded. Please try again.`,
			variant: 'destructive',
		});
	};
	//@ts-ignore
	const onSuccess = (result: any) => {
		setUploading(false);
		setFile(result);
		onFileChange(result.filePath);
		toast({
			title: `${type} uploaded successfully`,
			description: `${result.filePath} uploaded successfully!`,
			variant: 'success',
		});
	};
	const handleSelectFile = () => {
		setUploading(true);
	};
	//@ts-ignore
	const handleUpload = async (e) => {
		e.preventDefault();

		if (!ikUploadRef.current) return;
		setFile(null);
		setProgress(0);
		//@ts-ignore
		ikUploadRef.current.click();
	};

	const validateFileSize = (file: File) => {
		const isToBigFile =
			(type === 'image' && file.size > MAX_IMAGE_SIZE_MB) ||
			(type === 'video' && file.size > MAX_VIDEO_SIZE_MB);

		if (isToBigFile) {
			toast({
				title: `File size to large`,
				description: `Please upload a file that is less then ${type === 'image' ? MAX_IMAGE_SIZE_MB : MAX_VIDEO_SIZE_MB}MB in size.`,
				variant: 'destructive',
			});
			return false;
		}
		return true;
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
				useUniqueFileName
				validateFile={validateFileSize}
				onUploadStart={() => setProgress(0)}
				onUploadProgress={({ loaded, total }) => {
					const percent = Math.round((loaded / total) * 100);
					setProgress(percent);
				}}
				folder={folder}
				accept={accept}
			/>
			<button
				className={`relative upload-btn ${styles.button} px-2 flex flex-wrap gap-1`}
				onClick={handleUpload}>
				<Image
					src='/icons/upload.svg'
					alt='upload icon'
					width={20}
					height={20}
					className='object-contain'
				/>

				<p className={`text-base ${styles.placeholder}`}>{placeholder}</p>

				{uploading && <span className='text-xs text-light-200'>Uploading...</span>}

				{file && <p className={`upload-filename ${styles.text}`}>{file.filePath}</p>}

				{progress > 0 && !file && (
					<div className='absolute bottom-[-6px] left-0 right-0 rounded-ful'>
						<div
							className='progress'
							style={{ width: `${progress}%` }}>
							{progress}%
						</div>
					</div>
				)}
			</button>
			{file &&
				(type === 'image' ? (
					<IKImage
						path={file.filePath ?? ''}
						alt='uploaded image or placeholder'
						//@ts-ignore
						width={file.width}
						//@ts-ignore
						height={file.height}
						className='object-cover rounded-xl mx-auto'
					/>
				) : (
					<IKVideo
						path={file.filePath ?? ''}
						controls
						className='w-full h-full'
					/>
				))}
		</ImageKitProvider>
	);
};

export default FileUpload;
