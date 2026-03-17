import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import SearchSelect from '../common/SearchSelect';
import SearchButton from '../common/SearchButton';
import { Globe, BookOpen, Calendar, ClipboardList, Zap, FileEdit } from 'lucide-react';

const VisaSearch = () => {
    const [formData, setFormData] = useState({
        country: '',
        nationality: '',
        travelDate: '',
        category: '',
        processing: ''
    });

    const countries = [
        { value: 'usa', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'canada', label: 'Canada' },
        { value: 'australia', label: 'Australia' },
        { value: 'uae', label: 'United Arab Emirates' },
        { value: 'saudi', label: 'Saudi Arabia' }
    ];

    const categories = [
        { value: 'tourist', label: 'Tourist / Visitor' },
        { value: 'business', label: 'Business' },
        { value: 'work', label: 'Work / Employment' },
        { value: 'study', label: 'Student' },
        { value: 'family', label: 'Family / Spouse' },
        { value: 'umrah', label: 'Umrah / Religious' }
    ];

    const processingSpeed = [
        { value: 'standard', label: 'Standard (10-15 days)' },
        { value: 'express', label: 'Express (5-7 days)' },
        { value: 'urgent', label: 'Urgent (2-3 days)' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleContinue = () => {
        console.log('Applying for visa with:', formData);
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchSelect
                    label="Country Applying For"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={countries}
                    placeholder="Select destination country"
                    icon={<Globe size={20} />}
                />

                <SearchSelect
                    label="Passport Nationality"
                    id="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    options={countries}
                    placeholder="Select your nationality"
                    icon={<BookOpen size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchInput
                    label="Travel Date"
                    id="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchSelect
                    label="Visa Category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={categories}
                    placeholder="Select category"
                    icon={<ClipboardList size={20} />}
                />

                <SearchSelect
                    label="Processing Speed"
                    id="processing"
                    value={formData.processing}
                    onChange={handleChange}
                    options={processingSpeed}
                    placeholder="Select speed"
                    icon={<Zap size={20} />}
                />
            </div>

            <SearchButton onClick={handleContinue} icon={<FileEdit size={20} />}>
                Continue Application
            </SearchButton>
        </div>
    );
};

export default VisaSearch;
