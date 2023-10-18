<script lang="ts">
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<header>
    <Navbar>
        <NavBrand href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">loa-schedule</span>
        </NavBrand>

        <NavUl>
            <NavLi></NavLi>
        </NavUl>
        <NavHamburger></NavHamburger>
    </Navbar>
</header>

<style>

</style>