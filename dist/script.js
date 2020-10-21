// elements
let echo;
let goBtn;
let dirInput;
let httpsCheckbox;
let keepAwakeCheckbox;
let debugCheckbox;
let audio;
let btnPrev;
let btnNext;
let playlistLinks;
let gleaner;
let vid;

// data
let playlist;
let playlistIndex = 0;
let currentTime = 0;
let cookies;

function getRefs() {
  echo = document.querySelector( '#echo' );
  goBtn = document.querySelector( 'button.go' );
  dirInput = document.querySelector( '#dirpath' );
  httpsCheckbox = document.querySelector( '#https' );
  keepAwakeCheckbox = document.querySelector( '#keepawake' );
  debugCheckbox = document.querySelector( '#debug' );
  audio = document.querySelector( 'audio' );
  btnPrev = document.querySelector( 'button.prev' );
  btnNext = document.querySelector( 'button.next' );
  playlistLinks = document.querySelector( '.playlist-links' );
  gleaner = document.querySelector( '.gleaner' );
}

function init() {
  trace( 'init' );
  if( window.location.protocol === 'https:' ){
    trace( '\tprotocol is https:' );
    trace( httpsCheckbox );
    httpsCheckbox.checked = true;
  } else {
    trace( 'window.location.protocol : ' + window.location.protocol );
  }
}

function addListeners() {
  trace( 'addListeners' );
  goBtn.addEventListener( 'click', goBtnClicked );
  httpsCheckbox.addEventListener( 'click', httpsClicked );
  keepAwakeCheckbox.addEventListener( 'click', keepAwakeClicked );
  debugCheckbox.addEventListener( 'click', debugClicked );
  btnPrev.addEventListener( 'click', playPrev );
  btnNext.addEventListener( 'click', playNext );
  window.addEventListener( 'beforeunload', ( e ) => {
    cookies.write( 'currentTime', audio.currentTime );
  } );

  // audio
  audio.addEventListener( 'abort', audioEventOccurred );
  audio.addEventListener( 'canplay', audioEventOccurred );
  audio.addEventListener( 'canplaythrough', audioEventOccurred );
  audio.addEventListener( 'durationchange', audioEventOccurred );
  audio.addEventListener( 'emptied', audioEventOccurred );
  audio.addEventListener( 'encrypted', audioEventOccurred );
  audio.addEventListener( 'ended', audioEventOccurred );
  audio.addEventListener( 'error', audioEventOccurred );
  audio.addEventListener( 'interruptbegin', audioEventOccurred );
  audio.addEventListener( 'interruptend', audioEventOccurred );
  audio.addEventListener( 'loadeddata', audioEventOccurred );
  audio.addEventListener( 'loadedmetadata', audioEventOccurred );
  audio.addEventListener( 'loadstart', audioEventOccurred );
  audio.addEventListener( 'mozaudioavailable', audioEventOccurred );
  audio.addEventListener( 'pause', audioEventOccurred );
  audio.addEventListener( 'play', audioEventOccurred );
  audio.addEventListener( 'playing', audioEventOccurred );
  audio.addEventListener( 'progress', audioEventOccurred );
  audio.addEventListener( 'ratechange', audioEventOccurred );
  audio.addEventListener( 'seeked', audioEventOccurred );
  audio.addEventListener( 'seeking', audioEventOccurred );
  audio.addEventListener( 'stalled', audioEventOccurred );
  audio.addEventListener( 'suspend', audioEventOccurred );
  audio.addEventListener( 'timeupdate', audioEventOccurred );
  audio.addEventListener( 'volumechange', audioEventOccurred );
  audio.addEventListener( 'waiting', audioEventOccurred );
}

function audioEventOccurred( e ) {
  switch( e.type ) {
    /*
    case 'abort' :
       // Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.
    case 'canplay' :
       // Sent when enough data is available that the media can be played, at least for a couple of frames.  This corresponds to the HAVE_FUTURE_DATA readyState.
    case 'canplaythrough' :
       // Sent when the readyState changes to HAVE_ENOUGH_DATA, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.
    case 'durationchange' :
       // The metadata has loaded or changed, indicating a change in duration of the media.  This is sent, for example, when the media has loaded enough that the duration is known.
    case 'emptied' :
       // The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.
    case 'encrypted' :
       // 	The user agent has encountered initialization data in the media data.
    case 'error' :
       // 	Sent when an error occurs.  The element's error attribute contains more information. See HTMLMediaElement.error for details.
    case 'interruptbegin' :
       // 	Sent when audio playing on a Firefox OS device is interrupted, either because the app playing the audio is sent to the background, or audio in a higher priority audio channel begins to play. See Using the AudioChannels API for more details.
    case 'interruptend' :
       // Sent when previously interrupted audio on a Firefox OS device commences playing again — when the interruption ends. This is when the associated app comes back to the foreground, or when the higher priority audio finished playing. See Using the AudioChannels API for more details.
    case 'loadeddata' :
       // The first frame of the media has finished loading.
    case 'loadedmetadata' :
       // 	The media's metadata has finished loading; all attributes now contain as much useful information as they're going to.
    case 'loadstart' :
       // Sent when loading of the media begins.
    case 'mozaudioavailable' :
       // 	Sent when an audio buffer is provided to the audio layer for processing; the buffer contains raw audio samples that may or may not already have been played by the time you receive the event.
    case 'pause' :
       // 	Sent when the playback state is changed to paused (paused property is true).
    case 'play' :
       // 	Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute.
    case 'playing' :
       // 	Sent when the media has enough data to start playing, after the play event, but also when recovering from being stalled, when looping media restarts, and after seeked, if it was playing before seeking.
    case 'progress' :
       // Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's buffered attribute.
    case 'ratechange' :
       // 	Sent when the playback speed changes.
    case 'seeked' :
       // Sent when a seek operation completes.
    case 'seeking' :
       // 	Sent when a seek operation begins.
    case 'stalled' :
       // 	Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
    case 'suspend' :
       // 	Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason.
    case 'volumechange' :
       // 	Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).
    case 'waiting' :
       // Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).
       trace( 'audio event : ' + e.type );
       break;
    */
    case 'timeupdate' :
      // 	The time indicated by the element's currentTime attribute has changed.
      // noop for now
      break;
    case 'ended' :
      // Sent when playback completes.
      playNext();
      break;
  }
}

