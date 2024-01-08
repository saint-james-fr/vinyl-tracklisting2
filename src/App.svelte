<script lang="ts">
  import Header from "components/Header/Header.svelte";
  import Hero from "components/Hero/Hero.svelte";
  import Timing from "components/Timing/Timing.svelte";
  import Sorter from "components/Sorter/Sorter.svelte";
  import ReleaseForm from "components/ReleaseForm/ReleaseForm.svelte";
  import AudioForm from "components/AudioForm/AudioForm.svelte";
  import Footer from "components/PDFForm/Footer.svelte";
  import AOS from "aos";

  AOS.init({
    once: true,
    duration: 800,
  });

  console.log("********************");
  console.log("Design & Code by Maxence Robinet");
  console.log("www.maxencerobinet.fr");
  console.log("********************");
</script>

<Header />
<Hero />
<Timing />
<Sorter />
<ReleaseForm />
<AudioForm />
<Footer />
