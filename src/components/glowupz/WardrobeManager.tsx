'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Trash2, Loader2 } from 'lucide-react';
import { ClothingItem, ClothingCategory } from '@/lib/types';

export function WardrobeManager() {
  const { user, addClothingItem, removeClothingItem } = useApp();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ClothingCategory>('all');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const categories: ('all' | ClothingCategory)[] = [
    'all',
    'tops',
    'bottoms',
    'dresses',
    'shoes',
    'accessories'
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(t.wardrobe.processing);

    // Simulate AI processing
    setTimeout(() => {
      setUploadProgress(t.wardrobe.aiAnalyzing);
    }, 1000);

    // Simulate image processing and AI analysis
    const reader = new FileReader();
    reader.onload = (event) => {
      setTimeout(() => {
        const newItem: ClothingItem = {
          id: Date.now().toString(),
          category: 'tops', // AI would detect this
          imageUrl: event.target?.result as string,
          color: '#FF69B4', // AI would detect this
          pattern: 'solid',
          size: 'M',
          name: file.name
        };

        addClothingItem(newItem);
        setUploading(false);
        setUploadProgress('');
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const filteredItems =
    selectedCategory === 'all'
      ? user?.wardrobe || []
      : (user?.wardrobe || []).filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-gray-800">{t.wardrobe.title}</h2>
        <label htmlFor="upload-clothing">
          <input
            id="upload-clothing"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
          <Button
            asChild
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 cursor-pointer"
            disabled={uploading}
          >
            <span>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {uploadProgress}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {t.wardrobe.upload}
                </>
              )}
            </span>
          </Button>
        </label>
      </div>

      {/* Category tabs */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
        <TabsList className="bg-white border border-gray-200 p-1 rounded-xl flex-wrap h-auto">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white px-4 py-2"
            >
              {t.wardrobe.categories[cat]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {filteredItems.length === 0 ? (
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-12 text-center">
              <div className="text-6xl mb-4">👗</div>
              <p className="text-gray-600 text-lg">
                {selectedCategory === 'all'
                  ? 'Seu guarda-roupa está vazio. Adicione suas primeiras peças!'
                  : `Nenhuma peça na categoria ${t.wardrobe.categories[selectedCategory]}`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <ClothingCard key={item.id} item={item} onRemove={removeClothingItem} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ClothingCard({
  item,
  onRemove
}: {
  item: ClothingItem;
  onRemove: (id: string) => void;
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="aspect-square bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name || 'Clothing item'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Delete button */}
      {showDelete && (
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 hover:scale-110"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Item info */}
      <div className="p-3 space-y-1">
        <p className="font-medium text-gray-800 truncate">{item.name || 'Sem nome'}</p>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-gray-600">{item.size || 'Tamanho único'}</span>
        </div>
      </div>
    </div>
  );
}
