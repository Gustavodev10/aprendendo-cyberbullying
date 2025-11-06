function openPage(pg) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById(pg).style.display = 'block';
}

const questions = [
  { q:"Enviar memes ofensivos pode ser?",
    a:["Brincadeira normal","Cyberbullying","Nada demais","Direito de expressão"],
    c:1, cons:"Ofensas digitais podem ferir e causar trauma."},
  { q:"Alguém te ameaça online. O que fazer?",
    a:["Revidar","Guardar provas e denunciar","Divulgar a ameaça","Bloquear e esquecer"],
    c:1, cons:"Provas são essenciais para denúncia correta."},
  { q:"Expor fotos sem permissão é…",
    a:["Crime","Permitido por amigos","Depende da piada","Uma brincadeira"],
    c:0, cons:"Expor alguém sem consentimento é ilegal."},
  { q:"Quem pode sofrer cyberbullying?",
    a:["Somente crianças","Qualquer pessoa","Somente famosos","Somente mulheres"],
    c:1, cons:"Todos estão sujeitos a ataques digitais."},
  { q:"Se ver um amigo sendo atacado online:",
    a:["Ignore","Faça igual","Apoie e denuncie","Espalhe mais"],
    c:2, cons:"Apoio muda vidas e interrompe agressões."},
];

let i, score, name;

function startQuiz() {
  name = document.getElementById("playerName").value.trim();
  if(!name){ alert("Digite seu nome!"); return; }

  i = 0; score = 0;
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("quizContent").classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[i];
  document.getElementById("questionText").textContent = q.q;
  document.getElementById("progressBar").style.width = ((i/questions.length)*100)+"%";
  document.getElementById("explanation").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");

  const optBox = document.getElementById("options");
  optBox.innerHTML = "";

  q.a.forEach((txt, idx)=>{
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `<strong>${String.fromCharCode(65+idx)})</strong> ${txt}`;
    div.onclick = ()=>select(idx);
    optBox.appendChild(div);
  });
}

function select(idx){
  const q = questions[i];
  document.querySelectorAll(".option").forEach((o,n)=>{
    o.onclick = null;
    if(n===q.c) o.classList.add("correct");
    if(n===idx && idx!==q.c) o.classList.add("wrong");
  });
  if(idx===q.c) score++;

  document.getElementById("explanation").textContent = q.cons;
  document.getElementById("explanation").classList.remove("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion(){
  if(++i < questions.length) renderQuestion();
  else finish();
}

function finish(){
  document.getElementById("quizContent").classList.add("hidden");
  document.getElementById("restartBtn").classList.remove("hidden");

  document.getElementById("leaderboard").innerHTML =
    `🎯 ${name}, você acertou <strong>${score}</strong> de <strong>${questions.length}</strong>!`;
  
  document.getElementById("leaderboard").classList.remove("hidden");
}

function restart(){
  location.reload();
}
