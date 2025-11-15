'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sparkles, Heart, Share2, Save, Wand2 } from 'lucide-react';
import { Look, Occasion, Weather } from '@/lib/types';

export function LookSuggestions() {
  const { user, addLook, toggleFavoriteLook } = useApp();
  const { t } = useLanguage();
  const [occasion, setOccasion] = useState<Occasion>('casual');
  const [weather, setWeather] = useState<Weather>('hot');
  const [currentLook, setCurrentLook] = useState<Look | null>(null);
  const [generating, setGenerating] = useState(false);
  const [phrase, setPhrase] = useState('');

  const generateLook = () => {
    if (!user?.wardrobe || user.wardrobe.length === 0) {
      return;
    }

    setGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      // Randomly select items from wardrobe
      const shuffled = [...user.wardrobe].sort(() => Math.random() - 0.5);
      const selectedItems = shuffled.slice(0, Math.min(3, shuffled.length));

      const newLook: Look = {
        id: Date.now().toString(),
        name: `Look ${occasion} - ${new Date().toLocaleDateString()}`,
        items: selectedItems,
        occasion,
        weather,
        favorite: false,
        createdAt: new Date()
      };

      setCurrentLook(newLook);
      
      // Random Gossip Girl style phrase
      const randomPhrase = t.looks.phrases[Math.floor(Math.random() * t.looks.phrases.length)];
      setPhrase(randomPhrase);
      setGenerating(false);
    }, 1500);
  };

  const handleSaveLook = () => {
    if (currentLook) {
      addLook(currentLook);
      setPhrase('Look salvo com sucesso! 💾✨');
      setTimeout(() => setPhrase(''), 2000);
    }
  };

  const handleShare = () => {
    setPhrase('Compartilhando seu look incrível! 📱✨');
    setTimeout(() => setPhrase(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-gray-800">{t.looks.title}</h2>
        <Button
          onClick={generateLook}
          disabled={generating || !user?.wardrobe || user.wardrobe.length === 0}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {generating ? (
            <>
              <Wand2 className="w-4 h-4 mr-2 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              {t.looks.generate}
            </>
          )}
        </Button>
      </div>

      {/* Phrase display */}
      {phrase && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-4 text-center font-medium text-lg animate-bounce">
          {phrase}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="space-y-6">
          {/* Occasion */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <Label className="text-lg font-semibold text-gray-800">{t.looks.occasion}</Label>
            <RadioGroup value={occasion} onValueChange={(v) => setOccasion(v as Occasion)}>
              {(['casual', 'work', 'party', 'event'] as Occasion[]).map((occ) => (
                <div key={occ} className="flex items-center space-x-2">
                  <RadioGroupItem value={occ} id={occ} />
                  <Label htmlFor={occ} className="cursor-pointer">
                    {t.looks[occ]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Weather */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <Label className="text-lg font-semibold text-gray-800">{t.looks.weather}</Label>
            <RadioGroup value={weather} onValueChange={(v) => setWeather(v as Weather)}>
              {(['hot', 'cold', 'rain'] as Weather[]).map((w) => (
                <div key={w} className="flex items-center space-x-2">
                  <RadioGroupItem value={w} id={w} />
                  <Label htmlFor={w} className="cursor-pointer">
                    {t.looks[w]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Saved Looks */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <Label className="text-lg font-semibold text-gray-800">Looks Salvos</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {user?.looks && user.looks.length > 0 ? (
                user.looks.map((look) => (
                  <div
                    key={look.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm text-gray-700 truncate flex-1">{look.name}</span>
                    <button
                      onClick={() => toggleFavoriteLook(look.id)}
                      className="ml-2"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          look.favorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum look salvo ainda
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Look Preview */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 min-h-[600px]">
            {!currentLook ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-8xl">✨</div>
                <p className="text-xl text-gray-600 max-w-md">
                  {user?.wardrobe && user.wardrobe.length > 0
                    ? 'Clique em "Gerar Novo Look" para criar combinações incríveis com suas roupas!'
                    : 'Adicione roupas ao seu guarda-roupa primeiro para gerar looks!'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Look items */}
                <div className="grid grid-cols-3 gap-4">
                  {currentLook.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name || 'Item'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name || 'Sem nome'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 justify-center flex-wrap">
                  <Button
                    onClick={handleSaveLook}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {t.looks.save}
                  </Button>
                  <Button
                    onClick={handleShare}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {t.looks.share}
                  </Button>
                  <Button
                    onClick={generateLook}
                    variant="outline"
                    className="border-2 border-pink-500 text-pink-500 hover:bg-pink-50"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Outro
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
