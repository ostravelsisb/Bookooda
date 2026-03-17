import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import SearchSelect from '../common/SearchSelect';
import SearchButton from '../common/SearchButton';
import { MapPin, FileText, CircleDollarSign, Building, Star, Search, Calendar, Users } from 'lucide-react';

const AgentSearch = () => {
    const [formData, setFormData] = useState({
        destination: '',
        visaType: '',
        budget: '',
        city: '',
        rating: '',
        travelDate: '',
        travelers: '1'
    });

    const visaTypes = [
        { value: 'tourist', label: 'Tourist Visa' },
        { value: 'work', label: 'Work Visa' },
        { value: 'study', label: 'Study Visa' },
        { value: 'umrah', label: 'Umrah Visa' }
    ];

    const travelerOptions = [
        { value: '1', label: '1 Traveler' },
        { value: '2', label: '2 Travelers' },
        { value: '3-5', label: '3-5 Travelers' },
        { value: '5+', label: '5+ Travelers' }
    ];

    const budgetRanges = [
        { value: '0-500', label: '$0 - $500' },
        { value: '500-1000', label: '$500 - $1,000' },
        { value: '1000-2000', label: '$1,000 - $2,000' },
        { value: '2000+', label: '$2,000+' }
    ];

    const ratings = [
        { value: '5', label: '5 Stars' },
        { value: '4', label: '4+ Stars' },
        { value: '3', label: '3+ Stars' },
        { value: 'any', label: 'Any Rating' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSearch = () => {
        console.log('Searching agents with:', formData);
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchInput
                    label="Destination / Country"
                    id="destination"
                    placeholder="e.g., USA, Canada"
                    value={formData.destination}
                    onChange={handleChange}
                    icon={<MapPin size={20} />}
                />

                <SearchSelect
                    label="Visa Type"
                    id="visaType"
                    value={formData.visaType}
                    onChange={handleChange}
                    options={visaTypes}
                    placeholder="Select visa type"
                    icon={<FileText size={20} />}
                />

                <SearchInput
                    label="Travel Date"
                    id="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SearchSelect
                    label="Budget Range"
                    id="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    options={budgetRanges}
                    placeholder="Select budget"
                    icon={<CircleDollarSign size={20} />}
                />

                <SearchInput
                    label="Preferred City"
                    id="city"
                    placeholder="e.g., New York"
                    value={formData.city}
                    onChange={handleChange}
                    icon={<Building size={20} />}
                />

                <SearchSelect
                    label="Travelers"
                    id="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    options={travelerOptions}
                    placeholder="Travelers"
                    icon={<Users size={20} />}
                />

                <SearchSelect
                    label="Rating Filter"
                    id="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    options={ratings}
                    placeholder="Select rating"
                    icon={<Star size={20} />}
                />
            </div>

            <SearchButton onClick={handleSearch} icon={<Search size={20} />}>
                Find Trusted Agents
            </SearchButton>
        </div>
    );
};

export default AgentSearch;
