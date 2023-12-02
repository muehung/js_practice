// Elements
const PlayerWrapper = document.querySelector('.player')
const video = document.querySelector('.viewer')
const control = document.querySelector('.player__controls')
const progress = document.querySelector('.progress')
const progressFilled = document.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle')
const dataButtons = document.querySelectorAll('[data-skip]')
const inputRanges = document.querySelectorAll('.player__slider')


// functions
function handlePlayToggle(){
    // video.paused ? video.play() : video.pause();
    if(video.paused || video.ended){
        video.play()
    } else {
        video.pause()
    }    
}

function updateBtn(){
    // const icon = video.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
    // toggle.append = icon
    const icon = video.paused ? '►' : '||';
    toggle.textContent = icon;
}


function handleProgress(){
    let percent = (video.currentTime / video.duration) * 100
    progressFilled.style.flexBasis = `${percent}%`; // 0 ~ 100 (%)
}

function handleProgressScrub(e) {
    const allWidth = progress.offsetWidth;
    let percent = (Math.floor(e.offsetX) / allWidth) * 100; // 0 ~ 100 (%)
    progressFilled.style.flexBasis = `${percent}%`;
    let current = (e.offsetX / allWidth) * video.duration; // 影片長
    video.currentTime = current;
}

function handleSkip(){
    // parseInt vs. parseFloat ???
    let time = parseFloat(this.dataset.skip)
    video.currentTime += time;
    handleProgress()
}

function handleRange(){
    video[this.name] = this.value;
}









// click togglePlay
// play updateBtn
// pause updateBtn
// timeupdate handleProgress

video.addEventListener('click', handlePlayToggle)
toggle.addEventListener('click', handlePlayToggle)
video.addEventListener('play', updateBtn)
video.addEventListener('pause', updateBtn)
video.addEventListener('timeupdate', handleProgress)

dataButtons.forEach(btn => btn.addEventListener('click', handleSkip))
inputRanges.forEach(input => input.addEventListener('change', handleRange))

progress.addEventListener('click', handleProgressScrub)
let checkMousedown = false;
progress.addEventListener('mousemove', (e)=>{ checkMousedown && handleProgressScrub(e)}) // !!?
progress.addEventListener('mousedown', ()=> { checkMousedown = true})
progress.addEventListener('mouseup', ()=> {checkMousedown = false})












// https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused