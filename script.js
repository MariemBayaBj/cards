// Function to control the background music and update UI accordingly
function sound() {
    // Get references to the audio element and the button element (soun)
    let audio = document.getElementById("bgMusic");
    let soun = document.getElementById("soun");
    
    // Check if the audio is currently paused
    if (audio.paused) {
        // If audio is paused, play it
        audio.play();
        
        // Store the sound status as 'on' in localStorage to retain the state
        localStorage.setItem("soundStatus", "on");
        
        // Change the background color of the button to indicate that sound is ON
        soun.style.backgroundColor = "rgb(222, 170, 103)";
        
        // Update the text inside the 'OF' element to show the sound is ON
        document.getElementById('OF').innerHTML = "sound 's ON";
    } else {
        // If audio is playing, pause it
        audio.pause();
        
        // Store the sound status as 'off' in localStorage to retain the state
        localStorage.setItem("soundStatus", "off");
        
        // Change the background color of the button to indicate that sound is OFF
        soun.style.backgroundColor = "grey";
        
        // Update the text inside the 'OF' element to show the sound is OFF
        document.getElementById('OF').innerHTML = "sound 's OFF";
    }
}

// Function to close the window when the user exits
function exit() {
    // Close the current window
    window.close();
    
    // Navigate to a blank page to help ensure the window closes
    window.location.href = "about:blank"; 
}
