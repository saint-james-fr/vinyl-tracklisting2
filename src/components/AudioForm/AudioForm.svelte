<script lang="ts">
  import { formStore } from "stores";
  import { generatePDF } from "lib/pdf";

  let bitDepth = "";
  let sampleRate = "";
  let comments = "";

  $: formStore.update((store) => {
    store.bitDepth = bitDepth;
    store.sampleRate = sampleRate;
    store.comments = comments;
    return store;
  });
</script>

<div class="page__container-basics page__container-basics-not-first last__page">
  <section id="section__audio-infos" class="scroll-margin-top">
    <div class="content__container" id="audio_infos_form">
      <form id="form_page_two" data-aos="fade">
        <div class="form__container">
          <div class="radio__container">
            <div class="form__label form_label-checkbox form-min-width">
              Sample Rate
            </div>
            <div class="radio__container__sub">
              <label class="form__label"
                ><input
                  type="radio"
                  name="sample_rate"
                  bind:group={sampleRate}
                  value="44.1kHz"
                  data-form-type="other"
                />44.1kHz</label
              >
              <label class="form__label"
                ><input
                  type="radio"
                  name="sample_rate"
                  bind:group={sampleRate}
                  value="48kHz"
                  data-form-type="other"
                />48kHz</label
              >
              <label class="form__label"
                ><input
                  type="radio"
                  name="sample_rate"
                  bind:group={sampleRate}
                  value="88.2kHz"
                  data-form-type="other"
                />88.2kHz</label
              >
              <label class="form__label"
                ><input
                  type="radio"
                  name="sample_rate"
                  bind:group={sampleRate}
                  value="96kHz"
                  data-form-type="other"
                />96kHz</label
              >
            </div>
          </div>
          <div class="radio__container">
            <div
              id="form-bit-depth"
              class="form__label form_label-checkbox form-min-width"
            >
              Bit Depth
            </div>
            <div class="radio__container__sub">
              <label class="form__label"
                ><input
                  type="radio"
                  name="bit_depth"
                  bind:group={bitDepth}
                  value="16bits"
                  data-form-type="other"
                />16Bits</label
              >
              <label class="form__label"
                ><input
                  type="radio"
                  name="bit_depth"
                  bind:group={bitDepth}
                  value="24Bits"
                  data-form-type="other"
                />24Bits</label
              >
              <label class="form__label"
                ><input
                  type="radio"
                  name="bit_depth"
                  bind:group={bitDepth}
                  value="32Bits"
                  data-form-type="other"
                />32Bits</label
              >
            </div>
          </div>
          <div class="comments-container">
            <label>
              <span class="form__label form_label-checkbox form-min-width"
                >Comments</span
              >
              <textarea
                id="comments"
                name="comments"
                bind:value={comments}
                cols="30"
                rows="6"
                data-form-type="other"
              ></textarea>
            </label>
          </div>
          <div class="section__infos_next_button">
            <a id="generatePDF" on:click={generatePDF}>
              <span class="surligne-inverse">
                Export PDF   <i class="fa-solid fa-file-pdf"></i>
              </span>
            </a>
          </div>
        </div>
      </form>
    </div>
  </section>
</div>
