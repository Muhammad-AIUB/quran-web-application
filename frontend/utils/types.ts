export interface SurahSummary {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
}

export interface Verse {
  id: number;
  text: string;
  translation: string;
  transliteration: string;
}

export interface SurahDetail extends SurahSummary {
  verses: Verse[];
}

export interface SearchHit {
  surahId: number;
  ayahNumber: number;
  surahNameArabic: string;
  surahTransliteration: string;
  surahTranslation: string;
  text: string;
  translation: string;
  transliteration: string;
}
