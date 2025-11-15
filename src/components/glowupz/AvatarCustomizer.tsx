'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RotateCw, Save } from 'lucide-react';
import { AvatarConfig, Gender, BodyType, SkinTone } from '@/lib/types';

export function AvatarCustomizer() {
  const { user, updateAvatar } = useApp();
  const { t } = useLanguage();
  const [config, setConfig] = useState<AvatarConfig>(
    user?.avatar || {
      gender: 'female',
      bodyType: 'athletic',
      height: 170,
      skinTone: 'medium'
    }
  );
  const [rotation, setRotation] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateAvatar(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const getSkinColor = (tone: SkinTone) => {
    const colors = {
      light: '#FFE4C4',
      medium: '#DEB887',
      tan: '#C19A6B',
      dark: '#8B6F47'
    };
    return colors[tone];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">{t.avatar.title}</h2>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
        >
          <Save className="w-4 h-4 mr-2" />
          {saved ? '✓ Salvo!' : t.avatar.save}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Avatar Preview */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl overflow-hidden flex items-center justify-center">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              {/* Avatar representation */}
              <div className="relative w-48 h-64">
                {/* Head */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-24 rounded-full"
                  style={{ backgroundColor: getSkinColor(config.skinTone) }}
                />
                
                {/* Body */}
                <div
                  className={`absolute top-20 left-1/2 transform -translate-x-1/2 rounded-lg ${
                    config.bodyType === 'slim' ? 'w-16 h-32' :
                    config.bodyType === 'athletic' ? 'w-20 h-32' :
                    config.bodyType === 'curvy' ? 'w-24 h-32' :
                    'w-28 h-32'
                  }`}
                  style={{ backgroundColor: getSkinColor(config.skinTone) }}
                />

                {/* Clothing placeholder */}
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-28 bg-gradient-to-br from-pink-300 to-rose-300 rounded-lg opacity-80" />
                
                {/* Legs */}
                <div className="absolute top-48 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <div className="w-6 h-16 bg-blue-400 rounded-lg" />
                  <div className="w-6 h-16 bg-blue-400 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Rotate button */}
            <button
              onClick={handleRotate}
              className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <RotateCw className="w-5 h-5 text-pink-500" />
            </button>

            {/* Height indicator */}
            <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-full shadow-lg text-sm font-medium text-gray-700">
              {config.height} cm
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Gender */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <Label className="text-lg font-semibold text-gray-800">{t.avatar.gender}</Label>
            <RadioGroup
              value={config.gender}
              onValueChange={(value) => setConfig({ ...config, gender: value as Gender })}
              className="flex gap-4"
            >
              <div className="flex-1">
                <RadioGroupItem value="male" id="male" className="peer sr-only" />
                <Label
                  htmlFor="male"
                  className="flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-pink-500 peer-data-[state=checked]:bg-pink-50 hover:border-pink-300"
                >
                  <span className="text-2xl mr-2">👨</span>
                  {t.avatar.male}
                </Label>
              </div>
              <div className="flex-1">
                <RadioGroupItem value="female" id="female" className="peer sr-only" />
                <Label
                  htmlFor="female"
                  className="flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-pink-500 peer-data-[state=checked]:bg-pink-50 hover:border-pink-300"
                >
                  <span className="text-2xl mr-2">👩</span>
                  {t.avatar.female}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Body Type */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <Label className="text-lg font-semibold text-gray-800">{t.avatar.bodyType}</Label>
            <RadioGroup
              value={config.bodyType}
              onValueChange={(value) => setConfig({ ...config, bodyType: value as BodyType })}
              className="grid grid-cols-2 gap-3"
            >
              {(['slim', 'athletic', 'curvy', 'plus'] as BodyType[]).map((type) => (
                <div key={type}>
                  <RadioGroupItem value={type} id={type} className="peer sr-only" />
                  <Label
                    htmlFor={type}
                    className="flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-pink-500 peer-data-[state=checked]:bg-pink-50 hover:border-pink-300 text-sm"
                  >
                    {t.avatar[type]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Height */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold text-gray-800">{t.avatar.height}</Label>
              <span className="text-2xl font-bold text-pink-500">{config.height} cm</span>
            </div>
            <Slider
              value={[config.height]}
              onValueChange={([value]) => setConfig({ ...config, height: value })}
              min={150}
              max={200}
              step={1}
              className="w-full"
            />
          </div>

          {/* Skin Tone */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <Label className="text-lg font-semibold text-gray-800">{t.avatar.skinTone}</Label>
            <div className="grid grid-cols-4 gap-3">
              {(['light', 'medium', 'tan', 'dark'] as SkinTone[]).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setConfig({ ...config, skinTone: tone })}
                  className={`aspect-square rounded-xl border-4 transition-all hover:scale-110 ${
                    config.skinTone === tone
                      ? 'border-pink-500 shadow-lg'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                  style={{ backgroundColor: getSkinColor(tone) }}
                  title={t.avatar[tone]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
