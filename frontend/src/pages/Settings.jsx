import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleSave = () => {
    toast.success('Settings updated successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-secondary">Manage your account preferences and system settings</p>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-all border border-danger/20"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-accent/10 text-accent border border-accent/20' 
                  : 'text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="glass-card p-8 min-h-[500px] flex flex-col">
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User size={20} className="text-accent" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-secondary ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                        <input 
                          type="text" 
                          defaultValue={user?.name}
                          className="input-field w-full pl-10" 
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-secondary ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                        <input 
                          type="email" 
                          defaultValue={user?.email}
                          className="input-field w-full pl-10" 
                          placeholder="Your email"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h2 className="text-xl font-semibold text-white mb-6">Profile Picture</h2>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent text-3xl font-bold border-2 border-accent/50 shadow-lg shadow-accent/10">
                      {user?.name?.[0]}
                    </div>
                    <div>
                      <button className="btn-secondary text-sm mb-2">Change Avatar</button>
                      <p className="text-xs text-secondary">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Shield size={20} className="text-accent" />
                  Security Settings
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent">
                        <Lock size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-white">Change Password</p>
                        <p className="text-xs text-secondary">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button className="text-accent hover:underline text-sm font-medium">Update</button>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-review font-medium">Recommended</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-white/10 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-secondary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Bell size={20} className="text-accent" />
                  Email Notifications
                </h2>
                <div className="space-y-4">
                  {[
                    'Project updates',
                    'Task assignments',
                    'Direct messages',
                    'System alerts'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-secondary">{item}</span>
                      <div className="w-10 h-6 bg-accent/20 rounded-full relative cursor-pointer border border-accent/30">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-accent rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Palette size={20} className="text-accent" />
                  Customization
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border-2 border-accent bg-background space-y-2 cursor-pointer">
                    <div className="h-20 bg-card rounded-lg border border-white/10" />
                    <p className="text-center text-sm font-medium text-white">Dark Mode</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2 opacity-50 cursor-not-allowed">
                    <div className="h-20 bg-white rounded-lg border border-black/10" />
                    <p className="text-center text-sm font-medium text-secondary">Light Mode</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 flex justify-end">
              <button 
                onClick={handleSave}
                className="btn-primary flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
