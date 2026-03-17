import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'No data found', message = 'There are no items to display right now.', icon: Icon = Inbox }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Icon size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 max-w-sm">{message}</p>
        </div>
    );
};

export default EmptyState;
