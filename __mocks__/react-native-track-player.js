export const Capability = {
    Play: 0,
    PlayFromId: 1,
    PlayFromSearch: 2,
    Pause: 3,
    Stop: 4,
    SeekTo: 5,
    Skip: 6,
    SkipToNext: 7,
    SkipToPrevious: 8,
    JumpForward: 9,
    JumpBackward: 10,
    SetRating: 11,
    Like: 12,
    Dislike: 13,
    Bookmark: 14,
};

export const Event = {
    PlaybackState: 'playback-state',
    PlaybackError: 'playback-error',
    PlaybackQueueEnded: 'playback-queue-ended',
    PlaybackTrackChanged: 'playback-track-changed',
    RemotePlay: 'remote-play',
    RemotePlayId: 'remote-play-id',
    RemotePlaySearch: 'remote-play-search',
    RemotePause: 'remote-pause',
    RemoteStop: 'remote-stop',
    RemoteSkip: 'remote-skip',
    RemoteNext: 'remote-next',
    RemotePrevious: 'remote-previous',
    RemoteJumpForward: 'remote-jump-forward',
    RemoteJumpBackward: 'remote-jump-backward',
    RemoteSeek: 'remote-seek',
    RemoteSetRating: 'remote-set-rating',
    RemoteDuck: 'remote-duck',
    RemoteLike: 'remote-like',
    RemoteDislike: 'remote-dislike',
    RemoteBookmark: 'remote-bookmark',
};

export const setupPlayer = jest.fn();

export const updateOptions = jest.fn();

export const addEventListener = jest.fn();
