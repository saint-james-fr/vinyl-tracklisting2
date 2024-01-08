<script lang="ts">
  import { launchSine } from "lib/sine";
  import { onMount } from "svelte";
  import modal from "lib/modal";

  let c: HTMLCanvasElement;
  let modalInstance: {
    handleButtonClick: (modalElement: HTMLDivElement) => void;
    handleCloseClick: (modalElement: HTMLDivElement) => void;
    outsideClick: (modalElement: HTMLDivElement, e: MouseEvent) => void;
  };

  // Get the modal
  let modalElement: HTMLDivElement;

  onMount(() => {
    launchSine(c);
    modalInstance = modal();
  });
</script>

<svelte:window on:click={(e) => modalInstance.outsideClick(modalElement, e)} />

<div class="page__container-first">
  <section id="section__home" class="scroll-margin-top">
    <div id="section__home_background">
      <div class="content__container">
        <div class="logo">vinyl tracklisting</div>
      </div>
    </div>
    <div class="home__infos_container">
      <div class="home__infos" data-aos="fade">
        <div class="home__infoblock">
          <span class="block-title"
            >Simply choose <br /><span class="surligne surligne__padding"
              >the best distribution</span
            ><br />for your vinyl</span
          >
          <div class="block-paragraph">
            <p>
              This website helps you to generate your very own tracklisting for
              professional use with all informations needed.
            </p>
            <p>
              It's <strong>simple, easy, effective</strong> and can be used by
              all recording industry professionals.<br />
            </p>
            <p>
              Also, it's <strong>free</strong> and
              <strong>we don't collect any data.</strong>
            </p>
          </div>
        </div>
        <div class="canvas-container">
          <canvas bind:this={c}> </canvas>
        </div>
        <div class="home_infoblock grid5">
          <div
            on:click={() => modalInstance.handleButtonClick(modalElement)}
            class="clickable-div home-secondary-button"
          >
            <span class="bigger-text"
              ><i class="fa-solid fa-record-vinyl"></i> About pressing vinyl</span
            >
          </div>
          <div class="home-main-button">
            <a href="#section__tracklisting"
              ><span class="bigger-text"
                ><i class="fa-solid fa-list"></i> Create your tracklist.</span
              ></a
            >
          </div>
        </div>
        <div class="modal-technical-infos">
          <!-- The Modal -->
          <div bind:this={modalElement} class="modal">
            <!-- Modal content -->
            <div class="modal-content">
              <div class="modal-header">
                <span
                  on:click={() => modalInstance.handleCloseClick(modalElement)}
                  class="home__button">&times;</span
                >
                <h2>Technical Informations</h2>
              </div>
              <div class="modal-body">
                <div class="block-paragraph">
                  <ul>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> The first thing to
                      know is that the more music there is on one side, the less
                      dynamic and therefore, we approach the surface noise.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> On a 12inch,
                      ideally, it should not exceed 20 minutes at 33 RPM 1/3 and
                      12 minutes at 45 RPM.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> Ideally, you
                      should place the energetic tracks on the beginning of the
                      side.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> The more stereo
                      there is, the more space the groove will take.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> You can burn mono
                      music louder than stereo music.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> Quieter tracks
                      take up less space than heavy tracks.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> High frequencies
                      are more difficult to engrave.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> Too much high
                      frequencies cause saturation during playback.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> Do not push the
                      stereo to low frequencies.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> Apply a strong
                      deesser to the vocals.
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> Do not compress
                      the track too much - it is better for the cut (Ex: DR 14
                      db).
                    </li>
                    <li>
                      <i class="fa-solid fa-arrow-right"></i> Think from the
                      start of production to work in high resolution (minimum 24
                      bits/ 48 kHz).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
