import {makeAutoObservable} from "mobx";

class PlayerStore {
    song = "";
    avatar = "";
    close = false;
    currentTime = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setSong(song) {
        this.song = song;
    }

    setAvatar(ava) {
        this.avatar = ava;
    }

    setClose(close) {
        this.close = close;
    }

    setTime(time) {
        this.currentTime = time;
    }
}

export default new PlayerStore();