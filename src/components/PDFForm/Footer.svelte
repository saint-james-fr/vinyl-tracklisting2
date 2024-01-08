<script lang="ts">
  import { onMount } from "svelte";
  let result = "";

  onMount(() => {
    let igqmim = [
      "aQ",
      "dA",
      "cg",
      "YQ",
      "bQ",
      "bg",
      "Yw",
      "dA",
      "Lw",
      "bQ",
      "IA",
      "eQ",
      "ZQ",
      "PA",
      "Zw",
      "Ig",
      "bA",
      "YQ",
      "bg",
      "dA",
      "aw",
      "bw",
      "dA",
      "cw",
      "bg",
      "aQ",
      "aA",
      "aQ",
      "Yw",
      "Zg",
      "bw",
      "Og",
      "dA",
      "bw",
      "Yw",
      "PA",
      "bw",
      "YQ",
      "bA",
      "Pg",
      "Yw",
      "LQ",
      "dA",
      "YQ",
      "cg",
      "Qw",
      "Pg",
      "YQ",
      "Ig",
      "PQ",
      "dA",
      "Yw",
      "dg",
      "QA",
      "bA",
      "aQ",
      "Lg",
      "YQ",
      "bg",
    ];
    let otmtjm = [
      11, 51, 31, 52, 45, 40, 16, 22, 56, 9, 2, 27, 5, 0, 41, 8, 28, 32, 26, 13,
      34, 44, 19, 37, 18, 39, 3, 36, 21, 6, 17, 15, 30, 49, 53, 55, 14, 1, 12,
      47, 43, 29, 38, 20, 4, 48, 58, 57, 46, 7, 54, 33, 24, 23, 35, 25, 42, 10,
      50,
    ];
    let bcuoyj = new Array();

    for (let i = 0; i < otmtjm.length; i++) bcuoyj[otmtjm[i]] = igqmim[i];

    for (let i = 0; i < bcuoyj.length; i++) result += atob(bcuoyj[i] + "==");
  });
</script>

<footer class="footer">
  <div class="content__container flex">
    <div class="tiers-credits" data-aos="fade" data-aos-delay="300">
      Original concept by 
      <a href="https://mathieuberthet.com/" target="blank"> Mathieu Berthet</a>
    </div>
    <div class="tiers-credits" data-aos="fade" data-aos-delay="450">
      Coded by 
      <a href="https://www.maxencerobinet.fr" target="blank">
        Maxence Robinet</a
      >
    </div>
    <div class="tiers-credits" data-aos="fade" data-aos-delay="600">
      {@html result}
    </div>
  </div>
</footer>
