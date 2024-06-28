
const songs = [
    {
        id:1,
        songName: `Lover<br> <div class="subtitle">Taylor Swift</div>`,
        poster:"img/1.jpg"
    },
    {
        id:2,
        songName: `Style<br> <div class="subtitle">Taylor Swift</div>`,
        poster:"img/2.jpg"
    },
    {
        id:3,
        songName: `I see fire<br> <div class="subtitle">Ed Sheeran</div>`,
        poster:"img/3.jpg"
    },
    {
        id:4,
        songName: `Thinking out loud<br> <div class="subtitle">Ed Sheeran</div>`,
        poster:"img/4.jpg"
    },
    {
        id:5,
        songName: `21 Guns<br> <div class="subtitle">Greenday</div>`,
        poster:"img/5.jpg"
    },
    {
        id:6,
        songName: `I Miss You<br> <div class="subtitle">Blink 182</div>`,
        poster:"img/6.jpg"
    },
    {
        id:7,
        songName: `Affaction<br> <div class="subtitle">Ciggerate after sex</div>`,
        poster:"img/7.jpg"
    },
    {
        id:8,
        songName: `Hands Held High<br> <div class="subtitle">Linkin Park</div>`,
        poster:"img/8.jpg"
    },
    {
        id:9,
        songName: `Numb<br> <div class="subtitle">Linkin Park</div>`,
        poster:"img/9.jpg"
    },
    {
        id:10,
        songName: `Signs of time<br> <div class="subtitle">Harry Styles</div>`,
        poster:"img/10.jpg"
    },
    {
        id:11,
        songName: `Iris<br> <div class="subtitle">Goo Goo Dolls</div>`,
        poster:"img/11.jpg"
    },
    {
        id:12,
        songName: `Lover<br> <div class="subtitle">Taylor Swift</div>`,
        poster:"img/12.jpg"
    },
    {
        id:13,
        songName: `Melting<br> <div class="subtitle">Kali Uchis</div>`,
        poster:"img/13.jpg"
    },
    {
        id:14,
        songName: `Naganya Maya<br> <div class="subtitle">Sajjan Raj Vaidhya</div>`,
        poster:"img/14.jpg"
    },
    {
        id:15,
        songName: `The Scientist<br> <div class="subtitle">Coldplay</div>`,
        poster:"img/15.jpg"
    },
    {
        id:16,
        songName: `Somewhere Only We Know<br> <div class="subtitle">Kaene</div>`,
        poster:"img/16.jpg"
    },
    {
        id:17,
        songName: `Teenage Dream cover<br> <div class="subtitle">Stephen Dawes</div>`,
        poster:"img/17.jpg"
    }

    
]


const music = new Audio('audio/1.m4a')
// music.play();

// for poster

Array.from(document.getElementsByClassName('songItem')).forEach((e,i) => {
    e.getElementsByTagName('img')[0].src=songs[i].poster
    e.getElementsByTagName('h5')[0].innerHTML=songs[i].songName
})

// for search

let search_result = document.getElementsByClassName('search_result')[0];
songs.forEach(element => {
    const{id, songName, poster} =element;
    let card = document.createElement('a');
    card.classList.add('card')
    card.href ="#" + id;
    card.innerHTML = `<img src="${poster}" alt="img">
                        <div class="contents">
                            ${songName}
                        </div>`;
                        
    search_result.appendChild(card);

});

let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup',()=>{
    let input_value =input.value.toUpperCase();
    let itemss = search_result.getElementsByTagName('a');
    for (let index = 0; index < itemss.length; index++) {
        let as = itemss[index].getElementsByClassName('contents')[0];
        let text_value = as.textContent || as.innerHTML;
        if (text_value.toUpperCase().indexOf(input_value)>-1) {
            itemss[index].style.display = "flex";
        }
        else{
            itemss[index].style.display = "none";
        }
        if (input.value==0) {
            search_result.style.display='none'
        }
        else{
            search_result.style.display=''

        }
    }
})

