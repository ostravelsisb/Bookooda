import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import SearchSelect from '../common/SearchSelect';
import SearchButton from '../common/SearchButton';
import { PlaneTakeoff, PlaneLanding, Calendar, Users, Search } from 'lucide-react';

const FlightSearch = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departure: '',
        return: '',
        passengers: ''
    });

    const passengerOptions = [
        { value: '1', label: '1 Passenger' },
        { value: '2', label: '2 Passengers' },
        { value: '3', label: '3 Passengers' },
        { value: '4', label: '4 Passengers' },
        { value: '5+', label: '5+ Passengers' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSearch = () => {
        console.log('Searching flights with:', formData);
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchInput
                    label="From"
                    id="from"
                    placeholder="Departure city or airport"
                    value={formData.from}
                    onChange={handleChange}
                    icon={<PlaneTakeoff size={20} />}
                />

                <SearchInput
                    label="To"
                    id="to"
                    placeholder="Arrival city or airport"
                    value={formData.to}
                    onChange={handleChange}
                    icon={<PlaneLanding size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchInput
                    label="Departure Date"
                    id="departure"
                    type="date"
                    value={formData.departure}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchInput
                    label="Return Date"
                    id="return"
                    type="date"
                    value={formData.return}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchSelect
                    label="Passengers"
                    id="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    options={passengerOptions}
                    placeholder="Select passengers"
                    icon={<Users size={20} />}
                />
            </div>

            <SearchButton onClick={handleSearch} icon={<Search size={20} />}>
                Search Flights
            </SearchButton>
        </div>
    );
};

export default FlightSearch;
