<script lang="ts">
  import { vinylStore } from "stores";
  import { prefixTranslation } from "lib/prefix";

  export let prefix: string;

  const handleClick = () => {
    const sideIndex = prefixTranslation.get(prefix) as number;
    if ($vinylStore.sides[sideIndex].tracks.length == 1) return;
    let tracksCopy = [...$vinylStore.sides[sideIndex].tracks];
    tracksCopy.pop();
    $vinylStore.sides[sideIndex].tracks = tracksCopy;
  };
</script>

<button class="btn-minus" on:click={handleClick}>
  <i class="fa-solid fa-minus icon-btn"></i>
</button>
