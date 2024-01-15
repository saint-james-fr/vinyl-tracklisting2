<script lang="ts">
  import Header from "components/Header/Header.svelte";
  import Hero from "components/Hero/Hero.svelte";
  import Timing from "components/Timing/Timing.svelte";
  import Sorter from "components/Sorter/Sorter.svelte";
  import ReleaseForm from "components/ReleaseForm/ReleaseForm.svelte";
  import AudioForm from "components/AudioForm/AudioForm.svelte";
  import Footer from "components/PDFForm/Footer.svelte";
  import Credits from "components/Credits/Credits.svelte";
  import AudioPlayer from "components/AudioPlayer/AudioPlayer.svelte";
  import AOS from "aos";

  import { playerStore, playlistStore } from "stores";

  AOS.init({
    once: true,
    duration: 800,
  });

  $: {
    console.log($playlistStore);
  }
</script>

<AudioPlayer />
<Header />
<Hero />
<Timing />
<Sorter />
<ReleaseForm />
<AudioForm />
<Footer />
<Credits />
