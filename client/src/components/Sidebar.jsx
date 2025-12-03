import React from 'react';

const Sidebar = ({ currentView, onNavigate }) => {
    return (
        <aside className="hidden md:flex flex-col w-20 lg:w-64 h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-black/5 dark:border-white/5 z-50 transition-colors duration-300">
            <div className="p-6 flex items-center justify-center lg:justify-start border-b border-black/5 dark:border-white/5">
                <div className="w-8 h-8 bg-black/5 dark:bg-white/10 rounded-lg flex items-center justify-center border border-black/10 dark:border-white/10">
                    <span className="text-slate-900 dark:text-white font-bold text-xl">W</span>
                </div>
                <span className="ml-3 font-bold text-xl text-slate-900 dark:text-white hidden lg:block tracking-tight">Weather<span className="font-bold">Bun</span></span>
            </div>

            <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
                <NavItem
                    icon="🏠"
                    label="Dashboard"
                    active={currentView === 'dashboard'}
                    onClick={() => onNavigate('dashboard')}
                />
                <NavItem
                    icon="⭐"
                    label="Favorites"
                    active={currentView === 'favorites'}
                    onClick={() => onNavigate('favorites')}
                />
                <NavItem
                    icon="📊"
                    label="Analytics"
                    active={currentView === 'analytics'}
                    onClick={() => onNavigate('analytics')}
                />
                <NavItem
                    icon="🗺️"
                    label="Map View"
                    active={currentView === 'map'}
                    onClick={() => onNavigate('map')}
                />
                <NavItem
                    icon="⚙️"
                    label="Settings"
                    active={currentView === 'settings'}
                    onClick={() => onNavigate('settings')}
                />
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">US</div>
                    <div className="hidden lg:block">
                        <p className="text-sm font-medium">User Profile</p>
                        <p className="text-xs text-slate-400">Pro Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const NavItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all duration-300 group ${active ? 'bg-blue-500/10 dark:bg-white/10 text-blue-600 dark:text-white shadow-lg border border-blue-500/20 dark:border-white/10' : 'text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200'}`}
    >
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
        <span className="font-medium hidden lg:block text-sm tracking-wide">{label}</span>
    </button>
);

export default Sidebar;
