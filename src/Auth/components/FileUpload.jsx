import React, { useRef, useState } from 'react';

const FileUpload = ({
    label,
    id,
    name,
    onChange,
    error,
    required = false,
    accept = 'image/*,.pdf,.doc,.docx',
    multiple = false,
    className = '',
    hint = 'Click to upload or drag and drop'
}) => {
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFiles = (files) => {
        if (files && files.length > 0) {
            const names = Array.from(files).map(f => f.name).join(', ');
            setFileName(names);
            if (onChange) {
                onChange({ target: { name, files, value: files } });
            }
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e) => {
        handleFiles(e.target.files);
    };

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center w-full px-4 py-5 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
                    ${dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : error
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
            >
                <input
                    ref={inputRef}
                    id={id}
                    name={name}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                    className="hidden"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 mb-2 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                {fileName ? (
                    <p className="text-sm text-blue-600 font-medium truncate max-w-full">{fileName}</p>
                ) : (
                    <>
                        <p className="text-sm text-gray-500">{hint}</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC, JPG, PNG up to 10MB</p>
                    </>
                )}
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default FileUpload;
