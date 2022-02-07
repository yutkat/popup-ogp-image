<script lang="ts">
  import Popover from "svelte-easy-popover";
  import axios from "axios";
  import { extractOpenGraph } from "@devmehq/open-graph-extractor";
  import { fade } from "svelte/transition";

  export let referenceElement: HTMLLinkElement;

  function check_CORS(url: string): boolean {
    const current = new URL(window.location.href);
    const target = new URL(url);
    if (current.host == target.host) {
      return true;
    }
    return false;
  }

  async function get_ogp2(url: string) {
    if (!check_CORS(url)) {
      return;
    }
    try {
      const res = await axios.get(url);
      const openGraph = extractOpenGraph(res.data);
      return openGraph;
    } catch {}
  }
</script>

<Popover
  triggerEvents={["hover"]}
  {referenceElement}
  placement="top"
  spaceAway={10}
>
  <div class="popover-contents" transition:fade={{ duration: 250 }}>
    {#await get_ogp2(referenceElement.href) then og}
      {#if og}
        <img src={og.ogImage.url} alt="ogp preview" width="400" height="200" />
      {/if}
    {/await}
  </div>
</Popover>

<style>
  .popover-contents {
  }
</style>

