<div id="audio_player__container" class="audio_player__hidden">
  <div id="audio_player__title__container">
    <div id="audio_player__title"> </div>
  </div>
  <div id="audio_player__controls">
    <div id="audio_player__progress_container">
      <div id="audio_player__actual_time"></div>
      <div id="audio_player__end_time"></div>
      <input
        type="range"
        id="audio_player__progress"
        min="0"
        max="100"
        value="0"
        step="0.01"
      />
    </div>
    <div id="audio_player__controls_container">
      <div id="audio_player__main_controls">
        <div id="audio_player__close">close</div>
        <i id="syncButton" class="fas fa-solid fa-rotate"></i>
        <div id="audio_player__playpreviousnext">
          <i id="audio_player__prev" class="fas fa-step-backward"></i>
          <i id="audio_player__play" class="fas fa-play"></i>
          <i id="audio_player__next" class="fas fa-step-forward"></i>
        </div>
        <div id="audio_player__volume_container">
          <i id="audio_player__mute" class="fas fa-volume-mute"></i>
          <input
            type="range"
            id="audio_player__volume"
            min="0"
            max="100"
            value="100"
          />
        </div>
      </div>
    </div>
  </div>