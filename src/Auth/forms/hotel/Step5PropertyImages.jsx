import React, { useRef, useState } from 'react';

const MAX_IMAGES = 15;
const MIN_IMAGES = 3;

const Step5PropertyImages = ({ data, errors, onChange }) => {
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const images = data.images || [];

    const addImages = (files) => {
        const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
        const remaining = MAX_IMAGES - images.length;
        const toAdd = fileArray.slice(0, remaining);

        if (toAdd.length > 0) {
            // Create preview URLs alongside file objects
            const newImages = toAdd.map(file => ({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
            }));
            const updated = [...images, ...newImages];
            onChange({ target: { name: 'images', value: updated } });
        }
    };

    const removeImage = (index) => {
        const removed = images[index];
        if (removed.preview) {
            URL.revokeObjectURL(removed.preview);
        }
        const updated = images.filter((_, i) => i !== index);
        onChange({ target: { name: 'images', value: updated } });
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
        if (e.dataTransfer.files) {
            addImages(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        if (e.target.files) {
            addImages(e.target.files);
        }
    };

    return (
        <div className="w-full animate-fadeIn">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Property Images</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Upload photos of your property ({MIN_IMAGES}–{MAX_IMAGES} images required)
                </p>
            </div>

            {/* Upload area */}
            {images.length < MAX_IMAGES && (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center w-full px-4 py-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200
                        ${dragActive
                            ? 'border-blue-500 bg-blue-50'
                            : errors.images
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'
                        }`}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="hidden"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 mb-3 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-600">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG, WEBP up to 10MB each
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {images.length} of {MAX_IMAGES} images uploaded
                    </p>
                </div>
            )}

            {/* Image previews grid */}
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative group rounded-xl overflow-hidden aspect-square bg-slate-100 border border-slate-200"
                        >
                            <img
                                src={img.preview}
                                alt={img.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Remove overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 w-8 h-8 bg-white/90 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center text-slate-700 shadow-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {/* Image number badge */}
                            <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Status messages */}
            {images.length > 0 && images.length < MIN_IMAGES && (
                <p className="mt-3 text-xs text-amber-600 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    Please upload at least {MIN_IMAGES} images ({MIN_IMAGES - images.length} more needed)
                </p>
            )}

            {errors.images && (
                <p className="mt-3 text-xs text-red-500">{errors.images}</p>
            )}
        </div>
    );
};

export default Step5PropertyImages;
