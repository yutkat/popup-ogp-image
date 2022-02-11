<script lang="ts">
    import Button, { Label } from "@smui/button";
    import type { IStorage } from "../types";
    import Textfield from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";

    export let enable_sites: string;
    let successMessage: string = null;

    function save() {
        const storage: IStorage = {
            enable_sites,
        };

        chrome.storage.sync.set(storage, () => {
            successMessage = "Options saved!";

            setTimeout(() => {
                successMessage = null;
            }, 1500);
        });
    }
</script>

<div class="options">
    <Textfield
        textarea
        bind:value={enable_sites}
        label="EnableSite"
        input$rows={4}
        input$cols={60}
    >
        <HelperText slot="helper" />
    </Textfield>
    <Button color="secondary" on:click={save} variant="raised">
        <Label>Save</Label>
    </Button>
    {#if successMessage}<span class="success">{successMessage}</span>{/if}
</div>

<style>
    .options {
        min-width: 400px;
    }

    .success {
        color: #2ecc71;
        font-weight: bold;
    }
</style>

