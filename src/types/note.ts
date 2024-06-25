export interface Note {
  id: number;
  title: string;
  timestamp: string;
  content: string;
}

export interface PaginatedNotes {
  pages: Note[][];
  pageParams: unknown[];
}