function refreshNowPlaying() {
  let nowPlaying = document.querySelector( '.now-playing' );
  if( nowPlaying ) {
    nowPlaying.classList.remove( 'now-playing' );
  }

  nowPlaying = playlistLinks.children[ playlistIndex ];
  if( nowPlaying ) {
    nowPlaying.classList.add( 'now-playing' );
  }
}

function httpsClicked( e ) {
  trace( 'httpsClicked' );
  if( e.target.checked ) {
    window.location.protocol = 'https:';
  } else {
    window.location.protocol = 'http:';
  }
}

function debugClicked( e ) {
  if( e.target.checked ) {
    echo.classList.add( 'displayed' );
  } else {
    echo.classList.remove( 'displayed' );
  }
}

function keepAwakeClicked( e ) {
  if( e.target.checked ) {
    vid.play();
  } else {
    vid.pause();
  }
}

function goBtnClicked( e ) {
  trace( 'goBtnClicked', true );

  let url = dirInput.value;
  if( url.charAt( url.length - 1 ) !== '/' ) {
    url += '/';
  }

  if( isURLvalid( url ) ) {
    if( cookies.read( 'url' ) === url ) {
      if( cookies.doesHave( 'playlistIndex' ) ) {
        setPlaylistIndex( parseInt( cookies.read( 'playlistIndex' ), 10 ) );
        if( cookies.doesHave( 'currentTime' ) ) {
          let newCurrentTime = parseInt( cookies.read( 'currentTime' ), 10 );
          newCurrentTime -= 5;
          newCurrentTime = newCurrentTime >= 0 ? newCurrentTime : 0;
          setCurrentTime( newCurrentTime );
        }
      } else {
        setPlaylistIndex( 0 );
        setCurrentTime( 0 );
      }

      cookies.write( 'url', url );
      getPlaylist( url );
    } else {
      cookies.write( 'url', url );
      setPlaylistIndex( 0 );
      setCurrentTime( 0 );
      getPlaylist( url );
    }
  } else {
    trace( '\tinvalid URL - aborting' );
  }
}

function getPlaylist( url ) {
  trace( 'getPlaylist' );

  const xmlHTTP = new XMLHttpRequest();

  function responseReceived() {
    switch( xmlHTTP.readyState ) {
      case 1 :
      case 2 :
      case 3 :
        // noop
        break;
      case 4 :
        if( xmlHTTP.status === 200 ) {
          if( xmlHTTP.responseText && xmlHTTP.responseText.indexOf( '<hr>' ) !== -1 ) {
            gleaner.innerHTML = xmlHTTP.responseText.split( '<hr>' )[ 1 ];
            playlist = Array.prototype.slice.call( gleaner.querySelectorAll( 'a' ) );
            let pathArray;
            playlist.find( ( mp3URL, index ) => {
              pathArray = mp3URL.href.split( '/' );
              playlist[ index ] = url + pathArray[ pathArray.length - 1 ];
            } );
            playlist = playlist.filter( mp3URL => /.mp3$/.test( mp3URL ) );
            let a;
            playlist.find( ( mp3URL, index ) => {
              pathArray = mp3URL.split( '/' );
              a = document.createElement( 'a' );
              a.innerHTML = pathArray[ pathArray.length - 1 ].replace( /%20/g, " " );
              a.setAttribute( 'data-index', index );
              a.addEventListener( 'click', trackLinkClicked );
              playlistLinks.appendChild( a );
            } );
            if( playlist.length ) {
              startPlaying();
            } else {
              trace( '\tplaylist is empty - no MP3 files in specified directory' );
            }

          } else {
            trace( '\tunable to list directory' );
          }
        } else {
          trace( '\tunable to list directory' );
        }
        break;
      default :
        trace( '\tERROR : unhandled case encountered. xmlHTTP.readyState : ' + xmlHTTP.readyState );
    }
  }

  try {
    xmlHTTP.onreadystatechange = responseReceived;
    xmlHTTP.open( "GET", url, true );
    xmlHTTP.send();
  } catch( err ) {
    console.error( err );
  }
}

