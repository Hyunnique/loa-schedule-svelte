<script lang="ts">

import { Avatar } from "flowbite-svelte";
export let size: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
export let className: string;

let classPosition: string = "";


</script>

<Avatar size={ size }>
</Avatar>

<style>
</style>