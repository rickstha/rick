// for responsive
let menu_list_btn = document.getElementById('menu_list_btn');
let menu_side = document.getElementsByClassName('menu-side')[0];
let song_side = document.getElementsByClassName('song-side')[0];


menu_list_btn.addEventListener('click',()=>{
    menu_side.style.transform = 'unset !important'
    menu_list_btn.style.display='none';
    
})
song_side.addEventListener('click',()=>{
    menu_side.style.transform = "translateX(-100%)";
    menu_list_btn.style.display = 'flex'
 
})
