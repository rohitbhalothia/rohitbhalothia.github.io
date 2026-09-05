const progress = document.getElementById("progress");
const cakeWrap = document.querySelector(".cake-wrap");
const cakeCopy = document.querySelector(".cake-copy");
const envelope = document.querySelector(".envelope");
const photos = document.querySelectorAll(".polaroid");
const popups = document.querySelectorAll(".popup");

function updateProgress(){
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.min(100, Math.max(0, scrollY / max * 100))}%`;
}
window.addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      if(el === cakeWrap){
        el.classList.add("active");
        cakeCopy.classList.add("active");
        setTimeout(()=>el.classList.add("extinguish"), 1700);
      }
      if(el === envelope) el.classList.add("active");
      if(el.classList.contains("polaroid")) el.classList.add("visible");
      if(el.classList.contains("popup")) el.classList.add("visible");
    }
  });
},{threshold:.28});

[cakeWrap,envelope,...photos,...popups].forEach(el=>io.observe(el));

const surprise = document.getElementById("surprise");
const btn = document.getElementById("surpriseBtn");
const close = document.querySelector(".close");
const confetti = document.querySelector(".confetti");

function launchConfetti(){
  confetti.innerHTML = "";
  for(let i=0;i<90;i++){
    const p=document.createElement("i");
    p.style.left=Math.random()*100+"%";
    p.style.top=(-Math.random()*30)+"%";
    p.style.animationDelay=(Math.random()*1.5)+"s";
    p.style.animationDuration=(2.2+Math.random()*2)+"s";
    p.style.transform=`rotate(${Math.random()*360}deg)`;
    p.style.background=["#ff7eaa","#f8bd65","#b884e8","#7fd8c4","#ff9fcb"][i%5];
    confetti.appendChild(p);
  }
}
btn.addEventListener("click",()=>{surprise.classList.add("open");launchConfetti()});
close.addEventListener("click",()=>surprise.classList.remove("open"));
surprise.addEventListener("click",e=>{if(e.target===surprise) surprise.classList.remove("open")});
