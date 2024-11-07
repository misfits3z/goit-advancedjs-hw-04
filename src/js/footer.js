import axios from "axios";
// import Notiflix from 'notiflix';
import {subscriptionRequest} from './api-service';


const form = document.querySelector('.subscribe-form');
const emailInput = form.elements.email;

let formData = { email: "" };
const STORAGE_KEY = 'subscribe-form-state';

// Збереження даних у LocalStorage
const saveToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Завантаження даних з LocalStorage
const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        formData = JSON.parse(savedData);
        emailInput.value = formData.email || '';
    }
};

// Завантажуємо дані з LocalStorage при завантаженні сторінки
loadFromLocalStorage();

// Обробник події input для збереження змін
form.addEventListener('input', (event) => {
    const { name, value } = event.target;
    formData[name] = value.trim();
    saveToLocalStorage();
});

// Обробник події submit
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Перевірка валідації email
    if (!emailInput.validity.valid) {
        alert('Please enter a valid email');
        return;
    }

    // Створення обʼєкта з даними форми
    formData.email = emailInput.value.trim();

    try {
        // Відправка запиту на сервер
        const response = await axios.post(subscriptionRequest(), formData);

        // Перевірка на наявність помилок у відповіді
        if (response.data.error) {
            if (response.status === 409) {
                alert('This email is already subscribed.');
            } else {
                alert('Subscription failed. Please try again later.');
            }
        } else {
            alert('Subscription successful!');
        }
    } catch (error) {
        // Обробка помилок запиту
        if (error.response && error.response.status === 409) {
            alert('This email is already subscribed.');
        } else {
            alert('Subscription failed. Please try again later.');
        }
    }

   
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
});
