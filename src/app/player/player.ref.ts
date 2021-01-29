export type PlayerSheetRef = {
    snapTo: ({ index: number }) => void;
};

let playerSheetRef: PlayerSheetRef = {} as PlayerSheetRef;

export const setPlayerSheetRef = (ref: PlayerSheetRef): void => {
    if (ref) {
        playerSheetRef = ref;
    }
};

export const openPlayer = (): void => {
    if (playerSheetRef.snapTo) {
        playerSheetRef.snapTo({ index: 1 });
    }
};
