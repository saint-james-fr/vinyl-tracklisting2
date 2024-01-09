export const tracksAreValid = (tracks: TrackType[]) => {
  // no empty length
  if (tracks.some((track) => track.length === 0 || track.length === undefined)) 
    throw new Error("One or more tracks have empty timing informations.\nFix and click again.");
  // no empty title
  if (tracks.some((track) => track.title === ""))
    throw new Error("One or more tracks have an empty title.\nFix and click again.");
};
