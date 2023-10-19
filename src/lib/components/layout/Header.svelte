<script lang="ts">
    import {Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input, DarkMode, Search} from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<header>
    <Navbar>
        <NavHamburger></NavHamburger>
        <NavBrand class="flex md:order-1" href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">loa-schedule</span>
        </NavBrand>

        <!--
        <NavUl class="flex md:order-2">
            <NavLi>ToDo</NavLi>
        </NavUl>
        <div class="flex md:order-3">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <SearchOutline class="w-5 h-5" />
            </div>
            <Input id="search-navbar" class="pl-10" placeholder="아이디 검색..." />
        </div>
        -->
        <DarkMode class="flex md:order-4" />
    </Navbar>
</header>

<style>

</style>