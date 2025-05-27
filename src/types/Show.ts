export interface Show {
  id: number;
  name: string;
  genres: string[];
  summary: string;
  status: string;
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  premiered: string;
  network: {
    name: string;
  };
  runtime: number | string;
  schedule: {
    days: string[];
    time: string | number;
  };
  externals: {
    imdb: string;
  };
  url: string;
}
