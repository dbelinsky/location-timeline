/* eslint-disable no-use-before-define */
import { formatedDate } from './formatedDate';

export function addTextPost(text, coords) {
  const date = new Date();
  const formattedDate = formatedDate(date);
  const post = {
    type: 'text',
    text,
    coords,
    date: formattedDate,
  };

  savePostToLocalStorage(post);
  renderPost(post);
}

export function addAudioPost(audio, coords) {
  const date = new Date();
  const formattedDate = formatedDate(date);
  const audioUrl = audio.src;
  const post = {
    type: 'audio',
    audioUrl,
    coords,
    date: formattedDate,
  };

  savePostToLocalStorage(post);
  renderPost(post);
}

export function renderPost(post) {
  const postElement = document.createElement('div');
  postElement.className = 'post';

  const postContainer = document.createElement('div');
  postContainer.className = 'post__container';

  if (post.type === 'text') {
    const textElement = document.createElement('p');
    textElement.className = 'post__text';
    textElement.textContent = post.text;
    postContainer.appendChild(textElement);
  } else if (post.type === 'audio') {
    const audioElement = new Audio(post.audioUrl);
    audioElement.controls = true;
    audioElement.className = 'audio__player custom__audio-player';
    postContainer.appendChild(audioElement);
  }

  const dateElement = document.createElement('div');
  dateElement.className = 'date';
  dateElement.textContent = post.date;
  postContainer.appendChild(dateElement);

  const coordsElement = document.createElement('div');
  coordsElement.className = 'coords';
  coordsElement.textContent = `[${post.coords.latitude}, ${post.coords.longitude}]`;

  postElement.appendChild(postContainer);
  postElement.appendChild(coordsElement);

  document.querySelector('.timeline').prepend(postElement);
}

function savePostToLocalStorage(post) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}

export function loadPostsFromLocalStorage() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach((post) => renderPost(post));
}
