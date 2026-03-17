import { completedCases } from '../../data/mockData';
import { Star, CheckCircle } from 'lucide-react';

const CompletedCases = () => {
    const totalRevenue = completedCases.reduce((s, c) => s + c.amount, 0);
    const avgRating = (completedCases.reduce((s, c) => s + c.rating, 0) / completedCases.length).toFixed(1);

    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Completed Cases</h1>
                <p className="text-sm text-gray-500 mt-0.5">History of completed client services</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CheckCircle size={22} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Cases</p>
                        <p className="text-xl font-bold text-gray-900">{completedCases.length}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Star size={22} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Avg Rating</p>
                        <p className="text-xl font-bold text-gray-900">{avgRating} / 5</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <span className="text-lg font-bold">₨</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-xl font-bold text-gray-900">PKR {totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                {['Case ID', 'Client', 'Service', 'Completed', 'Amount', 'Rating'].map((h) => (
                                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {completedCases.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{c.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs">
                                                {c.client.charAt(0)}
                                            </div>
                                            <span className="text-gray-800">{c.client}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{c.service}</td>
                                    <td className="px-6 py-4 text-gray-600">{c.completedDate}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">PKR {c.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < c.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}
                                                />
                                            ))}
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

export default CompletedCases;
