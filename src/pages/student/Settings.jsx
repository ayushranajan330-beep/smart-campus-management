import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Moon, Shield, Globe, HelpCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const sections = [
    {
      title: 'Appearance',
      icon: Moon,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      settings: [
        { 
          label: 'Dark Mode', 
          description: 'Adjust the theme for better visibility at night',
          type: 'toggle',
          value: isDarkMode,
          action: toggleTheme
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      settings: [
        { label: 'Push Notifications', description: 'Get real-time updates for complaints', type: 'toggle', value: true },
        { label: 'Email Alerts', description: 'Receive status updates via email', type: 'toggle', value: true }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      settings: [
        { label: 'Profile Visibility', description: 'Show your room details to other students', type: 'toggle', value: false },
        { label: 'Two-Factor Auth', description: 'Add an extra layer of security', type: 'link' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      <header>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
          <div className="p-3 bg-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <SettingsIcon size={32} />
          </div>
          Account Settings
        </h1>
        <p className="text-slate-400 mt-2 ml-16 font-medium">Manage your campus experience and preferences</p>
      </header>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 ${section.bg} ${section.color} rounded-2xl`}>
                  <section.icon size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
              </div>

              <div className="space-y-6">
                {section.settings.map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between group">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100">{setting.label}</h3>
                      <p className="text-sm text-slate-400">{setting.description}</p>
                    </div>

                    {setting.type === 'toggle' ? (
                      <button 
                        onClick={setting.action}
                        className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
                        setting.value ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                          setting.value ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    ) : (
                      <button className="text-indigo-600 font-bold text-sm hover:underline">
                        Configure
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-indigo-600 rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-indigo-600/20">
            <div className="flex items-center gap-4">
              <Globe size={24} />
              <div>
                <p className="font-bold">Language</p>
                <p className="text-indigo-100 text-sm">English (US)</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-800 rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-slate-800/20">
            <div className="flex items-center gap-4">
              <HelpCircle size={24} />
              <div>
                <p className="font-bold">Help & Support</p>
                <p className="text-slate-400 text-sm">Contact Administration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
