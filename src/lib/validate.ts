export const tracksAreValid = (tracks: TrackType[]) => {
  // no empty length
  if (tracks.some((track) => track.length === 0))
    throw new Error("One or more tracks have an empty timing informations.\nFix and click again.");
  // no empty title
  if (tracks.some((track) => track.title === ""))
    throw new Error("One or more tracks have an empty title.\nFix and click again.");
};
