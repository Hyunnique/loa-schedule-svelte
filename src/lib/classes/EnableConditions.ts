interface IEnableConditions {
    bonusMin?: number;
    dayType?: number[];
}

export class EnableConditions {
    bonusMin: number;
    dayType: number[];

    constructor(params?: IEnableConditions) {
        this.bonusMin = params?.bonusMin ?? 0;
        this.dayType = params?.dayType ?? [0, 1, 2, 3, 4, 5, 6];
    }
}