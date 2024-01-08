<script lang="ts">
  import Track from "components/Track/Track.svelte";
  import SideControls from "components/SideControls/SideControls.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { vinylStore } from "stores";

  import { prefixPossible } from "lib/prefix";
  import { createSortableSide } from "lib/sortable";

  export let side: SideType;
  export let index: number;

  let prefix: string;
  let id: string;
  let length: number;
  let sideIndex = index;

  $: {
    prefix = prefixPossible[index];
    if ($vinylStore.sides[index]) length = $vinylStore.sides[index].length;
  }

  onMount(() => {
    $vinylStore.sides[index].prefix = prefix;
    id = `side${prefix}`;
  });
</script>

<div class="side__container radius box-shadow" transition:fade>
  <SideControls {prefix} {length} />
  <div
    {id}
    class="list-group list-group-flush container"
    use:createSortableSide
  >
    {#if prefix}
      {#each side.tracks as track, index (track.id)}
        <Track {index} {prefix} {sideIndex} />
      {/each}
    {/if}
  </div>
</div>
