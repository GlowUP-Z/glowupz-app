'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  User,
  Shirt,
  Sparkles,
  CreditCard,
  Settings,
  Share2,
  Menu,
  X
} from 'lucide-react';

type Tab = 'avatar' | 'wardrobe' | 'looks' | 'subscription' | 'settings' | 'share';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useApp();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('avatar');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) {
    return null;
  }

  const menuItems: { id: Tab; icon: any; label: string }[] = [
    { id: 'avatar', icon: User, label: t.menu.avatar },
    { id: 'wardrobe', icon: Shirt, label: t.menu.wardrobe },
    { id: 'looks', icon: Sparkles, label: t.menu.looks },
    { id: 'subscription', icon: CreditCard, label: t.menu.subscription },
    { id: 'settings', icon: Settings, label: t.menu.settings },
    { id: 'share', icon: Share2, label: t.menu.share }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">GlowUpZ</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gradient-to-b from-pink-50 to-rose-50 border-r border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              GlowUp
            </span>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Z
            </span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setMenuOpen(false)}>
          <div
            className="bg-white w-64 h-full p-6 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'avatar' && <AvatarTab />}
          {activeTab === 'wardrobe' && <WardrobeTab />}
          {activeTab === 'looks' && <LooksTab />}
          {activeTab === 'subscription' && <SubscriptionTab />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'share' && <ShareTab />}
        </div>
      </main>
    </div>
  );
}

// Placeholder components - will be implemented next
function AvatarTab() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{t.avatar.title}</h2>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 min-h-[600px] flex items-center justify-center">
        <p className="text-gray-600">Avatar customization coming next...</p>
      </div>
    </div>
  );
}

function WardrobeTab() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{t.wardrobe.title}</h2>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 min-h-[600px] flex items-center justify-center">
        <p className="text-gray-600">Wardrobe management coming next...</p>
      </div>
    </div>
  );
}

function LooksTab() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{t.looks.title}</h2>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 min-h-[600px] flex items-center justify-center">
        <p className="text-gray-600">Look suggestions coming next...</p>
      </div>
    </div>
  );
}

function SubscriptionTab() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{t.subscription.title}</h2>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 min-h-[600px] flex items-center justify-center">
        <p className="text-gray-600">Subscription plans coming next...</p>
      </div>
    </div>
  );
}

function SettingsTab() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{t.settings.title}</h2>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 min-h-[600px] flex items-center justify-center">
        <p className="text-gray-600">Settings coming next...</p>
      </div>
    </div>
  );
}

function ShareTab() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{t.share.title}</h2>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 min-h-[600px] flex items-center justify-center">
        <p className="text-gray-600">Share options coming next...</p>
      </div>
    </div>
  );
}
