let trackId = 0;
let sideId = 0;

export function createDefaultTrack(): TrackType {
  trackId += 1;
  return {
    id: trackId,
    prefix: "",
    title: "",
    length: 0,
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
}


