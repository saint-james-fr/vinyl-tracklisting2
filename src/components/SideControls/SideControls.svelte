<script lang="ts">
  import AddTrack from "components/AddTrack/AddTrack.svelte";
  import RemoveTrack from "components/RemoveTrack/RemoveTrack.svelte";
  import { secondsToMinute } from "lib/time";
  
  export let prefix: string;
  export let length: number;

  let minute: number | string;
  let second: number | string;

  $: {
    minute = secondsToMinute(length)[0];
    second = secondsToMinute(length)[1];
    if (second < 10) second = `0${second}`;
  }
</script>

<div class="controls">
  <AddTrack {prefix} />
  <div class="controls-flex">
    <div class="bolder face">FACE {prefix}</div>
    <div class="result-length">{minute}:{second}</div>
  </div>
  <RemoveTrack {prefix} />
</div>

<style lang="scss">
  .result-length, .face {
    text-align:center;
    display: flex;
    justify-content: center;
  }


</style>