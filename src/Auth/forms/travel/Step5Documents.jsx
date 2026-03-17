import React from 'react';
import FileUpload from '../../components/FileUpload';
import Input from '../../components/Input';

const Step5Documents = ({ data, errors, onChange }) => {
    const isIndividual = data.operatorType === 'individual';

    // File handling
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            onChange({
                target: {
                    name: 'documents',
                    value: {
                        ...data.documents,
                        [name]: files[0] // just saving the file object
                    },
                    type: 'nested'
                }
            });
        }
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        onChange({
            target: {
                name: 'documents',
                value: {
                    ...data.documents,
                    [name]: value
                },
                type: 'nested'
            }
        });
    };

    if (isIndividual) {
        return (
            <div className="animate-fadeIn">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Identity Verification</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Please upload valid identification documents to secure your profile. Acceptable formats: JPG, PNG, PDF.
                    </p>
                </div>

                <div className="space-y-6">
                    <FileUpload
                        label="CNIC / National ID (Front Image)"
                        name="cnicFront"
                        error={errors.documents?.cnicFront}
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        required
                    />
                    
                    <FileUpload
                        label="CNIC / National ID (Back Image)"
                        name="cnicBack"
                        error={errors.documents?.cnicBack}
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        required
                    />

                    <div className="pt-4 border-t border-slate-100">
                        <div className="mb-3">
                            <span className="text-sm font-semibold text-slate-800">Passport (Optional)</span>
                            <p className="text-xs text-slate-500">Helps in faster verification</p>
                        </div>
                        <FileUpload
                            name="passport"
                            error={errors.documents?.passport}
                            onChange={handleFileChange}
                            accept="image/*,.pdf"
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Agency Verification Documents
    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Agency Verification</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Please upload your official company documents for verification. Acceptable formats: JPG, PNG, PDF.
                </p>
            </div>

            <div className="space-y-6">
                <FileUpload
                    label="Business Registration Certificate"
                    name="registrationCertificate"
                    error={errors.documents?.registrationCertificate}
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    required
                />

                <Input
                    label="NTN Number"
                    name="ntnNumber"
                    value={data.documents.ntnNumber}
                    onChange={handleTextChange}
                    error={errors.documents?.ntnNumber}
                    placeholder="e.g. 1234567-8"
                />

                <FileUpload
                    label="NTN Certificate Image"
                    name="ntnCertificate"
                    error={errors.documents?.ntnCertificate}
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    required
                />

                <FileUpload
                    label="Owner CNIC / Passport"
                    name="ownerId"
                    error={errors.documents?.ownerId}
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    required
                />

                <div className="pt-4 border-t border-slate-100">
                    <div className="mb-3">
                        <span className="text-sm font-semibold text-slate-800">Office Address Proof (Optional)</span>
                        <p className="text-xs text-slate-500">e.g. Utility bill, lease agreement</p>
                    </div>
                    <FileUpload
                        name="addressProof"
                        error={errors.documents?.addressProof}
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                    />
                </div>
            </div>
        </div>
    );
};

export default Step5Documents;
