import { savedAgents } from '../../data/mockData';
import { Star, MapPin, BadgeCheck, Phone, Mail } from 'lucide-react';

const SavedAgents = () => {
    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Saved Agents</h1>
                <p className="text-sm text-gray-500 mt-0.5">Your favourite travel agents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {savedAgents.map((agent) => (
                    <div key={agent.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 group">
                        {/* Avatar + info */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                {agent.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-base font-semibold text-gray-900 truncate">{agent.name}</h3>
                                    {agent.verified && <BadgeCheck size={16} className="text-blue-500 shrink-0" />}
                                </div>
                                <p className="text-sm text-gray-500">{agent.speciality}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={14} className="text-amber-500 fill-amber-500" />
                                    <span className="text-sm font-semibold text-gray-800">{agent.rating}</span>
                                    <span className="text-xs text-gray-500">({agent.reviews} reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
                            <MapPin size={14} /> {agent.location}
                        </div>

                        {/* Services */}
                        <div className="flex flex-wrap gap-2 mb-5">
                            {agent.services.map((s, i) => (
                                <span key={i} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2">
                            <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                                <Phone size={14} /> Contact
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                                <Mail size={14} /> Message
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedAgents;
