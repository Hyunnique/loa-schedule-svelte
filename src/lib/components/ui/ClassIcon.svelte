<script lang="ts">

import { Avatar } from "flowbite-svelte";

import Destroyer from '$lib/images/destroyer.svg';
import Gunlancer from '$lib/images/gunlancer.svg';
import Berserker from '$lib/images/berserker.svg';
import Paladin from '$lib/images/paladin.svg';
import Slayer from '$lib/images/slayer.svg';

import Wardancer from '$lib/images/wardancer.svg';
import Scrapper from '$lib/images/scrapper.svg';
import Soulfist from '$lib/images/soulfist.svg';
import Glaivier from '$lib/images/glaivier.svg';
import Striker from '$lib/images/striker.svg';

import Deadeye from '$lib/images/deadeye.svg';
import Artillerist from '$lib/images/artillerist.svg';
import Sharpshooter from '$lib/images/sharpshooter.svg';
import Machinist from '$lib/images/machinist.svg';
import Gunslinger from '$lib/images/gunslinger.svg';

import Bard from '$lib/images/bard.svg';
import Summoner from '$lib/images/summoner.svg';
import Arcanist from '$lib/images/arcanist.svg';
import Sorceress from '$lib/images/sorceress.svg';

import Shadowhunter from '$lib/images/shadowhunter.svg';
import Deathblade from '$lib/images/deathblade.svg';
import Reaper from '$lib/images/reaper.svg';
import Souleater from '$lib/images/souleater.svg';

import Artist from '$lib/images/artist.svg';
import Aeromancer from '$lib/images/aeromancer.svg';

export let size: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
export let className: string;

function classImage(className: string) {
    switch (className) {
        case "디스트로이어": return Destroyer;
        case "워로드": return Gunlancer;
        case "버서커": return Berserker;
        case "홀리나이트": return Paladin;
        case "슬레이어": return Slayer;
        case "배틀마스터": return Wardancer;
        case "인파이터": return Scrapper;
        case "기공사": return Soulfist;
        case "창술사": return Glaivier;
        case "스트라이커": return Striker;
        case "데빌헌터": return Deadeye;
        case "블래스터": return Artillerist;
        case "호크아이": return Sharpshooter;
        case "스카우터": return Machinist;
        case "건슬링어": return Gunslinger;
        case "바드": return Bard;
        case "서머너": return Summoner;
        case "아르카나": return Arcanist;
        case "소서리스": return Sorceress;
        case "데모닉": return Shadowhunter;
        case "블레이드": return Deathblade;
        case "리퍼": return Reaper;
        case "소울이터": return Souleater;
        case "도화가": return Artist;
        case "기상술사": return Aeromancer;
        default: return "";
    }
}

function classColor(className: string) {
    switch (className) {
        case "디스트로이어":
        case "버서커":
        case "슬레이어":
        case "워로드":
        case "홀리나이트":
            return "ring-gray-500 dark:ring-gray-500";
        case "기공사":
        case "배틀마스터":
        case "스트라이커":
        case "인파이터":
        case "창술사":
            return "ring-yellow-300 dark:ring-yellow-300";
        case "건슬링어":
        case "데빌헌터":
        case "블래스터":
        case "스카우터":
        case "호크아이":
            return "ring-orange-400 dark:ring-orange-400";
        case "바드":
        case "서머너":
        case "소서리스":
        case "아르카나":
            return "ring-purple-400 dark:ring-purple-400";
        case "데모닉":
        case "리퍼":
        case "블레이드":
        case "소울이터":
            return "ring-indigo-400 dark:ring-indigo-400";
        case "기상술사":
        case "도화가":
            return "ring-pink-400 dark:ring-pink-400";
        default:
            return "ring-gray-500 dark:ring-gray-500";
    }
}

</script>

<Avatar size={ size } border class={ classColor(className) }>
    <img class="w-9/12 filter invert dark:invert-0" alt="class icon" src={ classImage(className) } />
</Avatar>

<style>
</style>