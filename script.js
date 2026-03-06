


let usuario="";
let materiaAtual="";
let subtemaAtual="";
let indice=0;
let acertos=0;
let erros=0;

/* ================= BANCO DE QUESTÕES ================= */

const bancoQuestoes = {

/* ================= LÍNGUA PORTUGUESA ================= */
portugues:{
"Compreensão e interpretação de textos":[],
"Tipologia textual":[],
"Ortografia oficial":[],
"Acentuação gráfica":[],
"Emprego das classes de palavras":[],
"Emprego do sinal indicativo de crase":[],
"Sintaxe da oração e do período":[],
"Pontuação":[],
"Concordância nominal e verbal":[],
"Regência nominal e verbal":[],
"Significação das palavras":[],
"Redação oficial":[]
},

/* ================= INFORMÁTICA ================= */
informatica:{
"Noções de sistema operacional (Windows)":[],
"Edição de textos (Microsoft Office 365)":[],
"Redes de computadores":[],
"Internet e intranet":[],
"Navegadores (IE, Firefox, Chrome)":[],
"Correio eletrônico (Outlook e Thunderbird)":[],
"Sítios de busca":[],
"Grupos de discussão":[],
"Redes sociais":[],
"Computação na nuvem":[],
"Organização de arquivos":[],
"Segurança da informação":[],
"Procedimentos de segurança":[],
"Vírus e pragas virtuais":[],
"Antivírus e firewall":[],
"Backup":[],
"Armazenamento na nuvem":[]
},

/* ================= GEOGRAFIA E HISTÓRIA ================= */
geografia:{
"Localização e limites":[],
"Hidrografia":[],
"População":[],
"Aspectos políticos, administrativos, econômicos e culturais":[],
"Pontos turísticos":[],
"Patrimônio cultural":[],
"Clima e vegetação":[],
"Ocupação geográfica":[],
"História da cidade":[]
},

/* ================= DIREITOS HUMANOS ================= */

direitoshumanos:{

"Teoria geral dos direitos humanos":[],

"Conceitos, terminologia, estrutura normativa e fundamentação":[],

"Afirmação histórica dos direitos humanos":[],

"Direitos humanos e responsabilidade do Estado":[],

"Tratados Internacionais de Proteção aos Direitos Humanos":[
],

"Declaração Universal dos Direitos Humanos (1948)":[],

"Convenção Americana sobre Direitos Humanos - Pacto de São José da Costa Rica (Decreto 678/1992 art 1 ao 32)":[],

"Declaração de Pequim – Igualdade, Desenvolvimento e Paz":[],

"Convenção para Prevenção e Repressão do Crime de Genocídio":[]

},


/* ================= DIREITO ADMINISTRATIVO ================= */

direitoadministrativo:{

"Estado, governo e Administração Pública":[],

"Conceito, fontes e princípios do Direito Administrativo":[],

"Organização administrativa: centralização, descentralização, concentração e desconcentração":[],

"Administração direta e indireta":[],

"Agentes públicos: espécies e classificação":[],

"Poderes, deveres e prerrogativas dos agentes públicos":[],

"Cargo, emprego e função pública":[],

"Regime jurídico dos servidores":[],

"Provimento e vacância":[],

"Remoção, redistribuição e substituição":[],

"Direitos e vantagens dos servidores":[],

"Regime disciplinar":[],

"Responsabilidade civil, criminal e administrativa":[],

"Processo Administrativo":[],

"Processo Administrativo Disciplinar (PAD)":[],

"Sindicância":[],

"Bens públicos":[],

"Improbidade administrativa (Lei 8.429/92)":[],

"Lei de Acesso à Informação (Lei 12.527/2011)":[],

"Lei Geral de Proteção de Dados (Lei 13.709/2018)":[]

},

/* ================= DIREITO CONSTITUCIONAL ================= */

/* ================= DIREITO CONSTITUCIONAL ================= */

direitoconstitucional:{

"Princípios Fundamentais (Art. 1º ao 4º da Constituição Federal de 1988)":[],


"Direitos e deveres fundamentais":[
],

"Direitos e deveres individuais e coletivos":[
],

"Direito à vida, liberdade, igualdade, segurança e propriedade":[
],

"Direitos sociais":[
],

"Nacionalidade":[
],

"Cidadania e direitos políticos":[
],

"Partidos políticos":[
],

"Garantias constitucionais individuais":[
],

"Garantias dos direitos coletivos, sociais e políticos":[
],

"Defesa do Estado e das instituições democráticas":[
],

"Segurança pública":[
],

"Organização da segurança pública":[
],

"Ordem social":[
],

"Base e objetivos da ordem social":[
],

"Seguridade social":[
],

"Educação, cultura e desporto":[
],

"Ciência e tecnologia":[
],

"Comunicação social":[
],

"Meio ambiente":[
],

"Família, criança, adolescente e idoso":[
],

"Direitos Humanos e acesso à justiça":[
],

"Dever do Estado de promover o acesso à justiça":[
]

}
,

/* ================= DIREITO PENAL ================= */

direitopenal:{

"Crimes contra a pessoa":[],

"Crimes contra a pessoa":[],


"Lesão corporal":[],

"Periclitação da vida e da saúde":[],

"Inviolabilidade dos segredos":[],

"Crimes contra o patrimônio":[],

"Crimes contra a Administração Pública (art 312 ao 359 do Código Penal)":[],

"Abuso de autoridade (Lei 13.869/2019)":[],

"Estatuto do Desarmamento (Lei 10.826/03)":[],

"Crimes hediondos (Lei 8.072/90)":[],

"Lei de tortura (Lei 9.455/97)":[],

"Lei de drogas (Lei 11.343/06)":[],

"Preconceito de raça ou cor (Lei 7.716/89)":[],

"Estatuto do Idoso - crimes (Lei 10.741/03)":[],

"Lei Maria da Penha (Lei 11.340/06)":[],

"Crimes no Estatuto da Criança e do Adolescente":[],

"Aplicação da Lei Penal e Teoria do Crime (art 13 ao 25)":[]

},


/* ================= DIREITO PROCESSUAL PENAL ================= */

processualpenal:{

"Inquérito policial":[],

"Termo Circunstanciado de Ocorrência (TCO)":[],

"Prova e local de crime":[],

"Prisões":[],

"Prisão em flagrante":[],

"Prisão preventiva":[],

"Prisão temporária":[]

},


/* ================= LEGISLAÇÃO ================= */

legislacao:{

"Estatuto dos Servidores Públicos de Manaus (Lei 1.118/1971)":[],

"Estatuto Geral das Guardas Municipais (Lei 13.022/2014)":[],

"Estatuto da Guarda Municipal de Manaus (Lei Complementar 16/2021)":[],

"Sistema Único de Segurança Pública (Lei 13.675/2018)":[],

"Decreto 9.489/2018 regulamentação SUSP":[],

"Estatuto do Desarmamento (Lei 10.826/2003)":[],

"Estatuto da Criança e do Adolescente (Lei 8.069/1990)":[],

"Lei de Abuso de Autoridade (Lei 13.869/2019)":[],

"Lei de Crimes de Responsabilidade (Lei 1.079/1950)":[],

"Lei de Drogas (Lei 11.343/2006)":[],

"Lei de Improbidade Administrativa (Lei 8.429/1992)":[],

"Estatuto do Idoso (Lei 10.741/2003)":[],

"Lei Maria da Penha (Lei 11.340/2006)":[],

"Lei de Racismo (Lei 7.716/1989)":[],

"Estatuto da Igualdade Racial (Lei 12.288/2010)":[]

}


};

