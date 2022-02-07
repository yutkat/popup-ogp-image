import Options from "./components/Options.svelte";
import type { IStorage } from "./types";
import { Config } from "./default_config";

function restoreOptions() {
  chrome.storage.sync.get(
    { enable_sites: Config.enable_sites } as IStorage,
    ({ enable_sites }: IStorage) => {
      const app = new Options({
        target: document.body,
        props: { enable_sites },
      });
    }
  );
}

document.addEventListener("DOMContentLoaded", restoreOptions);
