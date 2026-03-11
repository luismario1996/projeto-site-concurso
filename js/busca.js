function buscarQuestoes() {
  let busca = document.getElementById("buscarQuestoes").value.toLowerCase();

  localStorage.setItem("buscaQuestoes", busca);

  window.location.href = "questoes.html";
}
