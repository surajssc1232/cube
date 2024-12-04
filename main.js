let cube = document.querySelector('.cube');
let isDragging = false;
let currentX, currentY, initialX, initialY;
let xDeg = 0;
let yDeg = 0;
let defaultRotationSpeed = 0.5;
let rotationSpeedX = 0;
let rotationSpeedY = defaultRotationSpeed;
let lastDeltaX = 0;
let lastDeltaY = 0;

function autoRotate() {
    if (!isDragging) {
        yDeg += rotationSpeedY;
        xDeg += rotationSpeedX;
        updateRotation();
    }
    requestAnimationFrame(autoRotate);
}

function updateRotation() {
    if (cube) {
        cube.style.transform = `rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
}

function handleMouseDown(e) {
    if (!cube) return;
    isDragging = true;
    initialX = e.clientX;
    initialY = e.clientY;
    rotationSpeedX = 0;
    rotationSpeedY = 0;
}

function handleMouseMove(e) {
    if (!isDragging || !cube) return;
    e.preventDefault();
    
    currentX = e.clientX;
    currentY = e.clientY;
    
    let deltaX = currentX - initialX;
    let deltaY = currentY - initialY;
    
    yDeg += deltaX * 0.5;
    xDeg -= deltaY * 0.5;
    
    initialX = currentX;
    initialY = currentY;
    
    updateRotation();
}

function handleMouseUp() {
    isDragging = false;
    rotationSpeedX = 0;
    rotationSpeedY = defaultRotationSpeed;
}

function handleTouchStart(e) {
    if (!cube) return;
    isDragging = true;
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    rotationSpeedX = 0;
    rotationSpeedY = 0;
}

function handleTouchMove(e) {
    if (!isDragging || !cube) return;
    e.preventDefault();
    
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    
    let deltaX = currentX - initialX;
    let deltaY = currentY - initialY;
    
    yDeg += deltaX * 0.5;
    xDeg -= deltaY * 0.5;
    
    initialX = currentX;
    initialY = currentY;
    
    updateRotation();
}

function handleTouchEnd() {
    isDragging = false;
    rotationSpeedX = 0;
    rotationSpeedY = defaultRotationSpeed;
}

window.addEventListener('load', function() {
    const audioPlayer = document.querySelector('.dark-mode-player');
    if (audioPlayer) {
        audioPlayer.muted = false;
        audioPlayer.play();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    if (cube) {
        autoRotate();
    }
    
    document.getElementById('play-pause-btn').addEventListener('change', function() {
        const audioPlayer = document.querySelector('.dark-mode-player');
        if (this.checked) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });
});