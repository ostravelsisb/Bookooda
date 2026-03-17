import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import SearchSelect from '../common/SearchSelect';
import SearchButton from '../common/SearchButton';
import { ShieldCheck, Globe, Calendar, Users, Search } from 'lucide-react';

const InsuranceSearch = () => {
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        travelers: '',
        planType: ''
    });

    const plans = [
        { value: 'basic', label: 'Basic Coverage' },
        { value: 'standard', label: 'Standard Coverage' },
        { value: 'premium', label: 'Premium / Full Coverage' },
        { value: 'medical', label: 'Medical Only' }
    ];

    const travelerOptions = [
        { value: '1', label: '1 Person' },
        { value: '2', label: '2 People' },
        { value: 'family', label: 'Family Pack' },
        { value: 'group', label: 'Group (10+)' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSearch = () => {
        console.log('Searching insurance with:', formData);
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchInput
                    label="Where are you going?"
                    id="destination"
                    placeholder="Enter country or region"
                    value={formData.destination}
                    onChange={handleChange}
                    icon={<Globe size={20} />}
                />

                <SearchSelect
                    label="Plan Type"
                    id="planType"
                    value={formData.planType}
                    onChange={handleChange}
                    options={plans}
                    placeholder="Select Plan"
                    icon={<ShieldCheck size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchInput
                    label="Start Date"
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchInput
                    label="End Date"
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchSelect
                    label="Travelers"
                    id="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    options={travelerOptions}
                    placeholder="Select travelers"
                    icon={<Users size={20} />}
                />
            </div>

            <SearchButton onClick={handleSearch} icon={<Search size={20} />}>
                Get Insurance Quote
            </SearchButton>
        </div>
    );
};

export default InsuranceSearch;
