<script lang="ts">
  import AddTrack from "components/AddTrack/AddTrack.svelte";
  import RemoveTrack from "components/RemoveTrack/RemoveTrack.svelte";
  import { secondsToMinute } from "lib/time";

  export let prefix: string;
  export let length: number;

  let minute: number | string;
  let second: number | string;

  $: {
    if (minute === undefined) {
      minute = 0;
    } else {
      minute = secondsToMinute(length)[0];
    }

    if (second === undefined) {
      second = 0;
    } else {
      second = secondsToMinute(length)[1];
    }
    // minute / second returns NaN if the value is undefined
    // so we need to check if it's undefined and set it to 0
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
  .result-length,
  .face {
    text-align: center;
    display: flex;
    justify-content: center;
  }
</style>
