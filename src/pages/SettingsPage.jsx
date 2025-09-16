import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    email: 'user@hypeflow.ai',
    notifications: {
      priceAlerts: true,
      marketUpdates: true,
      portfolioChanges: true,
      aiInsights: true,
      weeklyReports: false
    },
    portfolio: {
      autoSync: true,
      syncInterval: 'daily',
      showAdvancedMetrics: true,
      defaultCurrency: 'USD'
    },
    appearance: {
      theme: 'dark',
      accentColor: 'cyan',
      fontSize: 'medium',
      animations: true
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      marketing: false
    }
  });

  const [activeTab, setActiveTab] = useState('account');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userSettings', JSON.stringify(settings));
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Failed to save settings');
      setTimeout(() => setSaveStatus(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'portfolio', name: 'Portfolio', icon: '💼' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' }
  ];

  const accentColors = [
    { id: 'cyan', name: 'Cyan', color: 'bg-cyan-400' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-400' },
    { id: 'green', name: 'Green', color: 'bg-green-400' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-400' },
    { id: 'pink', name: 'Pink', color: 'bg-pink-400' }
  ];

  return (
    <div className="settings-root min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="glass-card text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title mb-4">⚙️ Settings</h1>
            <p className="subtitle">
              Customize your HypeFlow AI experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <motion.div 
              className="investment-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-6">Settings</h3>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400'
                        : 'bg-gray-700/50 hover:bg-gray-600/50 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{tab.icon}</span>
                      <span className="font-semibold">{tab.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Settings Content */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="investment-card">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-cyan-400">
                    {tabs.find(tab => tab.id === activeTab)?.name} Settings
                  </h2>
                  <div className="flex items-center gap-4">
                    {saveStatus && (
                      <span className={`text-sm ${
                        saveStatus.includes('success') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {saveStatus}
                      </span>
                    )}
                    <button
                      onClick={saveSettings}
                      disabled={isSaving}
                      className="btn"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>

                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Email Address</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4">Notification Preferences</h3>
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                          <div className="font-semibold text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-gray-400">
                            {key === 'priceAlerts' && 'Get notified when cards reach your target prices'}
                            {key === 'marketUpdates' && 'Receive daily market trend updates'}
                            {key === 'portfolioChanges' && 'Alerts when your portfolio value changes significantly'}
                            {key === 'aiInsights' && 'Weekly AI-generated investment insights'}
                            {key === 'weeklyReports' && 'Comprehensive weekly performance reports'}
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Portfolio Settings */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-semibold text-white">Auto Sync Portfolio</div>
                        <div className="text-sm text-gray-400">Automatically sync with market data</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.portfolio.autoSync}
                          onChange={(e) => handleSettingChange('portfolio', 'autoSync', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Sync Interval</label>
                      <select
                        value={settings.portfolio.syncInterval}
                        onChange={(e) => handleSettingChange('portfolio', 'syncInterval', e.target.value)}
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Default Currency</label>
                      <select
                        value={settings.portfolio.defaultCurrency}
                        onChange={(e) => handleSettingChange('portfolio', 'defaultCurrency', e.target.value)}
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="CAD">CAD</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-white mb-4">Accent Color</label>
                      <div className="grid grid-cols-5 gap-4">
                        {accentColors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => handleSettingChange('appearance', 'accentColor', color.id)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              settings.appearance.accentColor === color.id
                                ? 'border-cyan-400 bg-cyan-400/20'
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full mx-auto ${color.color}`}></div>
                            <div className="text-sm text-white mt-2">{color.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Font Size</label>
                      <select
                        value={settings.appearance.fontSize}
                        onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-semibold text-white">Enable Animations</div>
                        <div className="text-sm text-gray-400">Smooth transitions and hover effects</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.appearance.animations}
                          onChange={(e) => handleSettingChange('appearance', 'animations', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    {Object.entries(settings.privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                          <div className="font-semibold text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-gray-400">
                            {key === 'dataSharing' && 'Allow sharing of anonymized data for research'}
                            {key === 'analytics' && 'Help improve the app with usage analytics'}
                            {key === 'marketing' && 'Receive promotional emails and updates'}
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
