<script lang="ts">
    import { Card } from "flowbite-svelte";
    import {UserAddOutline} from "flowbite-svelte-icons";

    export let modal: boolean;
</script>

<Card size="md" on:click={ () => { modal = !modal; } } class="relative flex flex-col items-center justify-center w-1/7 h-full !p-4 hover:bg-gray-100 cursor-pointer">
    <div class="p-4 border-2 rounded-full">
        <UserAddOutline size="xl" />
    </div>
</Card>

<style>

</style>