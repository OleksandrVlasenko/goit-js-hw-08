import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

if (localStorage.getItem('videoplayer-current-time')) {
  player.setCurrentTime(
    Number(localStorage.getItem('videoplayer-current-time'))
  );
}

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem('videoplayer-current-time', String(data.seconds));
  }, 1000)
);

player.on('ended', function () {
  setTimeout(() => {
    localStorage.removeItem('videoplayer-current-time');
  }, 2000);
});
