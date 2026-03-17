import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import SearchSelect from '../common/SearchSelect';
import SearchButton from '../common/SearchButton';
import { MapPin, Calendar, Clock, Car, Search } from 'lucide-react';

const CarSearch = () => {
    const [formData, setFormData] = useState({
        pickup: '',
        dropoff: '',
        pickupDate: '',
        dropoffDate: '',
        carType: ''
    });

    const carTypes = [
        { value: 'economy', label: 'Economy' },
        { value: 'suv', label: 'SUV' },
        { value: 'luxury', label: 'Luxury' },
        { value: 'van', label: 'Van / Minibus' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSearch = () => {
        console.log('Searching cars with:', formData);
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchInput
                    label="Pick-up Location"
                    id="pickup"
                    placeholder="City, airport, or station"
                    value={formData.pickup}
                    onChange={handleChange}
                    icon={<MapPin size={20} />}
                />

                <SearchInput
                    label="Drop-off Location"
                    id="dropoff"
                    placeholder="Same as pick-up"
                    value={formData.dropoff}
                    onChange={handleChange}
                    icon={<MapPin size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchInput
                    label="Pick-up Date"
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchInput
                    label="Drop-off Date"
                    id="dropoffDate"
                    type="date"
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    icon={<Calendar size={20} />}
                />

                <SearchSelect
                    label="Car Type"
                    id="carType"
                    value={formData.carType}
                    onChange={handleChange}
                    options={carTypes}
                    placeholder="Any Type"
                    icon={<Car size={20} />}
                />
            </div>

            <SearchButton onClick={handleSearch} icon={<Search size={20} />}>
                Find Your Car
            </SearchButton>
        </div>
    );
};

export default CarSearch;
