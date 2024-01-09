<script lang="ts">
  import { vinylStore } from "stores";

  let emptyTitleIdBis = 10000000;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!e.target) return;
    const files = target.files;
    if ((files && files.length == 0) || !files) return;

    // We empty the store
    vinylStore.update((store) => {
      store.sides.forEach((side) => {
        side.tracks = [];
      });
      return store;
    });
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = async (event) => {
        // allow only audio files
        if (!file.type.startsWith("audio/")) {
          console.error("Not an audio file");
          return;
        }
        // grab title and length from file
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        await new Promise((resolve) => {
          audio.onloadedmetadata = resolve;
        });
        // truncate duration to 0 decimals
        let duration = Math.trunc(audio.duration);
        const title = file.name;
        let totalSides = $vinylStore.sides.length;
        // distribution cyclique
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
      };
      if ($vinylStore.sides.length > 1 && files.length == 1) {
        vinylStore.update((store) => {
          store.sides[1].tracks = [
            ...store.sides[1].tracks,
            {
              title: "",
              length: undefined,
              id: emptyTitleIdBis++,
              prefix: "",
            },
          ];
          return store;
        });
      }

      reader.readAsDataURL(file);
    }
  };
</script>

<label
  for="audioInput"
  class="home-secondary-button bigger-text centrer app__button"
  id="audioInputLabel"><i class="fa-solid fa-upload"></i>  Import</label
>
<input
  type="file"
  accept="audio/*"
  id="audioInput"
  multiple
  on:input={handleInput}
/>
