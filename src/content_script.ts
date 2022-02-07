import App from "./components/LinkPreview.svelte";
import type { IStorage } from "./types";
import { is_IStorage } from "./types";
import { Config } from "./default_config";

const get_storage = (key = null) =>
  new Promise((resolve) => {
    chrome.storage.sync.get(key, (data) => {
      resolve(data);
    });
  });

function enable_site(enable_sites: string[]): boolean {
  const current_site = new URL(window.location.href);
  for (const e of enable_sites) {
    const re = new RegExp(e, "g");
    if (re.test(current_site.toString())) {
      return true;
    }
  }
  return false;
}

(async () => {
  const sites = await get_storage({
    enable_sites: Config.enable_sites,
  } as IStorage);
  if (is_IStorage(sites)) {
    if (!enable_site(sites.enable_sites.split("\n"))) {
      return;
    }
  } else {
    return;
  }
  console.log(sites);

  const popup = document.createElement("div");
  popup.setAttribute("id", "ogp-hover");
  document.body.appendChild(popup);

  const mouseTargets = document.getElementsByTagName("a");
  for (const mouseTarget of mouseTargets) {
    const app = new App({
      target: document.getElementById("ogp-hover")!,
      props: { referenceElement: mouseTarget },
    });
  }
})();