// for music 
let masterPlay =document.getElementById('masterPlay');
let wave =document.getElementById('wave');
masterPlay.addEventListener('click',()=>{
    if(music.paused || music.currentTime<=0){
        music.play();
        wave.classList.add('active1')
        masterPlay.classList.add('bi-pause-fill')
        masterPlay.classList.remove('bi-play-fill')
    }
    else{
        music.pause();
        wave.classList.remove('active1')
        masterPlay.classList.add('bi-play-fill')
        masterPlay.classList.remove('bi-pause-fill')
    }
})

const makeAllBackground = ()=>{
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
        el.style.background = 'rgb(105,105,105,.0)';
    })
}

const makeAllplay = ()=>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=>{
        el.classList.add('bi-play-circle-fill')
        el.classList.remove('bi-pause-circle-fill')
    })
}



let index = 0;
let poster= document.getElementById('poster-play');
let title = document.getElementById('title');
let download_music = document.getElementById('download-music');

Array.from(document.getElementsByClassName('playListPlay')).forEach((e)=>{
    e.addEventListener('click',(el)=>{
        index = el.target.id;
        music.src = `audio/${index}.m4a`;
        poster.src = `img/${index}.jpg`;
        masterPlay.classList.add('bi-pause-fill')
        masterPlay.classList.remove('bi-play-fill')
        music.play();

        download_music.href = `audio/${index}.m4a`

        let songTitles = songs.filter((els)=>{
            return els.id ==index;
        })
        songTitles.forEach(elss=>{
            let{songName} =elss
            title.innerHTML = songName
            download_music.setAttribute('download',songName);
        })

        makeAllBackground();

        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background= 'rgb(105,105,105,.1)';
        makeAllplay();
        el.target.classList.add('bi-pause-circle-fill');
        el.target.classList.remove('bi-play-circle-fill');
        wave.classList.add('active1')

    })
})


// timeline

const currentStart = document.getElementById('currentStart');
const currentEnd = document.getElementById('currentEnd');
const seek = document.getElementById('seek');
const bar2 = document.getElementById('bar2');
// const dot = document.getElementsByClassName('dot');
// for music

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_durr= music.duration;

    let min1 =Math.floor(music_durr/60)
    let sec1 =Math.floor(music_durr%60)

    if (sec1<10) {
        sec1=`0${sec1}`
    }
    currentEnd.innerText = `${min1}:${sec1}`
    
    let min2= Math.floor(music_curr/60)
    let sec2= Math.floor(music_curr%60)

    if (sec2<10) {
        sec2=`0${sec2}`
    }
     currentStart.innerText = `${min2}:${sec2}`

     let progressBar = parseInt((music_curr/music_durr)*100);
     seek.value = progressBar;
     let seekbar =  seek.value;
     bar2.style.width = `${seekbar}%`;
    //  dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change',()=>{
    music.currentTime = seek.value * music.duration/100;
})
// volume---------------
let vol_icon =document.getElementById('vol_icon');
let vol =document.getElementById('vol'); 
let vol_bar =document.getElementsByClassName('vol-bar')[0];
let vol_dot =document.getElementById('vol_dot');

vol.addEventListener('change',()=>{
    if(vol.value==0){
        vol_icon.classList.remove('bi-volume-up-fill')
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.add('bi-volume-off-fill')
        
    }
    if (vol.value>0) {
        vol_icon.classList.remove('bi-volume-up-fill')
        vol_icon.classList.add('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-off-fill')
    }
    if (vol.value>50) {
        vol_icon.classList.add('bi-volume-up-fill')
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-off-fill')
    }

    let vol_a =vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;

    music.volume=vol_a/100;

})

// next and prev---------
let back = document.getElementById('back')
let next = document.getElementById('next')

