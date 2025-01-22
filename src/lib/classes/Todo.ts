import { Breakpoint } from "$lib/classes/Breakpoint";
import { EnableConditions } from "$lib/classes/EnableConditions";

interface ITodo {
    type: "Check" | "Breakpoint";

    name?: string;
    id?: string;
    memo?: string;
    important?: boolean;

    bonus?: boolean;
    bonusMin?: number;
    bonusCurrent?: number;

    countCurrent?: number;
    countMax?: number;

    resetPeriod?: number;
    resetNext?: number;

    rewardable?: boolean;
    enableConditions?: EnableConditions;

    breakpoints?: Breakpoint[];
}

export class Todo {
    type: "Check" | "Breakpoint";

    name: string;
    id: string;
    memo: string;
    important: boolean;

    bonus: boolean;
    bonusCurrent: number;

    countCurrent: number;
    countMax: number;

    resetPeriod: number;
    resetNext: number;

    rewardable: boolean;
    enableConditions: EnableConditions;

    breakpoints: Breakpoint[];

    constructor(params?: ITodo) {
        this.name = params?.name ?? "";
        this.type = params?.type ?? "Check";
        this.id = params?.id ?? "0";
        this.memo = params?.memo ?? "";
        this.important = params?.important ?? false;

        this.bonus = params?.bonus ?? false;
        this.bonusCurrent = params?.bonusCurrent ?? 0;

        this.countCurrent = params?.countCurrent ?? 0;
        this.countMax = params?.countMax ?? 1;

        this.rewardable = params?.rewardable ?? true;

        if (params?.enableConditions != null) {
            this.enableConditions = new EnableConditions(params.enableConditions);
        } else {
            this.enableConditions = new EnableConditions();
        }

        this.breakpoints = [];

        if (params?.breakpoints != null) {
            for (const breakpoint of params.breakpoints) {
                this.breakpoints.push(
                    new Breakpoint(breakpoint)
                );
            }
        }

        this.resetPeriod = params?.resetPeriod ?? 0;
        this.resetNext = params?.resetNext ?? this.calculateNextReset();
    }

    calculateNextReset(): number {
        const resetDefault: Date = new Date(2023, 10 - 1, 25, 6, 0, 0, 0);
        const now: Date = new Date();
        const timeDiff: number = now.getTime() - resetDefault.getTime();

        if (this.type == "Check") {
            const diffPeriod = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / this.resetPeriod) + 1;
            return resetDefault.getTime() + diffPeriod * this.resetPeriod * 24 * 60 * 60 * 1000;
        } else if (this.type == "Breakpoint") {
            for (const breakpoint of this.breakpoints) {
                breakpoint.resetNext = breakpoint.calculateNextReset();
            }
        }

        return 0;
    }

    checkReset(): void {
        const now: Date = new Date();

        if (this.type == "Check") {
            if (this.resetNext <= now.getTime()) {
                if (this.bonus) {
                    for (let i = 0; i < this.countCurrent; i++) {
                        if (this.id === "dungeon.chaosnew") {
                            if (this.bonusCurrent >= 40) this.bonusCurrent -= 40;
                        }
                        else {
                            if (this.bonusCurrent >= 20) this.bonusCurrent -= 20;
                        }
                    }

                    const timeDiff: number = now.getTime() - this.resetNext;
                    const diffPeriod: number = Math.floor(timeDiff / 1000 / 60 / 60 / 24) + 1;

                    if (this.id === "dungeon.chaosnew") this.bonusCurrent += (diffPeriod * this.countMax - this.countCurrent) * 20;
                    else this.bonusCurrent += (diffPeriod * this.countMax - this.countCurrent) * 10;

                    if ((this.id === "dungeon.chaos" || this.id === "dungeon.chaosnew") && this.bonusCurrent > 200) this.bonusCurrent = 200;
                    else if ((this.id !== "dungeon.chaos" && this.id !== "dungeon.chaosnew") && this.bonusCurrent > 100) this.bonusCurrent = 100;
                }

                this.countCurrent = 0;
                this.resetNext = this.calculateNextReset();
            }
        } else {
            for (const breakpoint of this.breakpoints) {
                if (breakpoint.resetNext <= now.getTime()) {
                    breakpoint.done = false;
                    if (breakpoint.disabled === 1) breakpoint.disabled = 0;

                    breakpoint.resetNext = breakpoint.calculateNextReset();
                }
            }
        }
    }
}