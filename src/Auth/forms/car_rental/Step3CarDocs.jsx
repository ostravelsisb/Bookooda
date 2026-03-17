import React from 'react';
import FileUpload from '../../components/FileUpload';

const Step3CarDocs = ({ car, errors, onFileChange }) => {
    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Car Documents</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Upload official documents to verify your vehicle.
                </p>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">01</span>
                        Legal Verification
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FileUpload
                            label="Vehicle Registration Papers"
                            id="registrationPaper"
                            accept=".pdf,image/*"
                            value={car.documents.registrationPaper}
                            onChange={(file) => onFileChange('registrationPaper', file)}
                            error={errors.registrationPaper}
                        />
                        <FileUpload
                            label="Car Ownership Certificate"
                            id="ownershipCertificate"
                            accept=".pdf,image/*"
                            value={car.documents.ownershipCertificate}
                            onChange={(file) => onFileChange('ownershipCertificate', file)}
                            error={errors.ownershipCertificate}
                        />
                        <FileUpload
                            label="Car Insurance (Optional)"
                            id="insurance"
                            accept=".pdf,image/*"
                            value={car.documents.insurance}
                            onChange={(file) => onFileChange('insurance', file)}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">02</span>
                        Vehicle Photos
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FileUpload
                            label="Front View"
                            id="imgFront"
                            accept="image/*"
                            value={car.documents.images?.front}
                            onChange={(file) => onFileChange('imgFront', file)}
                            error={errors.imgFront}
                        />
                        <FileUpload
                            label="Back View"
                            id="imgBack"
                            accept="image/*"
                            value={car.documents.images?.back}
                            onChange={(file) => onFileChange('imgBack', file)}
                            error={errors.imgBack}
                        />
                        <FileUpload
                            label="Interior View"
                            id="imgInterior"
                            accept="image/*"
                            value={car.documents.images?.interior}
                            onChange={(file) => onFileChange('imgInterior', file)}
                            error={errors.imgInterior}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3CarDocs;
