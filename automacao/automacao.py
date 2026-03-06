import pdfplumber
import json
import re
import os

PASTA_PDF = "provas_pdf"
PASTA_JSON = "json_saida"

questoes = []


def extrair_texto_pdf(caminho_pdf):
    texto = ""

    with pdfplumber.open(caminho_pdf) as pdf:
        for pagina in pdf.pages:
            conteudo = pagina.extract_text()

            if conteudo:
                texto += conteudo + "\n"

    return texto


def extrair_questoes(texto):

    # padrão para separar questões
    padrao = r"\d+\).*?(?=\n\d+\)|$)"

    blocos = re.findall(padrao, texto, re.S)

    for bloco in blocos:

        if "a)" not in bloco:
            continue

        pergunta = bloco.split("a)")[0]

        alternativas = re.findall(r"([a-e])\)\s*(.*)", bloco)

        alt_dict = {}

        for letra, texto_alt in alternativas:
            alt_dict[letra] = texto_alt.strip()

        questoes.append({
            "pergunta": pergunta.strip(),
            "alternativas": alt_dict
        })


def processar_pdfs():

    for arquivo in os.listdir(PASTA_PDF):

        if arquivo.endswith(".pdf"):

            caminho = os.path.join(PASTA_PDF, arquivo)

            print("📄 Lendo:", arquivo)

            texto = extrair_texto_pdf(caminho)

            extrair_questoes(texto)


def salvar_json():

    os.makedirs(PASTA_JSON, exist_ok=True)

    caminho_saida = os.path.join(PASTA_JSON, "questoes.json")

    with open(caminho_saida, "w", encoding="utf8") as f:
        json.dump({"interpretacao": questoes}, f, indent=2, ensure_ascii=False)

    print("✅ JSON criado com sucesso")
    print("📊 Total de questões:", len(questoes))


# execução
processar_pdfs()
salvar_json()
