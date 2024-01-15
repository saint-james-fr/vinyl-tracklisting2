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
  [key: string]: string; // Toutes les valeurs sont des chaînes
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

interface PlayerStore {
  playing: boolean;
  currentAudio: HTMLAudioElement | null;
  currentTrack: TrackType | null;
  blocking: boolean;
  mute: () => void;
  playPause: () => void;
  stop: () => void;
  previous: () => void;
  next: () => void;
  seek: (time: number) => void;
}

interface PlaylistElement {
  audio: HTMLAudioElement;
  track: TrackType;
}

type PlaylistStore = {
  tracks: PlaylistElement[];
  synchronize: () => void;
};
