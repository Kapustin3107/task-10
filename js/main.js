document.addEventListener('DOMContentLoaded', function() {

     // here will be function that mix users in random order
     const showRandomOrder = () => {
        userItems.forEach(item => {
            const randomIndex = Math.floor(Math.random() * userItems.length);
            item.style.order = randomIndex;
        })
    }

    // Header Navigation Tabs
    const headerTabs = document.querySelectorAll(".online-nav li");

    headerTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            pauseAllAudioTracks();
            showRandomOrder();
            const dataTab = tab.dataset.mediaType;
            document.body.dataset.media = dataTab;
            headerTabs.forEach(item => {
                item.classList.remove("on");
            })
            tab.classList.add("on");
        })
    })

    const userItems = document.querySelectorAll(".profile-box");

    userItems.forEach(item => {
        item.addEventListener("click", () => {
           item.classList.toggle("is-active");
        })
    })

    //waveform
    const playButtons = document.querySelectorAll(".audio-play-bt");
    var waveSurfers = {};

    function initWaveSurfer(containerId, container, url) {
        const wavesurfer = WaveSurfer.create({
            container: container,
            height: 36,
            backend: 'WebAudio',
            waveColor: '#cccccc',
            progressColor: '#00b0f0',
            url: url,
        })

        waveSurfers[containerId] = wavesurfer;
    }

    function pauseAllAudioTracks(currentTrack, currentButton) {
        playButtons.forEach(playButton => {
            if(playButton !== currentButton) {
                playButton.classList.remove("paused");
            }
        })
        for(let item in waveSurfers) {
            if(waveSurfers[item] !== currentTrack){
                waveSurfers[item].pause();
            }
        }
    }

    playButtons.forEach(playButton => {
        const url = playButton.dataset.audioUrl;
        const container = playButton.nextElementSibling.querySelector(".waveform");
        const containerId = container.closest(".audio-container").id;

        if(containerId && url && container) {
            initWaveSurfer(containerId, container, url);
        }
        
        playButton.addEventListener("click", (e) => {
            const userTitle = container.previousElementSibling;
            let wavesurfer = waveSurfers[containerId];

            userTitle.style.display = "none";
            container.style.display = "block";
            e.currentTarget.classList.toggle("paused");

            pauseAllAudioTracks(wavesurfer, e.currentTarget);
           
            if (wavesurfer.isPlaying()) {
                wavesurfer.pause();
            } else {
                wavesurfer.play();
            }
        })
    })

    //searh input handler
    const input = document.querySelector(".show-on-desktop input");
    const noUsersBlock = document.querySelector(".no-users-found");

    input.addEventListener("keyup", (e) => {
        const value = e.currentTarget.value.toLowerCase();
        let foundUsers = false; 
        
        userItems.forEach(item => {
            if(item.dataset.username.includes(value)) {
                item.style.display = "block";
                foundUsers = true;
            } else {
                item.style.display = "none";
            }

            if (!foundUsers) {
                noUsersBlock.style.display = "block";
            } else {
                noUsersBlock.style.display = "none";
            }
        })
    })
})