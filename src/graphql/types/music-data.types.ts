export type AddOrRemoveInput = {
    addOrRemoveData: {
        playlistID: number;
        trackID: number;
    };
};

export type TrackOutput = {
    id: number;
    title: string;
    url: string;
    liked: boolean;
    artwork: string;
    albumID: number;
    artistID: number;
    artistName: string;
};

export type PlaylistOutput = {
    name: string;
    id: number;
    liked: boolean;
    tracks: TrackOutput[];
};

export type GetPlaylistOutput = {
    getPlaylist: PlaylistOutput;
};

export type AddToPlaylistOutput = {
    addOrRemoveFromPlaylist: PlaylistOutput;
};

export type CreatePlaylistOutput = {
    createPlaylist: PlaylistOutput;
};

export type AlbumOutput = {
    name: string;
    id: number;
    artwork: string;
    tracks: TrackOutput[];
    artistName: string;
    artistID: number;
};

export type GetAlbumOutput = {
    getAlbum: AlbumOutput;
};

export type CreatePlaylistInput = {
    createPlaylistData: {
        name: string;
    };
};

export type AlbumInput = {
    albumID: number;
};
export type PlaylistInput = {
    playlistID: number;
};
