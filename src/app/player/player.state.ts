export type Track = {
    id: string;
    url: string;
    title: string;
    artist: string;
    artwork: string;
};

export enum ControlActions {
    PAUSE_RESUME,
    SKIP_TO_NEXT,
    SKIP_TO_PREVIOUS,
}
