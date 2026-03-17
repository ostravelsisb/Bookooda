import React from 'react';
import { Search, Filter, ChevronRight, AlertTriangle } from 'lucide-react';

// ── Status Badge ──
export const StatusBadge = ({ status }) => {
    const map = {
        pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Pending' },
        under_review: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Under Review' },
        approved: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'Approved' },
        rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'Rejected' },
        active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Active' },
        inactive: { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400', label: 'Inactive' },
        suspended: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'Suspended' },
        unverified: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400', label: 'Unverified' },
        booked: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Booked' },
        available: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'Available' },
    };
    const s = map[status] || { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400', label: status };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
            {s.label}
        </span>
    );
};

// ── Stat Card ──
export const StatCard = ({ label, value, icon: Icon, gradient, subtitle }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 group">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </div>
);

// ── Search & Filter Bar ──
export const SearchFilterBar = ({ searchQuery, onSearch, filters = [], children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/30">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full sm:w-64 bg-white"
            />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
            {filters.map((filter) => (
                <select
                    key={filter.key}
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                    className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                >
                    {filter.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ))}
            {children}
        </div>
    </div>
);

// ── Data Table ──
export const DataTable = ({ columns, data, onRowClick, emptyMessage = 'No data found' }) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
                <tr className="bg-gray-50/80">
                    {columns.map((col) => (
                        <th key={col.key} className={`${col.align === 'right' ? 'text-right' : 'text-left'} px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider`}>
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="px-6 py-16 text-center">
                            <AlertTriangle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">{emptyMessage}</p>
                        </td>
                    </tr>
                ) : (
                    data.map((row, i) => (
                        <tr
                            key={row.id || i}
                            className={`hover:bg-blue-50/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                            onClick={() => onRowClick?.(row)}
                        >
                            {columns.map((col) => (
                                <td key={col.key} className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

// ── Page Header ──
export const PageHeader = ({ title, subtitle, icon: Icon, gradient, actions }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            {Icon && (
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${gradient || 'from-blue-500 to-indigo-600'} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            )}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
);

// ── Card Wrapper ──
export const AdminCard = ({ title, subtitle, icon: Icon, children, className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
        {title && (
            <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    {Icon && <Icon className="w-5 h-5 text-blue-500" />}
                    {title}
                </h3>
                {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
        )}
        {children}
    </div>
);

// ── Quick Action Button ──
export const QuickAction = ({ label, icon: Icon, onClick, color = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
        green: 'bg-green-50 text-green-700 hover:bg-green-100',
        amber: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
        red: 'bg-red-50 text-red-700 hover:bg-red-100',
        purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    };
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${colors[color]}`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
};
