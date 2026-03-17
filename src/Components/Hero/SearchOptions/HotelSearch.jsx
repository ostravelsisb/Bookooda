import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import SearchSelect from '../common/SearchSelect';
import SearchButton from '../common/SearchButton';
import { MapPin, Calendar, Users, Hotel, Search } from 'lucide-react';

const HotelSearch = () => {
    const [formData, setFormData] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    });

    const guestOptions = [
        { value: '1', label: '1 Guest' },
        { value: '2', label: '2 Guests' },
        { value: '3', label: '3 Guests' },
        { value: '4', label: '4 Guests' },
        { value: '5+', label: '5+ Guests' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSearch = () => {
        console.log('Searching hotels with:', formData);
    };

    return (
        <div className="space-y-5">
            <SearchInput
                label="Destination"
                id="destination"
                placeholder="City, hotel, or landmark"
                value={formData.destination}
                onChange={handleChange}
                icon={<MapPin size={20} />}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchInput
                    label="Check-in Date"
                    id="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchInput
                    label="Check-out Date"
                    id="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchSelect
                    label="Guests"
                    id="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    options={guestOptions}
                    placeholder="Select guests"
                    icon={<Users size={20} />}
                />
            </div>

            <SearchButton onClick={handleSearch} icon={<Search size={20} />}>
                Search Hotels
            </SearchButton>
        </div>
    );
};

export default HotelSearch;
