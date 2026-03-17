import StatusBadge from '../../Components/dashboard/StatusBadge';
import DataTable from '../../Components/dashboard/DataTable';
import { paymentHistory } from '../../data/mockData';
import { CreditCard, Wallet, TrendingUp } from 'lucide-react';

const PaymentHistory = () => {
    const totalPaid = paymentHistory.filter((p) => p.status === 'Completed').reduce((s, p) => s + p.amount, 0);
    const totalPending = paymentHistory.filter((p) => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);

    const columns = [
        { header: 'Payment ID', accessor: 'id' },
        { header: 'Booking', accessor: 'bookingId' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Amount',
            render: (row) => <span className="font-semibold text-gray-900">PKR {row.amount.toLocaleString()}</span>,
        },
        { header: 'Method', accessor: 'method' },
        {
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
        },
    ];

    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Payment History</h1>
                <p className="text-sm text-gray-500 mt-0.5">View all your transactions</p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Wallet size={22} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Paid</p>
                        <p className="text-xl font-bold text-gray-900">PKR {totalPaid.toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                        <CreditCard size={22} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-xl font-bold text-gray-900">PKR {totalPending.toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <TrendingUp size={22} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Transactions</p>
                        <p className="text-xl font-bold text-gray-900">{paymentHistory.length}</p>
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={paymentHistory} />
        </div>
    );
};

export default PaymentHistory;
