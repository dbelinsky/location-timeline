import { addAudioPost } from './posts';
import { getGeolocation } from './geolocation';
import { showModal } from './modal';
import { startTimer, stopTimer } from './timer';

let mediaRecorder;
let audioChunks = [];
let recordingCancelled = false;

export function startAudioRecording() {
  const mediaBtns = document.querySelector('.buttons__media');
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      mediaBtns.style.display = 'none';

      mediaRecorder.addEventListener('dataavailable', (e) => {
        audioChunks.push(e.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        if (recordingCancelled) {
          audioChunks = [];
          recordingCancelled = false;
          mediaBtns.style.display = 'flex';
          return;
        }

        const audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.controls = true;
        audio.className = 'audio__player custom__audio-player';
        mediaBtns.style.display = 'flex';

        getGeolocation().then((coords) => {
          addAudioPost(audio, coords);
        }).catch(() => {
          showModal('К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.', addAudioPost, audio);
        });
      });

      document.querySelector('.recording__controls').style.display = 'flex';
      startTimer();
    })
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert('Не удалось получить доступ к микрофону.');
    });
}

export function stopAudioRecording() {
  mediaRecorder.stop();
  stopTimer();
  document.querySelector('.recording__controls').style.display = 'none';
}

export function cancelAudioRecording() {
  recordingCancelled = true;
  mediaRecorder.stop();
  audioChunks = [];
  stopTimer();
  document.querySelector('.recording__controls').style.display = 'none';
}