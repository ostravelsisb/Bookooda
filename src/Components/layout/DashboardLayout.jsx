import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { Heart } from 'lucide-react';

const DashboardLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

            {/* Main content area */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}
            >
                <TopNavbar onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <Outlet />

                    {/* Dashboard Footer */}
                    <footer className="mt-10 pt-6 pb-4 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <span>© {new Date().getFullYear()}</span>
                                <span className="font-semibold text-gray-600">Bookooda</span>
                                <span>— Built with</span>
                                <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                                <span>in Pakistan</span>
                                <span className="ml-2 px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-500">v1.0.0</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link to="/support" className="hover:text-blue-600 transition-colors">Help Center</Link>
                                <span className="w-px h-3 bg-gray-200"></span>
                                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                                <span className="w-px h-3 bg-gray-200"></span>
                                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
