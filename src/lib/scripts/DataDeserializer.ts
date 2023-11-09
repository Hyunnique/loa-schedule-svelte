import { Character as Character_1_0 } from "$lib/classes/Character";

const CURRENT_VERSION = "1.0";
function dataDeserializer(version: string | null, data: string | null) {
    if (version === null) {
        return initializeDefault();
    } else {
        if (data === null) return initializeDefault();

        if (version === "1.0") {
            const CharacterData: Character_1_0[] = JSON.parse(data);
            const result: Character_1_0[] = [];

            for (const character of CharacterData) {
                result.push(new Character_1_0(character));
            }

            return result;
        } else {
            return initializeDefault();
        }
    }
}

function initializeDefault() {
    localStorage.setItem("version", CURRENT_VERSION);
    return [];
}
export default dataDeserializer;