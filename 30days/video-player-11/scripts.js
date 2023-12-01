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
    
    // const method = video.paused ? 'play' : 'pause'
    // video[method]()
    // console.log(video[method]())

    // const icon = video.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
    // toggle.append = icon
    const icon = video.paused ? '►' : '||';
    toggle.textContent = icon;
    
}

function handleProgress(){
    console.log('progress');
    let percent = (video.currentTime / video.duration) * 100
    // console.log(video.currentTime)
    // console.log(video.duration)
    progressFilled.style.flexBasis = `${percent}%`; // 0 ~ 100 (%)
    // console.log(`percent: ${percent}%`)
}

function handleProgressClick(e) {
    // let percent = video.duration
    // video.currentTime = percent;
    // console.log(e)
    
    let percent = (Math.floor(e.offsetX) / allWidth) * 100; // 0 ~ 100 (%)
    
    progressFilled.style.flexBasis = `${percent}%`;
    const allWidth = progress.offsetWidth;
    let current = (e.offsetX / allWidth) * video.duration; // 影片長
    video.currentTime = current;
    // console.log(video.currentTime)
}

function handleSkip(){
    // video.pause();
    let time = parseInt(this.dataset.skip)
    // console.log(this)
    // console.log(time)
    video.currentTime += time;
}

function handleRange(){
    // console.log(this.name) // this = input
    // console.log(this.value)
    video[this.name] = this.value;
    console.log(`volume ${video.volume}`)
    console.log(`playbackRate ${video.playbackRate}`)
}


toggle.addEventListener('click', handlePlayToggle)
progress.addEventListener('mousedown', handleProgress)
progress.addEventListener('timeupdate', handleProgress)
progress.addEventListener('click', handleProgressClick)

dataButtons.forEach(btn => btn.addEventListener('click', handleSkip))
inputRanges.forEach(input => input.addEventListener('change', handleRange))


















progress.style.border = '1px solid #fcc';
// control.style.border = '1px solid #ff0000';

toggle.style.border = '1px solid green';

dataButtons.forEach((dataBtn)=>{
    dataBtn.style.border = '1px solid #e27bff';
})

inputRanges.forEach((input)=>{
    input.style.border = '1px solid #7becff';
})







// https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused