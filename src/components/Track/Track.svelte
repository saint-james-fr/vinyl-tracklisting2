<script lang="ts">
  import { secondsToMinute } from "lib/time";
  import { vinylStore } from "stores";
  import { onMount } from "svelte";

  export let index: number;
  export let prefix: string;
  export let sideIndex: number;
  let side: SideType;
  let title = "";
  let position: number;
  let track: TrackType;
  let minute: number | undefined = 0;
  let second: number | undefined = 0;
  let handler: HTMLElement;

  $: {
    position = index + 1;
  }

  onMount(() => {
    // grab track title from store
    side = $vinylStore.sides[sideIndex];
    track = side.tracks[index];
    title = track.title;
    // @ts-ignore
    minute = secondsToMinute(track.length)[0];
    // @ts-ignore
    second = secondsToMinute(track.length)[1];
    // update prefix in store
    $vinylStore.sides[sideIndex].tracks[index].prefix = prefix;

    handler.classList.add("show");
  });
</script>

<div
  class="list-group-item handle-function row color-side-{prefix.toLowerCase()}"
  id="handler {prefix}{position}"
  bind:this={handler}
>
  <span
    class="position{position} position-span"
    id="position {prefix}{position}">{prefix}{position}</span
  >
  <input
    class="title-input"
    id="title {prefix}{position}"
    placeholder="Enter Title..."
    data-form-type="other"
    type="text"
    bind:value={title}
    on:change={() => {
      $vinylStore.sides[sideIndex].tracks[index].title = title;
    }}
  />
  <div class="time-wrapper" id="timeWrapper {prefix}{position}">
    <div class="minute-input-container">
      <input
        class="minute-input"
        id="minute {prefix}{position}"
        placeholder="__"
        type="number"
        min="0"
        max="59"
        data-form-type="other"
        bind:value={minute}
        on:keydown={(e) => {
          if (e.key === "-") {
            e.preventDefault();
            minute = 0;
          }
        }}
        on:input={(e) => {
          if (e.currentTarget.value.length > 2) return (minute = 0);
          if (second === undefined) second = 0;
          // @ts-ignore
          if (minute > 59) minute = 59;
          // @ts-ignore
          if (minute < 0) minute = 0;
          $vinylStore.sides[sideIndex].tracks[index].length =
            // @ts-ignore
            minute * 60 + second;
        }}
      />
    </div>
    <div class="second-input-container">
      <input
        class="second-input"
        id="second {prefix}{position}"
        placeholder="__"
        type="number"
        min="0"
        max="59"
        data-form-type="other"
        bind:value={second}
        on:keydown={(e) => {
          if (e.key === "-") {
            e.preventDefault();
            second = 0;
          }
        }}
        on:input={(e) => {
          if (e.currentTarget.value.length > 2) return (second = 0);
          if (second === undefined) second = 0;
          if (second > 59) second = 59;
          if (second < 0) second = 0;
          // @ts-ignore
          if (!minute) minute = 0;
          $vinylStore.sides[sideIndex].tracks[index].length =
            minute * 60 + second;
        }}
      />
    </div>
  </div>
</div>

<style lang="scss">
  .handle-function {
    opacity: 0;
    transition: 100ms linear opacity;
  }

  .show {
    opacity: 1;
  }
</style>
