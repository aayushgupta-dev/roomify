import React, { useState } from 'react'
import { useOutletContext } from "react-router";
import { Upload as UploadIcon, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { PROGRESS_STEP, PROGRESS_INTERVAL_MS, REDIRECT_DELAY_MS } from '../lib/constants';

interface UploadProps {
    onComplete?: (file: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);

    const { isSignedIn } = useOutletContext<AuthContext>();

    const processFile = (file: File) => {
        if (!isSignedIn) return;

        setFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;

            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            onComplete?.(result);
                        }, REDIRECT_DELAY_MS);
                        return 100;
                    }
                    return prev + PROGRESS_STEP;
                });
            }, PROGRESS_INTERVAL_MS);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSignedIn) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (!isSignedIn) return;

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;

        const files = e.target.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

    return (
        <div className="upload">
            {!file ? (
                <div
                    className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="drop-input"
                        accept=".jpg,.jpeg,.png"
                        disabled={!isSignedIn}
                        onChange={handleChange}
                    />

                    <div className="drop-content">
                        <div className="drop-icon">
                            <UploadIcon size={20} />
                        </div>
                        <p>
                            {isSignedIn ? (
                                "Click to upload or just drag and drop"
                            ) : ("Sign in or sign up with Puter to upload")}
                        </p>
                        <p className="help">Maximum file size 50 MB.</p>
                    </div>
                </div>
            ) : (
                <div className="upload-status">
                    <div className="status-content">
                        <div className="status-icon">
                            {progress === 100 ? (
                                <CheckCircle2 className='check' />
                            ) : (
                                <ImageIcon className='image' />
                            )}
                        </div>
                        <h3>{file?.name}</h3>
                        <div className="progress">
                            <div className="bar" style={{ width: `${progress}%` }} />
                            <p className="status-text">{progress < 100 ? 'Analyzing floor plan...' : 'Redirecting...'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Upload