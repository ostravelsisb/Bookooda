const statusConfig = {
    Approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Paid: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    New: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    'In Progress': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Processing: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    'Almost Done': { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    'Documents Pending': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    Rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    Refunded: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
};

const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {status}
        </span>
    );
};

export default StatusBadge;
