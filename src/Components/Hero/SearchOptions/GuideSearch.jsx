import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import SearchSelect from '../common/SearchSelect';
import SearchButton from '../common/SearchButton';
import { Compass, MapPin, Calendar, Languages, Search } from 'lucide-react';

const GuideSearch = () => {
    const [formData, setFormData] = useState({
        location: '',
        date: '',
        language: '',
        specialization: ''
    });

    const languages = [
        { value: 'english', label: 'English' },
        { value: 'arabic', label: 'Arabic' },
        { value: 'french', label: 'French' },
        { value: 'spanish', label: 'Spanish' },
        { value: 'urdu', label: 'Urdu / Hindi' }
    ];

    const specializations = [
        { value: 'history', label: 'History & Culture' },
        { value: 'food', label: 'Food & Local Cuisine' },
        { value: 'adventure', label: 'Adventure & Hiking' },
        { value: 'shopping', label: 'Shopping & Markets' },
        { value: 'religious', label: 'Religious Tours' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSearch = () => {
        console.log('Searching guides with:', formData);
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchInput
                    label="Tour Location"
                    id="location"
                    placeholder="Enter city or landmark"
                    value={formData.location}
                    onChange={handleChange}
                    icon={<MapPin size={20} />}
                />

                <SearchInput
                    label="Tour Date"
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchSelect
                    label="Language"
                    id="language"
                    value={formData.language}
                    onChange={handleChange}
                    options={languages}
                    placeholder="Preferred Language"
                    icon={<Languages size={20} />}
                />

                <SearchSelect
                    label="Specialization"
                    id="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    options={specializations}
                    placeholder="What are you interested in?"
                    icon={<Compass size={20} />}
                />
            </div>

            <SearchButton onClick={handleSearch} icon={<Search size={20} />}>
                Find Local Guides
            </SearchButton>
        </div>
    );
};

export default GuideSearch;
