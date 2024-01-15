<script lang="ts">
  import { playerStore, playlistStore } from "stores";
  import { secondsToMinute, formatTime } from "lib/time";

  let progress = 0;
  let volume = 100;
  let title = "";
  let endTime = "";
  let actualTime = "";

  $: {
    if ($playerStore.currentAudio) {
      $playerStore.currentAudio.volume = volume / 100;
      requestAnimationFrame(() => {
        if (!$playerStore.currentAudio) return;
        progress =
          ($playerStore.currentAudio.currentTime * 100) /
          $playerStore.currentAudio.duration;
      });
    }
    if (
      $playerStore.currentTrack &&
      $playerStore.currentTrack.title &&
      $playerStore.currentTrack.length
    ) {
      title = $playerStore.currentTrack.title;
      endTime = `${formatTime(
        secondsToMinute($playerStore.currentTrack.length)[0]
      )}:${formatTime(secondsToMinute($playerStore.currentTrack.length)[1])}`;
      let progressInSeconds = Math.trunc(
        ($playerStore.currentTrack.length * progress) / 100
      );
      let pMinutes = secondsToMinute(progressInSeconds)[0];
      let pSeconds = secondsToMinute(progressInSeconds)[1];
      actualTime = `${formatTime(pMinutes)}:${formatTime(pSeconds)}`;
    }
  }

  const handlePrevious = () => {
    $playerStore.stop();
    $playlistStore.synchronize();
    $playerStore.previous();
    $playerStore.playPause();
  };

  const handlePlayPause = () => {
    $playerStore.playPause();
  };

  const handleNext = () => {
    $playerStore.stop();
    $playlistStore.synchronize();
    $playerStore.next();
    $playerStore.playPause();
  };

  const handleMute = () => {
    $playerStore.mute();
  };

  const handleSeek = (e: any) => {
    $playerStore.seek(e.target.value);
  };
</script>
ne
<div id="audio_player__container" class="audio_player__hidden">
  <div id="audio_player__title__container">
    <div id="audio_player__title">{title}</div>
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
        on:input={handleSeek}
        bind:value={progress}
      />
    </div>
    <div id="audio_player__controls_container">
      <div id="audio_player__main_controls">
        <div id="audio_player__close">close</div>
        <i id="syncButton" class="fas fa-solid fa-rotate"></i>
        <div id="audio_player__playpreviousnext">
          <i
            id="audio_player__prev"
            class="fas fa-step-backward"
            on:click={handlePrevious}
          ></i>
          <i
            id="audio_player__play"
            class="fas fa-play"
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
          />
        </div>
      </div>
    </div>
  </div>
</div>
