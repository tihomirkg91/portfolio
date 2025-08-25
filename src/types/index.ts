export interface Comic {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  publishDate: string;
  genre: string[];
  totalStrips: number;
}

export interface ComicStrip {
  id: string;
  comicId: string;
  stripNumber: number;
  title: string;
  imageUrl: string;
  altText: string;
  publishDate: string;
  nextStripId?: string;
  previousStripId?: string;
}
