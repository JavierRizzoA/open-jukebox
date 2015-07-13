var JUKEBOX = JUKEBOX || {};

JUKEBOX.populateAlbumCovers = function(albums) {
    for(album in albums) {
        $('#albumCovers').html($('#albumCovers').html() + '<div><div class="image"><img data-lazy="' + albums[album].getPath() + '/cover.jpg"/></div></div>');
    }
};

JUKEBOX.Song = function(name, album) {
    var song = {};
    song.name = name;
    song.album = album;
    song.getPath = function() {
        return this.album.getPath() + "/" + this.name + ".mp3";
    };

    song.play = function() {
        if(Math.round(JUKEBOX.player.position) === Math.round(JUKEBOX.player.duration)) {
            JUKEBOX.player = new JUKEBOX.Audio5js({format_time: false});
            JUKEBOX.player.on('ended', function() {
                JUKEBOX.nowPlaying = null;
                $('#nowPlaying').hide();
                if(JUKEBOX.playlist.length > 0) {
                    JUKEBOX.playlist.shift().play();
                }
            }, this);
            JUKEBOX.player.on('play', function(){$('#playPauseButton').html('<span class="glyphicon glyphicon-pause"></span>');}, this);
            JUKEBOX.player.on('pause', function(){$('#playPauseButton').html('<span class="glyphicon glyphicon-play"></span>');}, this);
            JUKEBOX.player.load(this.getPath());
            JUKEBOX.player.play();
            JUKEBOX.nowPlaying = this;
            $('#nowPlaying').html("Now Playing: " + JUKEBOX.nowPlaying.name);
            $('#nowPlaying').show();
        } else {
            JUKEBOX.playlist.push(this);
        }
        JUKEBOX.updatePlaylistList();
    };
    return song;
};

JUKEBOX.Album = function(name, artist, libraryPath) {
    var fs = require('fs');
    var album = {};
    album.name = name;
    album.artist = artist;
    album.libraryPath = libraryPath;
    album.songs = [];
    album.getPath = function() {
        return this.libraryPath + "/" + this.artist + "/" + this.name;
    };

    var files = fs.readdirSync(album.getPath());
    for(f in files) {
        if(files[f].split(".").pop() === "mp3") {
            album.songs.push(JUKEBOX.Song(files[f].substring(0, files[f].length - 4), album));
        }
    }

    return album;
};

JUKEBOX.getAllAlbums = function(libraryPath) {
    var fs = require('fs');
    var albums = [];

    var files = fs.readdirSync(libraryPath);
    var artistNames = [];
    for(f in files) {
        if(fs.lstatSync(libraryPath + "/" + files[f]).isDirectory()) {
            artistNames.push(files[f]);
        }
    }

    for(a in artistNames) {
        files = fs.readdirSync(libraryPath + "/" + artistNames[a]);
        for(f in files) {
            if(fs.lstatSync(libraryPath + "/" + artistNames[a] + "/" + files[f]).isDirectory()) {
                albums.push(JUKEBOX.Album(files[f], artistNames[a], libraryPath));
            }
        }
    }

    return albums;
};

JUKEBOX.updateAlbumList = function(currentSlide) {
    $('#albumList').html("");
    for(s in JUKEBOX.albums[currentSlide].songs) {
        $('#albumList').html($('#albumList').html() + '<li class="list-group-item"><span class="badge"><a href="javascript:JUKEBOX.albums[' + currentSlide + '].songs[' + s + '].play()">Add to playlist</a></span>' + JUKEBOX.albums[currentSlide].songs[s].name + '</li>');
    }
};

JUKEBOX.nextSong = function() {
    if(JUKEBOX.player.duration > 0)
        JUKEBOX.player.seek(JUKEBOX.player.duration - 0.01);
};

JUKEBOX.restartSong = function() {
    if(JUKEBOX.player.duration > 0)
        JUKEBOX.player.seek(0);
};

JUKEBOX.backward = function() {
    if(JUKEBOX.player.duration > 0)
        if(JUKEBOX.player.position - 5 > 0) {
            JUKEBOX.player.seek(JUKEBOX.player.position - 5);
        } else {
            JUKEBOX.player.seek(0);
        }
};

JUKEBOX.forward = function() {
    if(JUKEBOX.player.duration > 0)
        if(JUKEBOX.player.position + 5 < JUKEBOX.player.duration) {
            JUKEBOX.player.seek(JUKEBOX.player.position + 5);
        } else {
            JUKEBOX.player.seek(JUKEBOX.player.duration - 0.01);
        }
};

JUKEBOX.addAlbumToPlaylist = function(album) {
    for(s = 0; s < album.songs.length; s++) {
        if(s === 0) {
            album.songs[s].play();
        } else {
            JUKEBOX.playlist.push(album.songs[s]);
        }
    }
    JUKEBOX.updatePlaylistList();
};

JUKEBOX.updatePlaylistList = function() {
    var playlistList = $('#playlistList');
    playlistList.html("");
    if(JUKEBOX.nowPlaying !== null) {
        playlistList.html('<li class="list-group-item disabled">Now playing: ' + JUKEBOX.nowPlaying.name + '</li>');
        for(s in JUKEBOX.playlist) {
            playlistList.html(playlistList.html() + '<li class="list-group-item">' + JUKEBOX.playlist[s].name + '<span class="badge"><a href="javascript:JUKEBOX.removePlaylistSong(' + s + ');"><span class="glyphicon glyphicon-trash"></span></a></span></li>');
        }
    } else {
        playlistList.html('<li class="list-group-item disabled">There are no songs in playlist</li>');
    }
};

JUKEBOX.removePlaylistSong = function(n) {
    JUKEBOX.playlist.splice(n, 1);
    JUKEBOX.updatePlaylistList();
};

$(document).ready(function() {
    JUKEBOX.albums = JUKEBOX.getAllAlbums('Library');
    JUKEBOX.populateAlbumCovers(JUKEBOX.albums);

    $('.albumCovers').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '30px',
        lazyLoad: 'ondemand',
        swipeToSlide: true,
        speed: 50
    });

    $('.albumCovers').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        JUKEBOX.updateAlbumList(currentSlide);
        $('#addAlbum').children(0).attr('href', 'javascript:JUKEBOX.addAlbumToPlaylist(JUKEBOX.albums[' + currentSlide + '])');
    });

    JUKEBOX.Audio5js = require('audio5');
    JUKEBOX.player = new JUKEBOX.Audio5js();
    JUKEBOX.playlist = [];
    JUKEBOX.nowPlaying = null;

    $('#addAlbum').children(0).attr('href', 'javascript:JUKEBOX.addAlbumToPlaylist(JUKEBOX.albums[0])');
    JUKEBOX.updateAlbumList(0);
    JUKEBOX.updatePlaylistList();
    $('#nowPlaying').hide();
});

