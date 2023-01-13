import {Howl} from "howler";

export class SongData {
    song_details = new URL("", "http://localhost/songs")
    song_storage = new URL("", "http://localhost/stream")
    trending_url = this.song_details + "/trending"
    song_name: string
    artist: Object
    album: Object
    filename: string

    constructor(json: {
        song_name: string, artist: Object, album: Object, filename: string
    }) {
        this.song_name = json.song_name;
        this.artist = json.artist;
        this.album = json.album
        this.filename = json.filename;
    }

    get URL(): string {
        return this.song_storage + "/" + this.filename;
    }

    howl(): Howl {
        return new Howl({
            src: this.URL.toString(),
            html5: true
        })
    }
}