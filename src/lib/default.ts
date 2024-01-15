import { get } from "svelte/store";
import { vinylStore, playlistStore, playerStore } from "stores";

let trackId = 0;
let sideId = 0;

export function createDefaultTrack(): TrackType {
  trackId += 1;
  return {
    id: trackId,
    prefix: "",
    title: "",
    length: undefined,
  };
}

export function createDefaultSide(): SideType {
  sideId += 1;
  return {
    id: sideId,
    prefix: "",
    tracks: [createDefaultTrack()],
    get length() {
      return this.tracks.reduce((acc: number, track: TrackType) => {
        return acc + track.length;
      }, 0);
    },
  };
}
export const defaultVinyl: VinylType = {
  sides: [createDefaultSide(), createDefaultSide()],
  get length() {
    // for each sides, we iterate over the tracks and sum their length
    return this.sides.reduce((acc: number, side: SideType) => {
      return (
        acc +
        side.tracks.reduce((acc: number, track: TrackType) => {
          return acc + track.length;
        }, 0)
      );
    }, 0);
  },
};

export const defaultForm: FormType = {
  catNr: "",
  artist: "",
  title: "",
  format: "",
  speed: "",
  sampleRate: "",
  bitDepth: "",
  comments: "",
};

export const defaultPlayer = {
  playing: false,
  currentAudio: null as HTMLAudioElement | null,
  currentTrack: null as TrackType | null,
  show: false,
  mute: function () {
    if (!this.currentAudio) return;
    this.currentAudio.muted = !this.currentAudio.muted;
  },
  playPause: async function () {
    if (!this.currentAudio) {
      // Lett's get a track from the playlist
      const playlist = get(playlistStore);
      if (playlist.tracks.length === 0) return;
      const playlistElement = playlist.tracks[0];
      playerStore.update((player) => {
        player.currentAudio = playlistElement.audio;
        player.currentTrack = playlistElement.track;
        return player;
      });
    }
    if (!this.playing) {
      if (!this.currentAudio) return;
      await this.currentAudio.play();
    } else {
      if (!this.currentAudio) return;
      await this.currentAudio.pause();
    }
    this.playing = !this.playing;
  },
  stop: function () {
    if (!this.currentAudio) return;
    this.currentAudio.currentTime = 0;
    this.currentAudio.pause();
    this.playing = false;
  },
  previous: function () {
    if (!this.currentAudio) return;
    // find position in the playlist
    const index = get(playlistStore).tracks.findIndex(
      (playlistElement) =>
        playlistElement.track.title === this.currentTrack?.title
    );
    if (index === -1) return;

    let playlistElement: PlaylistElement;
    if (index !== 0) {
      playlistElement = get(playlistStore).tracks[index - 1];
      playerStore.update((player) => {
        player.currentAudio = playlistElement.audio;
        player.currentTrack = playlistElement.track;
        return player;
      });
    }
  },
  next: function () {
    if (!this.currentAudio) return;
    // find position in the playlist
    const index = get(playlistStore).tracks.findIndex(
      (playlistElement) =>
        playlistElement.track.title === this.currentTrack?.title
    );
    if (index === -1) return;
    let playlistElement: PlaylistElement;
    if (index !== get(playlistStore).tracks.length - 1) {
      playlistElement = get(playlistStore).tracks[index + 1];
      playerStore.update((player) => {
        player.currentAudio = playlistElement.audio;
        player.currentTrack = playlistElement.track;
        return player;
      });
    }
  },
  seek: function (time: number) {
    if (!this.currentAudio) return;
    this.currentAudio.currentTime = (time * this.currentAudio.duration) / 100;
  },
  reset: function () {
    playerStore.update((player) => {
      player.currentAudio = null;
      player.currentTrack = null;
      player.show = false;
      return player;
    });
    playlistStore.update((playlist) => {
      playlist.tracks = [];
      return playlist;
    });
  },
};

export const defaultPlaylist: PlaylistStore = {
  tracks: [],
  synchronize: function () {
    const allTracks = get(vinylStore).sides.reduce(
      (acc: TrackType[], side: SideType) => {
        return acc.concat(side.tracks);
      },
      []
    );
    // based on alltracks, we have to rearrange this.tracks
    // We just have to replicate the order of allTracks
    // We can use the id to find the corresponding track
    // based on the id we rerrange the this.tracks array
    // lets get the ids of allTracks
    const allTracksIds = allTracks.map((track: TrackType) => track.title);
    // manipulate this.tracks so each track of this.tracks is in the same order as allTracks based on ids
    playlistStore.update((playlist) => {
      playlist.tracks = this.tracks.sort(
        (trackA: PlaylistElement, trackB: PlaylistElement) => {
          const indexA = allTracksIds.indexOf(trackA.track.title);
          const indexB = allTracksIds.indexOf(trackB.track.title);
          return indexA - indexB;
        }
      );
      return playlist;
    });
  },
};
