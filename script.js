const container = document.getElementById('container');
const text = 'xaviera';
const numTexts = 100; 
const centerX = 300; 
const centerY = 300; 
const scale = 15;    
const delayBetweenTexts = 100; 

let currentTextIndex = 0;
let isPlaying = false;
let animationInterval;
let shapeInterval;

function getHeartCoordinates(t) {
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x: centerX + x * scale, y: centerY - y * scale };
}

function addText() {
    if (currentTextIndex < numTexts) {
        const t = 2 * Math.PI * currentTextIndex / numTexts;
        const { x, y } = getHeartCoordinates(t);

        const textElement = document.createElement('div');
        textElement.className = 'text';
        textElement.textContent = text;
        textElement.style.setProperty('--x', `${x - centerX}px`);
        textElement.style.setProperty('--y', `${y - centerY}px`);
        textElement.style.animationDelay = `${currentTextIndex * 0.1}s`;

        container.appendChild(textElement);
        currentTextIndex++;
    } else {
        clearInterval(animationInterval);
    }
}

function startAnimation() {
    isPlaying = true;
    animationInterval = setInterval(addText, delayBetweenTexts);
    shapeInterval = setInterval(createShape, 1000);
}

function stopAnimation() {
    isPlaying = false;
    clearInterval(animationInterval);
}

function createShape() {
    const shapeContainer = document.getElementById('shape-container');
    const shape = document.createElement('div');
    shape.className = 'shape';

    const size = Math.random() * 50 + 50;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    const position = Math.random() * 80 + 10;
    shape.style.left = `${position}%`;

    shape.style.bottom = '-100px';

    shapeContainer.appendChild(shape);

    shape.addEventListener('animationend', () => {
        shapeContainer.removeChild(shape);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    feather.replace();

    const playPauseButton = document.getElementById('play-pause');
    const audio = document.getElementById('audio');
    const songDuration = document.getElementById('song-duration');

    playPauseButton.addEventListener('click', () => {
        togglePlay();
    });

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i data-feather="pause"></i>';
            feather.replace();
            displayDuration();
            if (!isPlaying) {
                startAnimation();
            }
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i data-feather="play"></i>';
            feather.replace();
            stopAnimation();
        }
    }

    function displayDuration() {
        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            songDuration.textContent = duration;
        });

        audio.addEventListener('timeupdate', () => {
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            songDuration.textContent = currentTime + ' / ' + duration;
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
});
