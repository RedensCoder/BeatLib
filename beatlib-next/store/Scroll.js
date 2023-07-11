import {makeAutoObservable} from "mobx";

class Scroll {
    constructor() {
        makeAutoObservable(this);
    }

    scroll_y = 0;
    in_height = 0;

    scroll_fn(y, h) {
        this.scroll_y = y;
        this.in_height = h;
    }
}

export default new Scroll();