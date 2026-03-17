const ChartWrapper = ({ title, subtitle, children, className = '' }) => {
    return (
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
};

export default ChartWrapper;
