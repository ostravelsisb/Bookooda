import React from 'react';
import FileUpload from '../../components/FileUpload';

const Step4DriverVerification = ({ data, errors, onFileChange }) => {
    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Driver Verification</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Your personal verification documents for safety and policy compliance.
                </p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload
                        label="Driving License (Front)"
                        id="licenseFront"
                        accept="image/*"
                        value={data.driverDocuments.licenseFront}
                        onChange={(file) => onFileChange('licenseFront', file)}
                        error={errors.licenseFront}
                    />
                    <FileUpload
                        label="Driving License (Back)"
                        id="licenseBack"
                        accept="image/*"
                        value={data.driverDocuments.licenseBack}
                        onChange={(file) => onFileChange('licenseBack', file)}
                        error={errors.licenseBack}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload
                        label="CNIC / National ID"
                        id="cnic"
                        accept="image/*,.pdf"
                        value={data.driverDocuments.cnic}
                        onChange={(file) => onFileChange('cnic', file)}
                        error={errors.cnic}
                    />
                    <FileUpload
                        label="Passport (Optional)"
                        id="passport"
                        accept="image/*,.pdf"
                        value={data.driverDocuments.passport}
                        onChange={(file) => onFileChange('passport', file)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Step4DriverVerification;
