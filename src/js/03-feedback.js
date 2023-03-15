import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const feedbackFormState = {};
const FEEDBACK_KEY = 'feedback-form-state';
const savedMessage = load(FEEDBACK_KEY);

if (savedMessage && savedMessage.email) {
  form.elements.email.value = savedMessage.email;
  feedbackFormState.email = savedMessage.email;
}

if (savedMessage && savedMessage.message) {
  form.elements.message.value = savedMessage.message;
  feedbackFormState.message = savedMessage.message;
}

form.addEventListener(
  'input',
  throttle(event => {
    feedbackFormState[event.target.name] = event.target.value;
    save(FEEDBACK_KEY, feedbackFormState);
  }, 500)
);

form.addEventListener('submit', sendMessage);

function sendMessage(event) {
  if (form.elements.email.value === '' || form.elements.message.value === '') {
    alert('Всі поля мають бути заповнені');
    return;
  }
  event.preventDefault();
  console.log(feedbackFormState);
  feedbackFormState.email = '';
  feedbackFormState.message = '';
  remove(FEEDBACK_KEY);
  form.reset();
}

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Remove state error: ', error.message);
  }
}
