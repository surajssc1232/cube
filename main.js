let cube = document.querySelector('.cube');
let isDragging = false;
let currentX, currentY, initialX, initialY;
let xDeg = 0;
let yDeg = 0;
let defaultRotationSpeed =0.5;
let rotationSpeedX = 0;
let rotationSpeedY = defaultRotationSpeed;

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
        cube.style.transform = `rotateX(${-xDeg}deg) rotateY(${-yDeg}deg)`;
    }
}

function handleMouseDown(e) {
    if (!cube) return;
    isDragging = true;
    initialX = e.clientX - yDeg;
    initialY = e.clientY - xDeg;
}

function handleMouseMove(e) {
    if (!isDragging || !cube) return;
    e.preventDefault();
    
    currentX = e.clientX;
    currentY = e.clientY;
    
    let deltaX = currentX - initialX;
    let deltaY = currentY - initialY;
    
    yDeg = -deltaX;
    xDeg = deltaY;
    
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
    initialX = e.touches[0].clientX - yDeg;
    initialY = e.touches[0].clientY - xDeg;
}

function handleTouchMove(e) {
    if (!isDragging || !cube) return;
    e.preventDefault();
    
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    
    let deltaX = currentX - initialX;
    let deltaY = currentY - initialY;
    
    yDeg = -deltaX;
    xDeg = deltaY;
    
    updateRotation();
}

function handleTouchEnd() {
    isDragging = false;
    rotationSpeedX = 0;
    rotationSpeedY = defaultRotationSpeed;
}

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
});