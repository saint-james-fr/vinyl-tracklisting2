interface TrackType {
  id: number;
  prefix: string;
  title: string;
  length: number | undefined;
}

interface SideType {
  id: number;
  prefix: string;
  length: number;
  tracks: TrackType[];
}

interface VinylType {
  sides: Side[];
  length: number;
}

interface FormType {
  catNr: string;
  artist: string;
  title: string;
  format: string;
  speed: string;
  sampleRate: string;
  bitDepth: string;
  comments: string;
}

type MinuteSecond = [number, number];
