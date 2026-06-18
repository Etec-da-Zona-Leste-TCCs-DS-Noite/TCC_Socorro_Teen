console.log("SOCORRO IA CARREGADA");
const chatArea = document.querySelector(".chat-area");
const textarea = document.querySelector("textarea");
const button = document.querySelector(".btn-red");

button.addEventListener("click", async () => {

    const mensagem = textarea.value.trim();

    if (!mensagem) return;

    chatArea.innerHTML += `
        <div class="user-message">
            ${mensagem}
        </div>
    `;

    textarea.value = "";

    try {

        const resposta = await fetch(
            "http://102.37.136.142:3000/socorro-ia",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mensagem
                })
            }
        );

        const dados = await resposta.json();

        chatArea.innerHTML += `
            <div class="bot-message">
                ${formatarMarkdown(dados.resposta)}
            </div>
        `;

        function formatarMarkdown(texto) {

    return texto
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
}

        chatArea.scrollTop = chatArea.scrollHeight;

    } catch (erro) {

        chatArea.innerHTML += `
            <div class="bot-message">
                Não foi possível conectar à Socorro IA.
            </div>
        `;

        console.error(erro);
    }

});
