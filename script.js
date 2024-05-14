document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.button');
    const body = document.querySelector('body');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Function to create a balloon element
    function createBalloon() {
        // Create a new balloon element
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        // Set random position within screen bounds
        const x = Math.floor(Math.random() * (window.innerWidth - 150)); // Subtract balloon size
        const y = Math.floor(Math.random() * (window.innerHeight - 150)); // Subtract balloon size
        balloon.style.left = `${x}px`;
        balloon.style.top = `${y}px`;

        // Set random size (between 50px and 150px)
        const size = Math.floor(Math.random() * 101) + 50;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size}px`;

        // Set random color
        const colors = [
            '#F0EAD6', '#F5F5DC', '#FFE4C4', '#F5DEB3', '#FAEBD7', '#FFEFD5', '#FFEBCD', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0F8FF', '#B0E0E6', '#AFEEEE', '#B0C4DE', '#4682B4', '#87CEEB', '#87CEFA', '#ADD8E6', '#F0FFFF', '#E0FFFF'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = randomColor;

        // Calculate font size based on balloon size
        const fontSize = size / 6; // Adjust this factor as needed
        const text = document.createElement('div');
        text.textContent = "Happy Birthday!";
        text.style.color = '#000000'; // Text color
        text.style.fontFamily = "cursive";
        text.style.fontWeight = "bolder";
        text.style.fontSize = `${fontSize}px`; // Font size
        text.style.position = 'absolute';
        text.style.top = '50%';
        text.style.left = '50%';
        text.style.transform = 'translate(-50%, -50%)';
        text.style.textAlign = "center";
        balloon.appendChild(text);

        // Add click event listener to pop the balloon
        balloon.addEventListener('click', () => {
            popBalloon(balloon); // Pop the balloon
            createBalloon(); // Create a new balloon
        });

        // Add the balloon to the body
        body.appendChild(balloon);
    }

    // Function to pop the balloon
    function popBalloon(balloon) {
        // Add 'pop' class for animation
        balloon.classList.add('pop');
        // Remove the balloon from the DOM after the animation finishes
        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }

    // Function to update the countdown timer
    function updateTimer() {
        // Target date: May 23rd 12:00 AM
        const targetDate = new Date('May 23, 2024 00:00:00').getTime();
        // Get current date and time
        const now = new Date().getTime();
        // Calculate remaining time
        const remainingTime = targetDate - now;

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // Update the countdown timer values
        daysElement.textContent = formatTime(days);
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);

        // Enable the button if the timer has expired
        if (remainingTime <= 0) {
            button.disabled = false;
        }
    }

    // Function to format time values (prepend 0 if single digit)
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Call the function initially
    for (let i = 0; i < 5; i++) {
        createBalloon();
    }

    // Create a balloon every 5 seconds
    setInterval(createBalloon, 5000);

    // Update the countdown timer every second
    setInterval(updateTimer, 1000);

    // Initial update
    updateTimer();

    // Open gift function
    function openGift() {
        // Get current date and time
        const currentHour = new Date().getHours();
        const currentDate = new Date();
        // Allow opening gift only after 10 PM on May 14th
        if (currentDate.getMonth() === 4 && currentDate.getDate() === 14 && currentHour >= 22) {
            // Open a new page when the "Open Gift" button is clicked
            window.open('gift.html', '_blank');
        } else {
            alert("WAIT PATIENTLY!!");
        }
    }

    // Attach the openGift function to the button click event
    button.addEventListener('click', openGift);
});
