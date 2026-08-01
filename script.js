// ---------- Elements ----------
const screens = document.querySelectorAll(".screen");

const intro = document.getElementById("intro");
const giftScreen = document.getElementById("giftScreen");
const braceletScreen = document.getElementById("braceletScreen");
const messageScreen = document.getElementById("messageScreen");
const timeline = document.getElementById("timeline");
const finalScreen = document.getElementById("finalScreen");

const beginBtn = document.getElementById("beginBtn");
const gift = document.getElementById("gift");
const lid = document.querySelector(".lid");
const continueBtn = document.getElementById("continueBtn");
const memoryBtn = document.getElementById("memoryBtn");
const finalBtn = document.getElementById("finalBtn");
const replayBtn = document.getElementById("replay");

const music = document.getElementById("music");

// ---------- Music System ----------
// Plays the user's song "Tenu Sang Rakhna" (assets/photos/music.mpeg)
function playMusic(){
    music.volume = 0.5;
    const p = music.play();
    if(p && p.catch){
        p.catch(()=>{});
    }
}

// ---------- Helpers ----------
function show(screen){
    screens.forEach(s=>{
        s.classList.remove("active");
        s.style.display = "none";
    });

    screen.classList.add("active");
    screen.style.display = "flex";

    // Reset the screen's scroll position AFTER it becomes visible,
    // so it always opens from the top (display:none ignores scrollTop changes).
    requestAnimationFrame(()=>{
        screen.scrollTop = 0;
        const inner = screen.querySelector(".timeline");
        if(inner){ inner.scrollTop = 0; }
    });
}

// Safe confetti wrapper (never breaks the page if CDN fails to load)
function safeConfetti(opts){
    if(typeof confetti === "function"){
        try{ confetti(opts); }catch(e){}
    }
}

// ---------- Begin ----------
beginBtn.onclick = ()=>{
    // Start the song "Tenu Sang Rakhna" (requires a user gesture)
    playMusic();
    show(giftScreen);
};

// ---------- Gift Opening ----------
gift.onclick = ()=>{

    lid.style.transform="translateY(-80px) rotate(-12deg)";

    safeConfetti({
        particleCount:220,
        spread:140,
        origin:{y:0.65}
    });

    setTimeout(()=>{
        show(braceletScreen);
    },1800);

};

// ---------- Bracelet ----------
continueBtn.onclick=()=>{

    show(messageScreen);

};

// ---------- Message ----------
memoryBtn.onclick=()=>{

    document.body.style.overflow="auto";

    // Force-reset the inner timeline scroll container BEFORE showing
    // so it always opens at the first memory (not where it stopped).
    const timelineBox = document.querySelector(".timeline");
    if(timelineBox){ timelineBox.scrollTop = 0; }

    show(timeline);

};

// ---------- Final ----------
finalBtn.onclick=()=>{

    show(finalScreen);

    launchFireworks();

};

// ---------- Replay ----------
replayBtn.onclick=()=>{

    lid.style.transform="translateY(0)";
    document.body.style.overflow="hidden";

    // Reset all scroll positions back to the top
    window.scrollTo(0,0);
    screens.forEach(s=>{
        s.scrollTop = 0;
    });
    const timelineBox = document.querySelector(".timeline");
    if(timelineBox){ timelineBox.scrollTop = 0; }

    show(intro);

    // Re-fire confetti celebration 🎉
    safeConfetti({
        particleCount:120,
        spread:100,
        origin:{y:0.7}
    });

    setTimeout(()=>{
        safeConfetti({
            particleCount:80,
            spread:120,
            origin:{y:0.5}
        });
    },400);

};

// ---------- Fireworks ----------
function launchFireworks(){

let duration=5000;

let animationEnd=Date.now()+duration;

(function frame(){

safeConfetti({

particleCount:5,

angle:60,

spread:55,

origin:{x:0}

});

safeConfetti({

particleCount:5,

angle:120,

spread:55,

origin:{x:1}

});

if(Date.now()<animationEnd){

requestAnimationFrame(frame);

}

})();

}

// ---------- Floating Hearts ----------
setInterval(()=>{

const heart=document.createElement("div");

heart.innerHTML="💙";

heart.style.position="fixed";
heart.style.left=Math.random()*100+"vw";
heart.style.bottom="-40px";
heart.style.fontSize=(20+Math.random()*25)+"px";
heart.style.opacity=.8;
heart.style.pointerEvents="none";
heart.style.transition="6s linear";
heart.style.zIndex="999";

document.body.appendChild(heart);

setTimeout(()=>{
heart.style.transform="translateY(-110vh)";
heart.style.opacity="0";
},100);

setTimeout(()=>{
heart.remove();
},6500);

},900);

// ---------- Shooting Star ----------
setInterval(()=>{

const star=document.createElement("div");

star.style.position="fixed";
star.style.width="3px";
star.style.height="3px";
star.style.background="white";
star.style.boxShadow="0 0 20px white";
star.style.left=Math.random()*100+"vw";
star.style.top="0";
star.style.transform="rotate(45deg)";
star.style.zIndex="0";
star.style.transition="1.2s linear";

document.body.appendChild(star);

setTimeout(()=>{

star.style.left=parseFloat(star.style.left)+250+"px";
star.style.top="300px";
star.style.opacity="0";

},50);

setTimeout(()=>{

star.remove();

},1500);

},3500);

// ---------- Cursor Sparkle Trail ----------
(function(){

const colors = ["#60a5fa","#f472b6","#fde68a","#ffffff","#a78bfa","#34d399"];
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let spawnTimer = null;

function makeSparkle(x, y){
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    const size = (4 + Math.random() * 7) + "px";
    s.style.width = size;
    s.style.height = size;

    document.body.appendChild(s);

    // Random drift + fade out, then remove
    const driftX = (Math.random() - 0.5) * 60;
    const driftY = (Math.random() - 0.5) * 60;

    requestAnimationFrame(()=>{
        s.style.transform = `translate(${driftX}px, ${driftY}px) scale(0.1) rotate(${(Math.random()*180).toFixed(0)}deg)`;
        s.style.opacity = "0";
    });

    setTimeout(()=>{
        s.remove();
    }, 700);
}

function onMove(e){
    const x = e.clientX;
    const y = e.clientY;
    const now = Date.now();

    // Distance-based throttling: spawn sparkles when the cursor has moved enough
    if(now - lastTime > 30){
        const dist = Math.hypot(x - lastX, y - lastY);
        if(dist > 12){
            makeSparkle(x, y);
            lastX = x;
            lastY = y;
            lastTime = now;
        }
    }
}

window.addEventListener("mousemove", onMove);

// Also spawn a few sparkles on tap (for touch devices)
window.addEventListener("touchmove", function(e){
    const t = e.touches[0];
    if(t){
        makeSparkle(t.clientX, t.clientY);
    }
}, {passive:true});

})();
