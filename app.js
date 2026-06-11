
let questoes=[], atual=0, acertos=0;

async function carregarDisciplina(nome){
 const r = await fetch(nome+'.json');
 const banco = await r.json();
 questoes = banco.sort(()=>Math.random()-0.5).slice(0,10);
 atual=0; acertos=0;
 mostrarQuestao();
}

function mostrarQuestao(){
 const q = questoes[atual];
 document.getElementById('conteudo').innerHTML=`
 <div class="card">
 <h3>Questão ${atual+1} de ${questoes.length}</h3>
 <p>${q.enunciado}</p>
 ${q.alternativas.map((a,i)=>`
 <label class="alt"><input type="radio" name="r" value="${i}"> ${a}</label>`).join('')}
 <button onclick="responder()">Responder</button>
 </div>`;
}

function responder(){
 const sel=document.querySelector('input[name=r]:checked');
 if(!sel){alert('Escolha uma alternativa');return;}
 const q=questoes[atual];
 const ok=Number(sel.value)===q.correta;
 if(ok) acertos++;
 document.getElementById('conteudo').innerHTML=`
 <div class="card">
 <h3>${ok?'✅ Correta':'❌ Incorreta'}</h3>
 <p><b>Gabarito:</b> ${String.fromCharCode(65+q.correta)}</p>
 <p>${q.comentario}</p>
 <button onclick="proxima()">Próxima</button>
 </div>`;
}

function proxima(){
 atual++;
 if(atual>=questoes.length){
  let hist=JSON.parse(localStorage.getItem('historico')||'[]');
  hist.push({data:new Date().toLocaleString(),acertos});
  localStorage.setItem('historico',JSON.stringify(hist));
  document.getElementById('conteudo').innerHTML=`
  <div class="card">
  <h2>Fim do Simulado</h2>
  <p>Acertos: ${acertos}/10</p>
  </div>`;
  return;
 }
 mostrarQuestao();
}