/* ================= SISTEMA ================= */

function entrar(){
usuario=document.getElementById("nome").value;
if(usuario==="") return alert("Digite seu nome");
document.getElementById("login").classList.add("hidden");
document.getElementById("menu").classList.remove("hidden");
document.getElementById("bemvindo").innerText="Bem-vindo, "+usuario;
}

function abrirSubtemas(materia){
materiaAtual=materia;
document.getElementById("menu").classList.add("hidden");
document.getElementById("subtemas").classList.remove("hidden");

let lista=document.getElementById("listaSubtemas");
lista.innerHTML="";

let titulo="";
if(materia==="portugues") titulo="Língua Portuguesa";
if(materia==="informatica") titulo="Noções de Informática";
if(materia==="geografia") titulo="Geografia e História de Manaus";
if(materia==="direito") titulo="Noções de Direito";

document.getElementById("tituloSubtema").innerText=titulo;

for(let sub in bancoQuestoes[materia]){
let btn=document.createElement("button");
btn.innerText=sub;
btn.onclick=()=>iniciarQuiz(sub);
lista.appendChild(btn);
}
}

function iniciarQuiz(sub){
if(bancoQuestoes[materiaAtual][sub].length===0){
alert("Ainda não há questões cadastradas neste subtema.");
return;
}
subtemaAtual=sub;
indice=0;
acertos=0;
erros=0;

document.getElementById("subtemas").classList.add("hidden");
document.getElementById("quiz").classList.remove("hidden");
document.getElementById("tituloQuiz").innerText=sub;
mostrarPergunta();
}

function mostrarPergunta(){
let questao=bancoQuestoes[materiaAtual][subtemaAtual][indice];
document.getElementById("pergunta").innerText=questao.pergunta;
let divAlt=document.getElementById("alternativas");
divAlt.innerHTML="";

for(let letra of ["A","B","C","D","E"]){
let btn=document.createElement("button");
btn.innerText=letra+") "+questao.alternativas[letra];
btn.onclick=()=>verificar(btn,letra);
divAlt.appendChild(btn);
}
}

function verificar(botao,escolha){
let correta=bancoQuestoes[materiaAtual][subtemaAtual][indice].correta;
let botoes=document.querySelectorAll("#alternativas button");
botoes.forEach(b=>b.disabled=true);

if(escolha===correta){
botao.classList.add("correct");
acertos++;
}else{
botao.classList.add("wrong");
botoes.forEach(b=>{
if(b.innerText.startsWith(correta)) b.classList.add("correct");
});
erros++;
}

document.getElementById("btnProxima").classList.remove("hidden");
}

function proxima(){
indice++;
document.getElementById("btnProxima").classList.add("hidden");
if(indice<bancoQuestoes[materiaAtual][subtemaAtual].length){
mostrarPergunta();
}else{
finalizar();
}
}

function finalizar(){
document.getElementById("quiz").classList.add("hidden");
document.getElementById("resultado").classList.remove("hidden");
document.getElementById("placar").innerText=
"Acertos: "+acertos+" | Erros: "+erros;

new Chart(document.getElementById("grafico"),{
type:"pie",
data:{
labels:["Acertos","Erros"],
datasets:[{data:[acertos,erros]}]
}
});
}

function voltarMenu(){
document.getElementById("resultado").classList.add("hidden");
document.getElementById("quiz").classList.add("hidden");
document.getElementById("subtemas").classList.add("hidden");
document.getElementById("menu").classList.remove("hidden");
}

