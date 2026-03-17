import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminServiceListings, ADMIN_CATEGORY_CONFIG } from '../../data/adminData';
import { StatusBadge, StatCard, SearchFilterBar, DataTable, PageHeader, AdminCard, QuickAction } from '../../Components/admin/AdminComponents';
import {
    Users, Hotel, Car, Map, Moon, Plane, UserCircle, ChevronRight, Eye,
    TrendingUp, Package, DollarSign, Star, CheckCircle, XCircle, ArrowLeft,
    BarChart3, Ban, RefreshCw, Shield
} from 'lucide-react';

const ICON_MAP = {
    customer: Users,
    travel_agency: Plane,
    individual_agent: UserCircle,
    hotel_provider: Hotel,
    car_rental: Car,
    trip_provider: Map,
    umrah_provider: Moon,
};

const AdminCategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterValue, setFilterValue] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const config = ADMIN_CATEGORY_CONFIG[category];
    const listings = adminServiceListings[category] || [];
    const Icon = ICON_MAP[category] || Package;

    if (!config) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Category not found</p>
            </div>
        );
    }

    const isCustomer = category === 'customer';

    const filtered = useMemo(() => {
        return listings.filter(item => {
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const searchable = [item.name, item.email, item.owner, item.city].filter(Boolean).join(' ').toLowerCase();
                if (!searchable.includes(q)) return false;
            }
            if (filterValue !== 'all') {
                if (isCustomer) {
                    if (item.status !== filterValue) return false;
                } else {
                    if (item[config.filterField] !== filterValue) return false;
                }
            }
            if (!isCustomer && statusFilter !== 'all' && item.status !== statusFilter) return false;
            return true;
        });
    }, [listings, searchQuery, filterValue, statusFilter, category]);

    // Stats calculation
    const stats = useMemo(() => {
        if (isCustomer) {
            return {
                total: listings.length,
                active: listings.filter(l => l.status === 'active').length,
                totalBookings: listings.reduce((a, l) => a + (l.bookings || 0), 0),
                totalSpent: listings.reduce((a, l) => a + (l.spent || 0), 0),
            };
        }
        return {
            total: listings.length,
            active: listings.filter(l => l.status === 'active').length,
            totalBookings: listings.reduce((a, l) => a + (l.bookings || 0), 0),
            totalRevenue: listings.reduce((a, l) => a + (l.revenue || 0), 0),
            avgRating: (listings.reduce((a, l) => a + (l.rating || 0), 0) / listings.length).toFixed(1),
        };
    }, [listings, category]);

    const formatCurrency = (n) => `PKR ${(n / 1000).toFixed(0)}K`;
    const formatRevenue = (n) => n >= 1000000 ? `PKR ${(n / 1000000).toFixed(1)}M` : `PKR ${(n / 1000).toFixed(0)}K`;

    // Column definitions for data table
    const getColumns = () => {
        if (isCustomer) {
            return [
                {
                    key: 'name', label: 'Customer', render: (row) => (
                        <div>
                            <p className="text-sm font-medium text-gray-900">{row.name}</p>
                            <p className="text-xs text-gray-500">{row.email}</p>
                        </div>
                    )
                },
                { key: 'city', label: 'City', render: (row) => <span className="text-sm text-gray-600">{row.city}</span> },
                { key: 'joinDate', label: 'Joined', render: (row) => <span className="text-sm text-gray-500">{row.joinDate}</span> },
                { key: 'bookings', label: 'Bookings', render: (row) => <span className="text-sm font-semibold text-gray-900">{row.bookings}</span> },
                { key: 'spent', label: 'Total Spent', render: (row) => <span className="text-sm font-medium text-gray-900">{formatCurrency(row.spent)}</span> },
                { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
                {
                    key: 'actions', label: 'Actions', align: 'right', render: (row) => (
                        <div className="flex items-center gap-2 justify-end">
                            <button onClick={(e) => { e.stopPropagation(); setSelectedItem(row); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                            <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Ban className="w-4 h-4" /></button>
                        </div>
                    )
                },
            ];
        }
        return [
            {
                key: 'name', label: config.singularLabel, render: (row) => (
                    <div>
                        <p className="text-sm font-medium text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.owner}</p>
                    </div>
                )
            },
            { key: 'city', label: 'City', render: (row) => <span className="text-sm text-gray-600">{row.city}</span> },
            {
                key: 'type', label: 'Type', render: (row) => (
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${config.lightBg} ${config.textColor}`}>{row.type}</span>
                )
            },
            { key: 'price', label: 'Price', render: (row) => <span className="text-sm font-medium text-gray-900">{formatCurrency(row.price)}</span> },
            { key: 'bookings', label: 'Bookings', render: (row) => <span className="text-sm font-semibold text-gray-900">{row.bookings}</span> },
            { key: 'revenue', label: 'Revenue', render: (row) => <span className="text-sm font-medium text-emerald-700">{formatRevenue(row.revenue)}</span> },
            {
                key: 'rating', label: 'Rating', render: (row) => (
                    <span className="inline-flex items-center gap-1 text-sm">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-medium text-gray-900">{row.rating}</span>
                    </span>
                )
            },
            { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            {
                key: 'actions', label: 'Actions', align: 'right', render: (row) => (
                    <div className="flex items-center gap-1 justify-end">
                        <button onClick={(e) => { e.stopPropagation(); setSelectedItem(row); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details"><Eye className="w-4 h-4" /></button>
                        {row.status === 'active' ? (
                            <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Suspend"><Ban className="w-4 h-4" /></button>
                        ) : (
                            <button className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Reactivate"><RefreshCw className="w-4 h-4" /></button>
                        )}
                    </div>
                )
            },
        ];
    };

    const filters = [
        {
            key: 'type',
            value: filterValue,
            onChange: setFilterValue,
            options: config.filterOptions,
        },
    ];

    if (!isCustomer) {
        filters.push({
            key: 'status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'suspended', label: 'Suspended' },
            ],
        });
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/dashboard/admin')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
                <PageHeader
                    title={config.label}
                    subtitle={config.description}
                    icon={Icon}
                    gradient={config.gradient}
                />
            </div>

            {/* Stats Row */}
            <div className={`grid grid-cols-2 ${isCustomer ? 'md:grid-cols-4' : 'md:grid-cols-5'} gap-4`}>
                <StatCard label={`Total ${config.label}`} value={stats.total} icon={Icon} gradient={config.gradient} />
                <StatCard label="Active" value={stats.active} icon={CheckCircle} gradient="from-green-500 to-emerald-500" />
                <StatCard label="Total Bookings" value={stats.totalBookings.toLocaleString()} icon={BarChart3} gradient="from-blue-500 to-indigo-500" />
                {isCustomer ? (
                    <StatCard label="Total Spent" value={formatRevenue(stats.totalSpent)} icon={DollarSign} gradient="from-cyan-500 to-blue-500" />
                ) : (
                    <>
                        <StatCard label="Total Revenue" value={formatRevenue(stats.totalRevenue)} icon={DollarSign} gradient="from-cyan-500 to-blue-500" />
                        <StatCard label="Avg Rating" value={stats.avgRating} icon={Star} gradient="from-amber-500 to-orange-500" />
                    </>
                )}
            </div>

            {/* Data Table */}
            <AdminCard title={`All ${config.label}`} subtitle={`${filtered.length} ${filtered.length === 1 ? 'record' : 'records'} found`} icon={Icon}>
                <SearchFilterBar searchQuery={searchQuery} onSearch={setSearchQuery} filters={filters} />
                <DataTable columns={getColumns()} data={filtered} emptyMessage={`No ${config.label.toLowerCase()} found`} />
            </AdminCard>

            {/* Detail Side Panel - Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-end p-4" onClick={() => setSelectedItem(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slideIn" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className={`bg-gradient-to-r ${config.gradient} p-6 text-white`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-medium">{selectedItem.id}</span>
                                <button onClick={() => setSelectedItem(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold">{selectedItem.name}</h3>
                            <p className="text-white/80 text-sm mt-1">{isCustomer ? selectedItem.email : selectedItem.owner}</p>
                        </div>

                        {/* Details */}
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(selectedItem)
                                    .filter(([key]) => !['id'].includes(key))
                                    .map(([key, value]) => (
                                        <div key={key} className="bg-gray-50 rounded-xl p-3">
                                            <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                            <p className="text-sm font-medium text-gray-900 mt-0.5">
                                                {key === 'revenue' || key === 'spent' || key === 'price'
                                                    ? `PKR ${Number(value).toLocaleString()}`
                                                    : key === 'status'
                                                        ? <StatusBadge status={value} />
                                                        : String(value)}
                                            </p>
                                        </div>
                                    ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                {selectedItem.status === 'active' ? (
                                    <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors">
                                        <Ban className="w-4 h-4" /> Suspend
                                    </button>
                                ) : (
                                    <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 font-medium rounded-xl hover:bg-green-100 transition-colors">
                                        <RefreshCw className="w-4 h-4" /> Reactivate
                                    </button>
                                )}
                                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors">
                                    <Shield className="w-4 h-4" /> View Full Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategoryPage;
