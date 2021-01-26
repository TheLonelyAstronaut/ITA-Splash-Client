export interface DummyScreenParams {
    name: string;
    backgroundColor: string;
    nextScreen: string;
    paddingBottom?: number;
}

export type MainTabsParams = {
    Home: DummyScreenParams;
    Search: DummyScreenParams;
    Library: DummyScreenParams;
};
