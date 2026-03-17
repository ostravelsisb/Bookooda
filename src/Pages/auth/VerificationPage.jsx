import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { VERIFICATION_CONFIGS, ROLES_REQUIRING_VERIFICATION, ROLE_LABELS } from '../../data/verificationConfig';
import VerificationStatus from '../../Components/dashboard/VerificationStatus';
import { Upload, Send, ArrowLeft, CheckCircle, AlertCircle, FileText, Image } from 'lucide-react';

const VerificationPage = () => {
    const { user, verificationStatus, submitVerification, getMyVerification } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [myVerification, setMyVerification] = useState(null);

    const config = user ? VERIFICATION_CONFIGS[user.role] : null;

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }
        // Customer auto-approved
        if (user.role === 'customer' || user.role === 'user') {
            navigate('/dashboard/user');
            return;
        }
        // Admin goes to admin dashboard
        if (user.role === 'admin') {
            navigate('/dashboard/admin');
            return;
        }
        // If already approved, go to dashboard
        if (verificationStatus === 'approved') {
            navigate('/dashboard/agent');
            return;
        }

        // Load existing verification data
        const existing = getMyVerification();
        if (existing) {
            setMyVerification(existing);
            if (existing.verificationData) {
                setFormData(existing.verificationData);
            }
        }
    }, [user, verificationStatus]);

    // If pending or under_review, show status page
    if (verificationStatus === 'pending' || verificationStatus === 'under_review') {
        return <VerificationStatus verification={myVerification} />;
    }

    // If rejected, show status first with option to resubmit
    if (verificationStatus === 'rejected' && myVerification && !showSuccess) {
        return (
            <VerificationStatus
                verification={myVerification}
                onResubmit={() => {
                    // Allow editing the form again
                    setFormData(myVerification.verificationData || {});
                }}
            />
        );
    }

    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900">No verification required</h2>
                    <p className="text-gray-500 mt-2">Your role does not require verification.</p>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (e, fieldName) => {
        const files = Array.from(e.target.files);
        setUploadedFiles(prev => ({ ...prev, [fieldName]: files }));
    };

    const validate = () => {
        const newErrors = {};
        config.fields.forEach(field => {
            if (field.required && !formData[field.name]?.trim()) {
                newErrors[field.name] = `${field.label} is required`;
            }
        });
        config.uploads.forEach(upload => {
            if (upload.required && !uploadedFiles[upload.name]?.length) {
                newErrors[upload.name] = `${upload.label} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            const docNames = Object.entries(uploadedFiles)
                .filter(([, files]) => files.length > 0)
                .map(([key]) => {
                    const uploadConfig = config.uploads.find(u => u.name === key);
                    return uploadConfig?.label || key;
                });

            const result = submitVerification(formData, docNames);
            setIsSubmitting(false);
            if (result.success) {
                setShowSuccess(true);
                const existing = getMyVerification();
                setMyVerification(existing);
            }
        }, 1200);
    };

    if (showSuccess || verificationStatus === 'pending') {
        return <VerificationStatus verification={myVerification || getMyVerification()} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/auth')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Complete Verification</h1>
                            <p className="text-sm text-gray-500">Step 2 of 2 — Business Details</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
                        <span>{config.icon}</span>
                        {ROLE_LABELS[user?.role] || user?.role}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 py-3">
                        <div className="flex-1 h-1.5 rounded-full bg-blue-500"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 pb-3">
                        <span className="text-blue-600 font-medium flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Account Created
                        </span>
                        <span className="text-blue-600 font-medium">Business Verification</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Info Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0 backdrop-blur-sm">
                            {config.icon}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{config.title}</h2>
                            <p className="text-blue-100 mt-1 text-sm">{config.subtitle}</p>
                            <p className="text-blue-200 mt-3 text-xs flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                Your information will be reviewed by our admin team within 2-6 hours
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Business Details Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Business Details
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">Fill in your business information accurately</p>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {config.fields.map((field) => (
                                <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            rows={4}
                                            className={`w-full px-4 py-3 border rounded-xl text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none ${errors[field.name] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-xl text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white ${errors[field.name] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <option value="">Select {field.label}</option>
                                            {field.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className={`w-full px-4 py-3 border rounded-xl text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none ${errors[field.name] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                        />
                                    )}
                                    {errors[field.name] && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Documents Upload Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-blue-500" />
                                Documents Upload
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">Upload required documents for verification</p>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {config.uploads.map((upload) => (
                                <div key={upload.name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        {upload.label}
                                        {upload.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    <div className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer ${errors[upload.name] ? 'border-red-300 bg-red-50/30' : uploadedFiles[upload.name]?.length ? 'border-green-300 bg-green-50/30' : 'border-gray-200'}`}>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, upload.name)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            multiple={upload.name === 'hotelImages' || upload.name === 'vehicleRegistration'}
                                        />
                                        {uploadedFiles[upload.name]?.length ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                <span className="text-sm text-green-700 font-medium">
                                                    {uploadedFiles[upload.name].length} file(s) selected
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1.5">
                                                <Image className="w-6 h-6 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                    Click to upload
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {errors[upload.name] && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors[upload.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div>
                            <p className="text-sm text-gray-700 font-medium">Ready to submit?</p>
                            <p className="text-xs text-gray-500 mt-0.5">Our team will review your application within 2-6 hours</p>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit for Verification
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerificationPage;
