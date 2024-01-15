<script lang="ts">
  import { playerStore, playlistStore } from "stores";
  import { secondsToMinute, formatTime } from "lib/time";
  import { truncateString, updateLinearGradient } from "lib/util";

  let progress = 0;
  let volume = 100;
  let title = "";
  let endTime = "";
  let actualTime = "";
  let progressBar: HTMLInputElement;
  let volumeSlider: HTMLInputElement;
  let prefix = "";
  let index = "";
  let viewportWidth: number;
  let maxTitleLength: number;

  // TODO: mute icon // play icon

  $: {
    // for truncating title
    maxTitleLength = viewportWidth < 550 ? 37 : 66;
    // for the progress bar
    if ($playerStore.currentAudio) {
      $playerStore.currentAudio.volume = volume / 100;
      requestAnimationFrame(() => {
        if (!$playerStore.currentAudio || !progressBar) return;
        progress =
          ($playerStore.currentAudio.currentTime * 100) /
          $playerStore.currentAudio.duration;
        progressBar.value = String(progress);
        updateLinearGradient(progressBar, "#d17f33", "#623c19cf");
      });
    }
    // for the actual time, title and end time
    if (
      $playerStore.currentTrack &&
      $playerStore.currentTrack.title &&
      $playerStore.currentTrack.length
    ) {
      title = $playerStore.currentTrack.title;
      endTime = `${formatTime(
        secondsToMinute($playerStore.currentTrack.length)[0]
      )}:${formatTime(secondsToMinute($playerStore.currentTrack.length)[1])}`;
      if (progressBar) {
        let progressInSeconds = Math.trunc(
          ($playerStore.currentTrack.length * progress) / 100
        );
        let pMinutes = secondsToMinute(progressInSeconds)[0];
        let pSeconds = secondsToMinute(progressInSeconds)[1];
        actualTime = `${formatTime(pMinutes)}:${formatTime(pSeconds)}`;
      }
    }
  }
  const handlePrevious = () => {
    $playerStore.stop();
    $playlistStore.synchronize();
    $playerStore.previous();
    $playerStore.playPause();
    updateLinearGradient(progressBar, "#d17f33", "#623c19cf");
  };

  const handlePlayPause = () => {
    $playerStore.playPause();
  };

  const handleNext = () => {
    $playerStore.stop();
    $playlistStore.synchronize();
    $playerStore.next();
    $playerStore.playPause();
    updateLinearGradient(progressBar, "#d17f33", "#623c19cf");
  };

  const handleMute = () => {
    if (!$playerStore.currentAudio) return;
    $playerStore.mute();

    const actualVolume: number = $playerStore.currentAudio.muted
      ? 0
      : $playerStore.currentAudio.volume * 100;
    volumeSlider.value = actualVolume.toString();
    updateLinearGradient(volumeSlider, "#f3eee0", "#623c19cf");
  };

  const handleVolumeChange = () => {
    if (!$playerStore.currentAudio) return;
    // si je clique et que je suis muté ça doit me démuter
    if ($playerStore.currentAudio.muted) $playerStore.mute();

    $playerStore.currentAudio.volume = volume / 100;
    updateLinearGradient(volumeSlider, "#f3eee0", "#623c19cf");
  };

  const handleSeek = (e: any) => {
    $playerStore.seek(e.target.value);
    updateLinearGradient(progressBar, "#d17f33", "#623c19cf");
  };

  const handleClose = () => {
    $playerStore.stop();
    $playerStore.reset();
    updateLinearGradient(progressBar, "#d17f33", "#623c19cf");
  };
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<div
  id="audio_player__container"
  class="audio_player__hidden"
  class:show_player={$playerStore.show}
>
  <div id="audio_player__title__container">
    <div id="audio_player__title">
      {#if $playerStore.currentTrack && $playerStore.currentTrack.prefix}
        {prefix}{index} -
      {/if}
      {truncateString(title, maxTitleLength)}
    </div>
  </div>
  <div id="audio_player__controls">
    <div id="audio_player__progress_container">
      <div id="audio_player__actual_time">{actualTime}</div>
      <div id="audio_player__end_time">{endTime}</div>
      <input
        type="range"
        id="audio_player__progress"
        min="0"
        max="100"
        step="0.01"
        value="0"
        on:input={handleSeek}
        bind:this={progressBar}
      />
    </div>
    <div id="audio_player__controls_container">
      <div id="audio_player__main_controls">
        <div id="audio_player__close" on:click={handleClose}>close</div>
        <div id="audio_player__playpreviousnext">
          <i
            id="audio_player__prev"
            class="fas fa-step-backward"
            on:click={handlePrevious}
          ></i>
          <i
            id="audio_player__play"
            class="fas"
            class:fa-play={!$playerStore.playing}
            class:fa-pause={$playerStore.playing}
            on:click={handlePlayPause}
          ></i>
          <i
            id="audio_player__next"
            class="fas fa-step-forward"
            on:click={handleNext}
          ></i>
        </div>
        <div id="audio_player__volume_container">
          <i
            id="audio_player__mute"
            class="fas fa-volume-mute"
            on:click={handleMute}
          ></i>
          <input
            type="range"
            id="audio_player__volume"
            min="0"
            max="100"
            bind:value={volume}
            on:input={handleVolumeChange}
            bind:this={volumeSlider}
          />
        </div>
      </div>
    </div>
  </div>
</div>
