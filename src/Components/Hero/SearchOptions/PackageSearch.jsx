import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import SearchSelect from '../common/SearchSelect';
import SearchButton from '../common/SearchButton';
import { Package, MapPin, Calendar, Users, Compass } from 'lucide-react';

const PackageSearch = () => {
    const [formData, setFormData] = useState({
        packageType: '',
        destination: '',
        travelDate: '',
        travelers: ''
    });

    const packageTypes = [
        { value: 'umrah', label: 'Umrah Package' },
        { value: 'tour', label: 'Tour Package' },
        { value: 'honeymoon', label: 'Honeymoon Package' },
        { value: 'adventure', label: 'Adventure Package' },
        { value: 'family', label: 'Family Package' },
        { value: 'corporate', label: 'Corporate Travel' }
    ];

    const travelerOptions = [
        { value: '1', label: '1 Traveler' },
        { value: '2', label: '2 Travelers' },
        { value: '3-5', label: '3-5 Travelers' },
        { value: '6-10', label: '6-10 Travelers' },
        { value: '10+', label: '10+ Travelers' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSearch = () => {
        console.log('Searching packages with:', formData);
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchSelect
                    label="Package Type"
                    id="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    options={packageTypes}
                    placeholder="Select package type"
                    icon={<Package size={20} />}
                />

                <SearchInput
                    label="Destination"
                    id="destination"
                    placeholder="Where do you want to go?"
                    value={formData.destination}
                    onChange={handleChange}
                    icon={<MapPin size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchInput
                    label="Travel Date"
                    id="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchSelect
                    label="Number of Travelers"
                    id="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    options={travelerOptions}
                    placeholder="Select travelers"
                    icon={<Users size={20} />}
                />
            </div>

            <SearchButton onClick={handleSearch} icon={<Compass size={20} />}>
                Explore Packages
            </SearchButton>
        </div>
    );
};

export default PackageSearch;
