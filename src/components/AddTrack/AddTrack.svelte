<script lang="ts">
  import { vinylStore } from "stores";
  import { createDefaultTrack } from "lib/default";
  import { prefixTranslation } from "lib/prefix";

  export let prefix: string;

  const handleClick = () => {
    const sideIndex = prefixTranslation.get(prefix) as number;
    $vinylStore.sides[sideIndex].tracks = [
      ...$vinylStore.sides[sideIndex].tracks,
      createDefaultTrack(),
    ];
  };
</script>

<button class="btn-plus" on:click={handleClick}>
  <i class="fa-solid fa-plus icon-btn"></i>
</button>
