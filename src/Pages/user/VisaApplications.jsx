import StatusBadge from '../../Components/dashboard/StatusBadge';
import DataTable from '../../Components/dashboard/DataTable';
import { visaApplications } from '../../data/mockData';
import { Globe, Clock } from 'lucide-react';

const VisaApplications = () => {
    const columns = [
        {
            header: 'Application',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Globe size={16} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">{row.country}</p>
                        <p className="text-xs text-gray-500">{row.id}</p>
                    </div>
                </div>
            ),
        },
        { header: 'Visa Type', accessor: 'type' },
        { header: 'Applied', accessor: 'appliedDate' },
        {
            header: 'Processing',
            render: (row) => (
                <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={14} /> {row.processingTime}
                </span>
            ),
        },
        { header: 'Agent', accessor: 'agent' },
        {
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
        },
    ];

    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Visa Applications</h1>
                <p className="text-sm text-gray-500 mt-0.5">Track your visa application progress</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: visaApplications.length, bg: 'bg-blue-50 text-blue-700' },
                    { label: 'Approved', value: visaApplications.filter((v) => v.status === 'Approved').length, bg: 'bg-emerald-50 text-emerald-700' },
                    { label: 'In Progress', value: visaApplications.filter((v) => v.status === 'In Progress').length, bg: 'bg-amber-50 text-amber-700' },
                    { label: 'Rejected', value: visaApplications.filter((v) => v.status === 'Rejected').length, bg: 'bg-red-50 text-red-700' },
                ].map((s, i) => (
                    <div key={i} className={`rounded-xl px-4 py-3 ${s.bg}`}>
                        <p className="text-2xl font-bold">{s.value}</p>
                        <p className="text-xs font-medium opacity-80">{s.label}</p>
                    </div>
                ))}
            </div>

            <DataTable columns={columns} data={visaApplications} />
        </div>
    );
};

export default VisaApplications;
