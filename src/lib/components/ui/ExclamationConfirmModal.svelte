<script lang="ts">
import {ExclamationCircleOutline} from "flowbite-svelte-icons";
import {Button, Modal} from "flowbite-svelte";
import {createEventDispatcher} from "svelte";

export let open: boolean;
const dispatch = createEventDispatcher();

</script>

<Modal bind:open={ open } outsideclose>
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">정말 삭제하시겠습니까?</h3>
        <Button color="red" class="mr-2" on:click={ () => { dispatch("confirm"); } }>삭제</Button>
        <Button color="alternative" on:click={ () => { dispatch("cancel"); } }>취소</Button>
    </div>
</Modal>