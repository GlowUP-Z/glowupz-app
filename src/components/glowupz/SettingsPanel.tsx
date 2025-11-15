'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { LogOut, User, Bell } from 'lucide-react';
import { Language } from '@/lib/types';

export function SettingsPanel() {
  const router = useRouter();
  const { user, logout } = useApp();
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState({
    weeklyLooks: user?.preferences?.notifications?.weeklyLooks ?? true,
    weatherAlerts: user?.preferences?.notifications?.weatherAlerts ?? true
  });

  const handleLogout = () => {
    logout();
    router.push('/welcome');
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{t.settings.title}</h2>

      <div className="space-y-4">
        {/* Language Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-xl">🌍</span>
            </div>
            <div>
              <Label className="text-lg font-semibold text-gray-800">
                {t.settings.language}
              </Label>
              <p className="text-sm text-gray-600">Escolha seu idioma preferido</p>
            </div>
          </div>

          <RadioGroup value={language} onValueChange={(v) => setLanguage(v as Language)}>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.code} className="flex items-center space-x-3">
                  <RadioGroupItem value={lang.code} id={lang.code} />
                  <Label
                    htmlFor={lang.code}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <Label className="text-lg font-semibold text-gray-800">
                {t.settings.notifications}
              </Label>
              <p className="text-sm text-gray-600">Gerencie suas notificações</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <Label htmlFor="weekly-looks" className="font-medium text-gray-800">
                  {t.settings.weeklyLooks}
                </Label>
                <p className="text-sm text-gray-600">Receba sugestões toda semana</p>
              </div>
              <Switch
                id="weekly-looks"
                checked={notifications.weeklyLooks}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weeklyLooks: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <Label htmlFor="weather-alerts" className="font-medium text-gray-800">
                  {t.settings.weatherAlerts}
                </Label>
                <p className="text-sm text-gray-600">Alertas baseados no clima</p>
              </div>
              <Switch
                id="weather-alerts"
                checked={notifications.weatherAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weatherAlerts: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Avatar Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <Label className="text-lg font-semibold text-gray-800">
                {t.settings.avatarSettings}
              </Label>
              <p className="text-sm text-gray-600">Personalize seu avatar</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-2 border-pink-500 text-pink-500 hover:bg-pink-50"
            onClick={() => {
              // Navigate to avatar tab - would need to pass this up to parent
              window.dispatchEvent(new CustomEvent('navigate-to-avatar'));
            }}
          >
            {t.settings.editAvatar}
          </Button>
        </div>

        {/* Account */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <Label className="text-lg font-semibold text-gray-800">Conta</Label>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full bg-red-500 hover:bg-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t.settings.logout}
          </Button>
        </div>
      </div>
    </div>
  );
}
