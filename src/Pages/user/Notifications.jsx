import { userNotifications } from '../../data/mockData';
import { CheckCircle, AlertTriangle, Info, XCircle, Bell } from 'lucide-react';

const typeConfig = {
    success: { icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    warning: { icon: AlertTriangle, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    info: { icon: Info, bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    error: { icon: XCircle, bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
};

const Notifications = () => {
    const unreadCount = userNotifications.filter((n) => !n.read).length;

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{unreadCount} unread notifications</p>
                </div>
                <button className="px-4 py-2 rounded-xl text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
                    Mark all as read
                </button>
            </div>

            <div className="space-y-3">
                {userNotifications.map((n) => {
                    const config = typeConfig[n.type] || typeConfig.info;
                    const Icon = config.icon;

                    return (
                        <div
                            key={n.id}
                            className={`bg-white rounded-2xl border shadow-sm p-4 flex items-start gap-4 transition-all hover:shadow-md ${!n.read ? `${config.border} ring-1 ring-blue-100/50` : 'border-gray-100'}`}
                        >
                            <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center ${config.text} shrink-0`}>
                                <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-sm font-semibold ${!n.read ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</h3>
                                    {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                                </div>
                                <p className="text-sm text-gray-600 mt-0.5">{n.message}</p>
                                <p className="text-xs text-gray-400 mt-1.5">{n.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Notifications;
