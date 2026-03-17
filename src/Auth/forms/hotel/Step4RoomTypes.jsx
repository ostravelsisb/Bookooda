import React from 'react';
import Input from '../../components/Input';

const Step4RoomTypes = ({ data, errors, onChange }) => {
    const roomTypes = data.roomTypes || [];

    const updateRoomTypes = (updated) => {
        onChange({ target: { name: 'roomTypes', value: updated } });
    };

    const addRoomType = () => {
        updateRoomTypes([...roomTypes, { name: '', rooms: '', pricePerNight: '' }]);
    };

    const removeRoomType = (index) => {
        updateRoomTypes(roomTypes.filter((_, i) => i !== index));
    };

    const handleRoomChange = (index, field, value) => {
        const updated = roomTypes.map((room, i) =>
            i === index ? { ...room, [field]: value } : room
        );
        updateRoomTypes(updated);
    };

    return (
        <div className="w-full animate-fadeIn">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Room Types</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Define the room categories available at your property
                </p>
            </div>

            <div className="space-y-4">
                {roomTypes.map((room, index) => (
                    <div
                        key={index}
                        className="relative p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all duration-200"
                    >
                        {/* Room number badge */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                </span>
                                Room Type
                            </span>
                            {roomTypes.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeRoomType(index)}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Input
                                label="Room Type Name"
                                id={`room-name-${index}`}
                                name={`roomName-${index}`}
                                placeholder="e.g. Deluxe Room, Standard Suite"
                                value={room.name}
                                onChange={(e) => handleRoomChange(index, 'name', e.target.value)}
                                error={errors[`roomName-${index}`]}
                                required
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Number of Rooms"
                                    id={`room-count-${index}`}
                                    name={`roomCount-${index}`}
                                    type="number"
                                    placeholder="10"
                                    value={room.rooms}
                                    onChange={(e) => handleRoomChange(index, 'rooms', e.target.value)}
                                    error={errors[`roomCount-${index}`]}
                                    required
                                />
                                <Input
                                    label="Price Per Night (PKR)"
                                    id={`room-price-${index}`}
                                    name={`roomPrice-${index}`}
                                    type="number"
                                    placeholder="5000"
                                    value={room.pricePerNight}
                                    onChange={(e) => handleRoomChange(index, 'pricePerNight', e.target.value)}
                                    error={errors[`roomPrice-${index}`]}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add room type button */}
                <button
                    type="button"
                    onClick={addRoomType}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-sm font-semibold text-slate-600 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Room Type
                </button>
            </div>

            {errors.roomTypes && (
                <p className="mt-3 text-xs text-red-500">{errors.roomTypes}</p>
            )}
        </div>
    );
};

export default Step4RoomTypes;
