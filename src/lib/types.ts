export type Language = 'pt' | 'en' | 'es';

export type Gender = 'male' | 'female';
export type BodyType = 'slim' | 'athletic' | 'curvy' | 'plus';
export type SkinTone = 'light' | 'medium' | 'tan' | 'dark';

export interface AvatarConfig {
  gender: Gender;
  bodyType: BodyType;
  height: number; // em cm
  skinTone: SkinTone;
}

export type ClothingCategory = 'tops' | 'bottoms' | 'dresses' | 'shoes' | 'accessories';

export interface ClothingItem {
  id: string;
  category: ClothingCategory;
  imageUrl: string;
  color: string;
  pattern?: string;
  size?: string;
  name?: string;
}

export type Occasion = 'casual' | 'work' | 'party' | 'event';
export type Weather = 'hot' | 'cold' | 'rain';

export interface Look {
  id: string;
  name: string;
  items: ClothingItem[];
  occasion: Occasion;
  weather: Weather;
  favorite: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  avatar: AvatarConfig;
  wardrobe: ClothingItem[];
  looks: Look[];
  subscription?: {
    plan: 'weekly' | 'monthly' | 'semester';
    active: boolean;
    expiresAt: Date;
  };
  preferences: {
    language: Language;
    notifications: {
      weeklyLooks: boolean;
      weatherAlerts: boolean;
    };
  };
}
