export class Song {
  song_name : string
  artist : Object
  album : Object
  filename : string
  constructor(json: {
    song_name: string, artist: Object, album: Object, filename: string
  }) {
    this.song_name = json.song_name;
    this.artist = json.artist;
    this.album = json.album
    this.filename = json.filename;
  }
}