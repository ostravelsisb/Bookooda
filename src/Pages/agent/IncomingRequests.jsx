import StatusBadge from '../../Components/dashboard/StatusBadge';
import { incomingRequests } from '../../data/mockData';
import { Check, X, Eye, Inbox } from 'lucide-react';

const IncomingRequests = () => {
    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Incoming Requests</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Manage new client requests</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold">
                        {incomingRequests.filter((r) => r.status === 'New').length} New
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 text-xs font-semibold">
                        {incomingRequests.filter((r) => r.status === 'Pending').length} Pending
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                {['Client Name', 'Service Type', 'Date', 'Budget', 'Status', 'Actions'].map((h) => (
                                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {incomingRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-800">{req.client}</p>
                                            <p className="text-xs text-gray-500">{req.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">{req.service}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{req.date}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{req.budget}</td>
                                    <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors">
                                                <Check size={14} /> Accept
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors">
                                                <X size={14} /> Reject
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                                                <Eye size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default IncomingRequests;
