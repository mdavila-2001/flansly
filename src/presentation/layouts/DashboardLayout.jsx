import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/features/Sidebar';

export const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-flansly-dark flex flex-col md:flex-row">
            <Sidebar />

            <div className="flex-1 pl-0 md:pl-70 flex flex-col min-w-0">
                <main className="w-full max-w-300 mx-auto px-6 py-6 pt-20 md:px-10 md:py-8 md:pt-8 font-['Inter']">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};