<div
  class="page__container-third page__container-basics page__container-basics-not-first"
  id="page-container-tracklisting"
>
  <div id="animated_circle__container" data-aos="fade">
    <div id="animated_circle__container_bis">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="-1 -1 2 2"
        id="animated_circle"
      >
        <g id="rotate-clockwise">
          <circle
            r="1"
            transform="scale(0.8)"
            stroke-width="0.025"
            class="circle_orange"
          />
          <circle
            r="1.1"
            transform="scale(0.8)"
            stroke-width="0.05"
            class="clignotte"
          />
          <circle r="1" transform="scale(0.5)" stroke-width="0.04" />
        </g>
        <g id="rotate-counter-clockwise">
          <circle
            r="1"
            transform="scale(0.6)"
            stroke-width="0.03333"
            class="circle_orange clignotte_decale"
          />
          <circle
            r="1"
            transform="scale(0.4)"
            stroke-width="0.03"
            class="circle_orange clignotte_decale"
          />
          <circle r="1" transform="scale(0.3333)" stroke-width="0.06" />
        </g>
      </svg>
    </div>
  </div>
  <a id="anchor__tracklisting" class="anchor-offset"></a>
  <section
    id="section__tracklisting"
    class="scroll-margin-top"
    data-aos="fade"
    data-aos-delay="300"
  >
    <div class="content__container">
      <div class="tracklisting__header">
        <h1 class="logo centrer bigger-text tracklisting__logo">
          Vinyl Tracklisting
        </h1>
        <br />
        <div class="flex centrer app__buttons radius">
          <label
            for="audioInput"
            class="home-secondary-button bigger-text centrer app__button"
            id="audioInputLabel"
            ><i class="fa-solid fa-upload"></i>  Import Audio</label
          >
          <input type="file" accept="audio/*" id="audioInput" multiple />
          <div
            id="sort"
            class="home-secondary-button bigger-text centrer app__button"
            onclick="sortAll()"
          >
            <i class="fa-solid fa-right-left"></i>  Sort Tracks
          </div>
          <div
            class="home-secondary-button bigger-text centrer app__button"
            onclick="addSides(availableSides)"
          >
            <i class="fa-regular fa-square-plus"></i>  Add sides
          </div>
          <div
            class="home-secondary-button bigger-text centrer app__button"
            onclick="removeSides(availableSides)"
          >
            <i class="fa-solid fa-eraser"></i>  Remove sides
          </div>
        </div>
        <div class="centrer disclaimer">
          <p>
            Add sides if need, import audio or fill your tracklist.<br />
            Then rearrange, you can also use sort button. <br />
            <br />
            Please note built-in audio player is only available in Chrome.
            <br />
            You can synchronize it with your sorted playlist.
            <br />
          </p>
        </div>
      </div>
      <!-- APP CONTAINER -->
      <div class="app__container" id="app"></div>
      <!-- BOTTOM BUTTON -->
      <div class="section__infos_next_button" id="continue">
        <div class="surligne-inverse">
          <a href="#section__release-infos">
            Fill informations  <i class="fa-solid fa-pen"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</div>
