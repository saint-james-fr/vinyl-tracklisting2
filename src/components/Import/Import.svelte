<script lang="ts">
  import { sweetAlertOptionsError } from "lib/sweet_alert";
  import { vinylStore, playerStore, playlistStore } from "stores";
  import { defaultPlayer } from "lib/default";
  import swal from "sweetalert";

  let trackId = 1;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!e.target) return;
    const files = target.files;

    // ERRORS HANDLING
    if ((files && files.length == 0) || !files) return;
    if ($vinylStore.sides.length > files.length) {
      return swal(
        "Imported tracks should be at least equal to the number of sides.\nPlease try again.",
        sweetAlertOptionsError
      );
    }

    // RESETTING STORES
    vinylStore.update((store) => {
      store.sides.forEach((side) => {
        side.tracks = [];
      });
      return store;
    });

    // First we empty the playlist store
    playlistStore.update((store) => {
      store.tracks = [];
      return store;
    });
    // first we empty the player store
    playerStore.update((store) => {
      store = defaultPlayer;
      return store;
    });

    // LOOPING and adding tracks to STORES
    let promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      let promise = new Promise<void>((resolve, reject) => {
        reader.onload = async (event) => {
          // allow only audio files
          if (!file.type.startsWith("audio/")) {
            console.error("Not an audio file");
            return;
          }
          // grab title and length from file
          const url = URL.createObjectURL(file);
          const audio = new Audio(url);
          // when audio ends, we play next track, we attch right now this event to the audio
          audio.onended = () => {
            $playerStore.playing = false;
            $playlistStore.synchronize();
            // TODO: we don't play anything if its the last track
            if (
              $playerStore.currentTrack &&
              $playlistStore.tracks[$playlistStore.tracks.length - 1].track
                .title == $playerStore.currentTrack.title
            ) {
              // we go back to the first track
              $playerStore = {
                ...$playerStore,
                currentTrack: $playlistStore.tracks[0].track,
                currentAudio: $playlistStore.tracks[0].audio,
                playing: false,
              };
            } else {
              // we play next track
              $playerStore.next();
              $playerStore.playPause();
            }
          };
          await new Promise((resolve) => {
            audio.onloadedmetadata = resolve;
          });
          // truncate duration to 0 decimals
          let duration = Math.trunc(audio.duration);
          const title = file.name.replace(/\.[^/.]+$/, "");
          let totalSides = $vinylStore.sides.length;
          const track: TrackType = {
            title,
            length: duration,
            id: trackId++,
            prefix: "",
          };

          // We also add to playlist store and player store

          playlistStore.update((store) => {
            const playlistElement: PlaylistElement = {
              audio,
              track,
            };
            store.tracks = [...store.tracks, playlistElement];
            return store;
          });

          // distribution cyclique pour créer les faces
          let sideIndex = i % totalSides;
          // for updating store
          vinylStore.update((store) => {
            store.sides[sideIndex].tracks = [
              ...store.sides[sideIndex].tracks,
              {
                title,
                length: duration,
                id: i,
                prefix: "",
              },
            ];
            return store;
          });
          resolve();
        };
        reader.onerror = reject;
      });
      promises.push(promise);
      // prevent empty sides by adding an empty track
      reader.readAsDataURL(file);
    }
    Promise.all(promises).then(() => {
      // We syncronize the playlist
      $playlistStore.synchronize();
      // We show the player
      playerStore.update((store) => {
        store.show = true;
        return store;
      });
      // We play
      $playerStore.playPause();
    });
  };
</script>

<label
  for="audioInput"
  class="home-secondary-button bigger-text centrer app__button uppercase"
  id="audioInputLabel"><i class="fa-solid fa-upload"></i>  Import</label
>
<input
  type="file"
  accept="audio/*"
  id="audioInput"
  multiple
  on:input={handleInput}
/>
