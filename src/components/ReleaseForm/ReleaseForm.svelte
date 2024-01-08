<script lang="ts">
  
</script>

<div class="page__container-basics page__container-basics-not-first">
  <a id="anchor__release-infos" class="anchor-offset"></a>
  <div class="bandeau"></div>
  <section id="section__release-infos" class="scroll-margin-top">
    <div class="content__container">
      <form id="form_page_one" data-aos="fade">
        <div class="form__container">
          <label for="catnumber" class="form__label"
            >Catalogue Number*
            <input
              id="catnumber"
              type="text"
              class="input-border"
              data-form-type="other"
            />
          </label>
          <label for="artist" class="form__label"
            >Artist*
            <input
              id="artist"
              type="text"
              class="input-border"
              data-form-type="other"
            />
          </label>
          <label for="title" class="form__label"
            >Title*
            <input
              id="title"
              type="text"
              class="input-border"
              data-form-type="other"
            />
          </label>
          <div class="radio__container">
            <div class="form__label form_label-checkbox form-min-width">
              Format*
            </div>
            <div class="radio__container__sub">
              <label class="form__label">
                <input
                  type="radio"
                  name="format"
                  value='LP/12"'
                  data-form-type="other"
                />LP/12"
              </label>
              <label class="form__label"
                ><input
                  type="radio"
                  name="format"
                  value='10"'
                  data-form-type="other"
                />10"</label
              >
              <label class="form__label"
                ><input
                  type="radio"
                  name="format"
                  value='7"'
                  data-form-type="other"
                />7"</label
              >
            </div>
          </div>
          <div class="radio__container">
            <div class="form__label form_label-checkbox form-min-width">
              Speed*
            </div>
            <div class="radio__container__sub">
              <label class="form__label"
                ><input
                  type="radio"
                  name="speed"
                  value="33RPM"
                  data-form-type="other"
                />33RPM</label
              >
              <label class="form__label"
                ><input
                  type="radio"
                  name="speed"
                  value="45RPM"
                  data-form-type="other"
                />45RPM</label
              >
            </div>
          </div>
          <div class="section__infos_next_button">
            <a href="#section__audio-infos"
              ><span class="surligne-inverse"
                >Continue   <i class="fa-solid fa-turn-down"></i></span
            ></a>
          </div>
        </div>
      </form>
    </div>
  </section>
</div>