back.addEventListener('click',()=>{
    index-=1;

    if (index<1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
   
    music.src = `audio/${index}.m4a`;
    poster.src = `img/${index}.jpg`;
    masterPlay.classList.add('bi-pause-fill')
    masterPlay.classList.remove('bi-play-fill')
    music.play();

    let songTitles = songs.filter((els)=>{
        return els.id ==index;
    })
    songTitles.forEach(elss=>{
        let{songName} =elss
        title.innerHTML = songName
    })

    makeAllBackground();

    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background= 'rgb(105,105,105,.1)';
    makeAllplay();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1')
})

next.addEventListener('click',()=>{
    index++;

    if (index>Array.from(document.getElementsByClassName('songItem')).length) {
       index=1;
    }
   
    music.src = `audio/${index}.m4a`;
    poster.src = `img/${index}.jpg`;
    masterPlay.classList.add('bi-pause-fill')
    masterPlay.classList.remove('bi-play-fill')
    music.play();

    let songTitles = songs.filter((els)=>{
        return els.id ==index;
    })
    songTitles.forEach(elss=>{
        let{songName} =elss
        title.innerHTML = songName
    })

    makeAllBackground();

    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background= 'rgb(105,105,105,.1)';
    makeAllplay();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1')
})






// for scroll left and right

let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop-song')[0];

pop_song_right.addEventListener('click',()=>{
    pop_song.scrollLeft +=330
})

pop_song_left.addEventListener('click',()=>{
    pop_song.scrollLeft -=330
})


let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let item = document.getElementsByClassName('item')[0];

pop_art_right.addEventListener('click',()=>{
    item.scrollLeft +=330
})

pop_art_left.addEventListener('click',()=>{
    item.scrollLeft -=330
})


// suffle

let shuffle =document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click',()=>{
    let a =shuffle.innerHTML;
    // a=`span></span>`
    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat')
            shuffle.classList.remove('bi-music-note-beamed')
            shuffle.classList.remove('bi-shuffle')
            shuffle.innerHTML = 'repeat'; 
            break;
    
        case "repeat":
            shuffle.classList.remove('bi-arrow-repeat')
            shuffle.classList.remove('bi-music-note-beamed')
            shuffle.classList.add('bi-shuffle')
            shuffle.innerHTML = 'random';
            break;

            case "random":
            shuffle.classList.remove('bi-arrow-repeat')
            shuffle.classList.add('bi-music-note-beamed')
            shuffle.classList.remove('bi-shuffle')
            shuffle.innerHTML = 'next';
            break;
    }
})

// music automatic change after finish



const next_music = () =>{
    // index ++
    if (index==songs.length) {
        index=1
    }
    else {
        index++
    }

    music.src = `audio/${index}.m4a`;
    poster.src = `img/${index}.jpg`;
    masterPlay.classList.add('bi-pause-fill')
    masterPlay.classList.remove('bi-play-fill')
    music.play();

    download_music.href = `audio/${index}.m4a`

    let songTitles = songs.filter((els)=>{
        return els.id ==index;
    })
    songTitles.forEach(elss=>{
        let{songName} =elss
        title.innerHTML = songName
        download_music.setAttribute('download',songName);
    })

    makeAllBackground();

    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background= 'rgb(105,105,105,.1)';
    makeAllplay();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1')
}

const repeat_music = () =>{
    // index ++
  index;

    music.src = `audio/${index}.m4a`;
    poster.src = `img/${index}.jpg`;
    masterPlay.classList.add('bi-pause-fill')
    masterPlay.classList.remove('bi-play-fill')
    music.play();

    download_music.href = `audio/${index}.m4a`

    let songTitles = songs.filter((els)=>{
        return els.id ==index;
    })
    songTitles.forEach(elss=>{
        let{songName} =elss
        title.innerHTML = songName
        download_music.setAttribute('download',songName);
    })

    makeAllBackground();

    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background= 'rgb(105,105,105,.1)';
    makeAllplay();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1')
}

const random_music = () =>{
    // index ++
    if (index==songs.length) {
        index=1
    }
    else {
        index=Math.floor((Math.random()*songs.length)+1)
    }

    music.src = `audio/${index}.m4a`;
    poster.src = `img/${index}.jpg`;
    masterPlay.classList.add('bi-pause-fill')
    masterPlay.classList.remove('bi-play-fill')
    music.play();

    download_music.href = `audio/${index}.m4a`

    let songTitles = songs.filter((els)=>{
        return els.id ==index;
    })
    songTitles.forEach(elss=>{
        let{songName} =elss
        title.innerHTML = songName
        download_music.setAttribute('download',songName);
    })

    makeAllBackground();

    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background= 'rgb(105,105,105,.1)';
    makeAllplay();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1')
}


music.addEventListener('ended',()=>{
   let b = shuffle.innerHTML;
   switch (b) {
    case 'repeat':
        repeat_music();
        break;
   
        case 'next':
            next_music()
            break;

            case 'random':
                random_music()
                break;
   }
})
