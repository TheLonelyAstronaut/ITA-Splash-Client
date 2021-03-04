export const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    let seconds: string | number = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;
    if (seconds == 60) {
        seconds = '00';
        return `${minutes + 1}:${seconds}`;
    } else return `${minutes}:${seconds}`;
};
