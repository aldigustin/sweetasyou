export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  title: string;
  description: string;
  caption: string;
  date?: string;
}

export interface TimelineEvent {
  id: string;
  icon: string;
  date: string;
  title: string;
  description: string;
}

export interface CountdownTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