function trackLinkClicked( e ) {
  const index = parseInt( e.target.getAttribute( 'data-index' ), 10 );
  trace( 'trackLinkClicked : ' + index );
  playTrack( index );
  e.preventDefault();
}

function setPlaylistIndex( newIndex ) {
  playlistIndex = newIndex;
  cookies.write( 'playlistIndex', newIndex );
  refreshNowPlaying();
}

function setCurrentTime( newTime ) {
  currentTime = newTime;
  cookies.write( 'currentTime', newTime );
}

function playTrack( index ) {
  setPlaylistIndex( index );
  setCurrentTime( 0 );
  audio.src = playlist[ index ];
  audio.play();
}

function isURLvalid( url ) {
  var pattern = new RegExp( '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i' ); // fragment locator
  return !!pattern.test( url );
}

function trace( msg, shouldReplace = false ) {
  if( shouldReplace ) {
    echo.innerHTML = msg + "\n";
  } else {
    echo.innerHTML += msg + "\n";
  }
  console.log( msg );
}

function createNoSleepVideo() {
  const urls = getVideoURLs();

  function addVidSrc( element, type, dataURI ) {
    const source = document.createElement( 'source' );
    source.src = dataURI;
    source.type = `video/${ type }`;
    element.appendChild( source );
  }

  vid = document.createElement( 'video' );

  vid.setAttribute( 'title', 'No Sleep' );
  vid.setAttribute( 'playsinline', '' );
  vid.className = 'no-sleep';

  addVidSrc( vid, 'webm', urls.webm );
  addVidSrc( vid, 'mp4', urls.mp4 );

  vid.addEventListener( 'loadedmetadata', () => {
    if( vid.duration <= 1 ) {
      // webm
      vid.setAttribute( 'loop', '' );
    } else {
      // mp4
      vid.addEventListener( 'timeupdate', () => {
        if( vid.currentTime > 0.5 ) {
          vid.currentTime = Math.random();
        }
      } );
    }
  } );

  document.querySelector( 'body' ).appendChild( vid );
}

function startPlaying() {
  trace( 'startPlaying' );

  // play
  if( playlist && playlist.length ) {
    audio.src = playlist[ playlistIndex ];
    audio.currentTime = currentTime;
    audio.play();
    refreshNowPlaying();
  } else {
    trace( 'no playlist to play just now...' );
  }

}

function playPrev() {
  trace( 'playPrev' );

  if( playlistIndex > 0 ) {
    setPlaylistIndex( playlistIndex - 1 );
    audio.src = playlist[ playlistIndex ];
    audio.play();
  } else {
    trace( 'WARN : at start of playlist' );
  }
}

function playNext() {
  trace( 'playNext' );
  if( playlistIndex < playlist.length - 1 ) {
    setPlaylistIndex( playlistIndex + 1 );
    audio.src = playlist[ playlistIndex ];
    audio.play();
  } else {
    trace( 'WARN : finished playlist' );
  }
}

function restoreSession() {
  trace( 'restoreSession' );

  if( cookies.doesHave( 'url' ) ) {
    dirInput.value = cookies.read( 'url' );
  } else {
    trace( '\tno session to restore.' );
  }
}

function main() {
  getRefs();
  trace( 'main' );
  init();
  restoreSession();
  addListeners();
  startPlaying();
  createNoSleepVideo();
}

cookies = {
  read : ( key ) => {
    if( !key ) {
      return null;
    }
    let regex = new RegExp(
      '(?:(?:^|.*;)\\s*' +
      encodeURIComponent( key ).replace( /[\-\.\+\*]/g, '\\$&' ) +
      '\\s*\\=\\s*([^;]*).*$)|^.*$'
    );
    let result = decodeURIComponent( document.cookie.replace( regex, '$1' ) || null );
    return result === "null" || !result ? null : result;
  },
  write : ( key, value ) => {
    document.cookie = encodeURIComponent( key ) + '=' + encodeURIComponent( value );
  },
  delete : ( key ) => {
    if( !cookies.doesHave( key ) ) {
      return false;
    }
    document.cookie =
      encodeURIComponent( key ) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    return true;
  },
  doesHave : ( key ) => {
    let regex = new RegExp(
      '(?:^|;\\s*)' + encodeURIComponent( key ).replace( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\='
    );
    return regex.test( document.cookie );
  }
};


main();

function getVideoURLs() {
  return {
    webm : "data:video/webm;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA=",
    mp4 :
      "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC8wYF///v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9MzAwIGtleWludF9taW49MzAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD0xMCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIwLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAOWWIhAA3//p+C7v8tDDSTjf97w55i3SbRPO4ZY+hkjD5hbkAkL3zpJ6h/LR1CAABzgB1kqqzUorlhQAAAAxBmiQYhn/+qZYADLgAAAAJQZ5CQhX/AAj5IQAD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",
  };
}
