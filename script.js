
const canvas = document.getElementById("fundo-tech");
const ctx = canvas ? canvas.getContext("2d") : null;

let largura;
let altura;
let tempo = 0;

const mouse = {
    x: 0,
    y: 0
};

function obterCores() {
    const modoClaro = document.body.classList.contains("modo-claro");

    if (modoClaro) {
        return {
            fundo: "#F5F8FF",
            brilho: "rgba(41, 116, 153, 0.10)",
            linha: [41, 116, 153]
        };
    }

    return {
        fundo: "#060A13",
        brilho: "rgba(37, 99, 235, 0.13)",
        linha: [37, 99, 235]
    };
}

function ajustarTela() {
    if (!canvas || !ctx) return;

    largura = canvas.width = window.innerWidth;
    altura = canvas.height = window.innerHeight;
}

function desenhar() {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, largura, altura);

    const cores = obterCores();

    ctx.fillStyle = cores.fundo;
    ctx.fillRect(0, 0, largura, altura);

    const brilho = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        280
    );

    brilho.addColorStop(0, cores.brilho);
    brilho.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = brilho;
    ctx.fillRect(0, 0, largura, altura);

    for (let camada = 0; camada < 7; camada++) {
        ctx.beginPath();

        const baseY = altura * 0.25 + camada * 90;

        for (let x = -50; x <= largura + 50; x += 12) {
            const onda =
                Math.sin(x * 0.004 + tempo + camada * 0.5) * 35;

            const profundidade =
                Math.cos(x * 0.002 + tempo * 0.5) * 20;

            const y = baseY + onda + profundidade;
            const distancia = Math.abs(mouse.y - y);

            let destaque = 0;

            if (distancia < 150) {
                destaque = (150 - distancia) / 150;
            }

            if (x === -50) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            const [r, g, b] = cores.linha;

            ctx.strokeStyle = `rgba(
                ${r + destaque * 40},
                ${g + destaque * 50},
                ${b},
                ${0.10 + destaque * 0.35}
            )`;
        }

        ctx.lineWidth = 1 + camada * 0.12;
        ctx.stroke();
    }

    tempo += 0.006;
    requestAnimationFrame(desenhar);
}

if (canvas && ctx) {
    window.addEventListener("resize", ajustarTela);

    window.addEventListener("mousemove", (evento) => {
        mouse.x = evento.clientX;
        mouse.y = evento.clientY;
    });

    ajustarTela();
    desenhar();
}


const botaoClaro = document.querySelector(".div-modo .modo-claro");
const botaoEscuro = document.querySelector(".div-modo .modo-escuro");

function definirTema(tema) {
    document.body.classList.toggle(
        "modo-claro",
        tema === "claro"
    );

    try {
        localStorage.setItem("tema", tema);
    } catch (erro) {
        console.warn("Não foi possível salvar o tema.", erro);
    }
}

let temaSalvo = "escuro";

try {
    temaSalvo = localStorage.getItem("tema") || "escuro";
} catch (erro) {
    console.warn("Não foi possível recuperar o tema.", erro);
}

definirTema(temaSalvo);

if (botaoClaro) {
    botaoClaro.addEventListener("click", (evento) => {
        evento.preventDefault();
        definirTema("claro");
    });
}

if (botaoEscuro) {
    botaoEscuro.addEventListener("click", (evento) => {
        evento.preventDefault();
        definirTema("escuro");
    });
}

const textoDigitando = document.querySelector(".text-digitando");

const frases = [
    "Técnica de TI",
    "Desenvolvedora em formação",
    "Criadora de projetos",
    "Apaixonada por tecnologia"
];

let fraseAtual = 0;
let caractereAtual = 0;
let apagando = false;

function efeitoDigitando() {
    if (!textoDigitando || frases.length === 0) return;

    const frase = frases[fraseAtual];

    if (!apagando) {
        caractereAtual++;

        textoDigitando.textContent = frase.substring(
            0,
            caractereAtual
        );

        if (caractereAtual >= frase.length) {
            apagando = true;
            setTimeout(efeitoDigitando, 1800);
            return;
        }

        setTimeout(efeitoDigitando, 80);
    } else {
        caractereAtual--;

        textoDigitando.textContent = frase.substring(
            0,
            caractereAtual
        );

        if (caractereAtual <= 0) {
            apagando = false;
            fraseAtual = (fraseAtual + 1) % frases.length;

            setTimeout(efeitoDigitando, 500);
            return;
        }

        setTimeout(efeitoDigitando, 45);
    }
}

if (textoDigitando) {
    efeitoDigitando();
} else {
    console.error(
        'Efeito de digitação: elemento ".text-digitando" não encontrado no HTML.'
    );
}

const terminal = document.getElementById("terminalConteudo");
const formulario = document.getElementById("terminalForm");
const campoComando = document.getElementById("comandoTerminal");
const botaoLimpar = document.querySelector(".btn-limpar");

const categorias = {
    sistemas: {
        nome: "Sistemas",
        tecnologias: [
            "Microsoft 365 - Sistemas"
        ]
    },

    programacao: {
        nome: "Programação",
        tecnologias: [
            "C# - Programação",
            "Python - Programação",
            "MySQL - Banco de Dados"
        ]
    },

    web: {
        nome: "Desenvolvimento Web",
        tecnologias: [
            "HTML - Estrutura",
            "CSS - Estilização",
            "JavaScript - Interatividade"
        ]
    },

    design: {
        nome: "Design e IA",
        tecnologias: [
            "Figma - Prototipagem",
            "GitHub - Versionamento",
            "ChatGPT - Assistência com IA",
            "Claude - Assistência com IA",
            "Lovable - Desenvolvimento",
            "NotebookLM - Estudos"
        ]
    }
};

function criarLinha(classe, texto) {
    if (!terminal) return;

    const linha = document.createElement("p");
    linha.className = classe;
    linha.textContent = texto;

    terminal.appendChild(linha);
}

function rolarTerminal() {
    if (!terminal) return;

    terminal.scrollTop = terminal.scrollHeight;
}

function mostrarCategoria(chave) {
    const categoria = categorias[chave];

    if (!categoria) {
        criarLinha("mensagem-erro", "Categoria não encontrada.");
        return;
    }

    const saida = document.createElement("div");
    saida.className = "saida-comando";

    criarLinha(
        "titulo-saida",
        `▸ ${categoria.nome} · ${categoria.tecnologias.length} tecnologia(s)`
    );

    categoria.tecnologias.forEach((tecnologia) => {
        const item = document.createElement("p");
        item.className = "item-saida";
        item.textContent = tecnologia;
        saida.appendChild(item);
    });

    terminal.appendChild(saida);
}

function mostrarAjuda() {
    criarLinha("titulo-saida", "COMANDOS DISPONÍVEIS");
    criarLinha("item-saida", "ajuda - Lista os comandos");
    criarLinha("item-saida", "sistemas - Ferramentas de sistemas");
    criarLinha("item-saida", "programacao - C#, Python e MySQL");
    criarLinha("item-saida", "web - HTML, CSS e JavaScript");
    criarLinha("item-saida", "design - Ferramentas de design e IA");
    criarLinha("item-saida", "habilidades - Mostra todas as categorias");
    criarLinha("item-saida", "limpar - Limpa o terminal");

    rolarTerminal();
}

function limparTerminal() {
    if (!terminal) return;

    terminal.innerHTML = "";
    criarLinha("prompt", "Terminal limpo. Digite 'ajuda' para começar.");
}

function executarComando(comando) {
    const normalizado = comando
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (!normalizado) {
        criarLinha("mensagem-erro", "Digite um comando primeiro.");
        return;
    }

    criarLinha("linha-terminal", `deisiane@portfolio:~$ ${comando}`);

    switch (normalizado) {
        case "ajuda":
        case "help":
            mostrarAjuda();
            break;

        case "sistemas":
            mostrarCategoria("sistemas");
            break;

        case "programacao":
            mostrarCategoria("programacao");
            break;

        case "web":
            mostrarCategoria("web");
            break;

        case "design":
        case "ia":
            mostrarCategoria("design");
            break;

        case "habilidades":
        case "tudo":
            Object.keys(categorias).forEach(mostrarCategoria);
            break;

        case "limpar":
        case "clear":
            limparTerminal();
            break;

        default:
            criarLinha(
                "mensagem-erro",
                `Comando "${comando}" não encontrado. Digite "ajuda".`
            );
    }

    rolarTerminal();
}

// Inicialização
if (terminal && formulario && campoComando) {
    criarLinha("prompt", "Bem-vinda ao terminal de habilidades!");
    criarLinha("item-saida", "Digite 'ajuda' para ver os comandos.");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        executarComando(campoComando.value);

        campoComando.value = "";
        campoComando.focus();
    });

    if (botaoLimpar) {
        botaoLimpar.addEventListener("click", limparTerminal);
    }
} else {
    console.error(
        "Terminal não iniciado. Confira os IDs terminalConteudo, terminalForm e comandoTerminal no HTML."
    );
}


(() => {
    const botaoContato = document.querySelector(".btn-contatos");
    const overlayContato = document.querySelector(".contato-overlay");
    const painelContato = document.querySelector(".contato-painel");
    const botaoFechar = document.querySelector(".fechar-contato");
    const formularioContato = document.querySelector(".form-contato");
    const statusContato = document.querySelector(".status-contato");

    // Verifica se os elementos principais existem.
    if (!botaoContato || !overlayContato || !painelContato) {
        console.warn(
            "Contato: confira .btn-contatos, .contato-overlay e .contato-painel no HTML."
        );
        return;
    }

    // Abre o painel de contato.
    function abrirContato() {
        overlayContato.classList.add("ativo");
        document.body.classList.add("contato-aberto");

        overlayContato.setAttribute("aria-hidden", "false");

        // Impede que a página de fundo role enquanto o painel estiver aberto.
        document.body.style.overflow = "hidden";

        // Coloca o foco no botão de fechar, se disponível.
        if (botaoFechar) {
            botaoFechar.focus();
        }
    }

    // Fecha o painel de contato.
    function fecharContato() {
        overlayContato.classList.remove("ativo");
        document.body.classList.remove("contato-aberto");

        overlayContato.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        botaoContato.focus();
    }

    // Clique no botão principal.
    botaoContato.addEventListener("click", (evento) => {
        evento.preventDefault();
        abrirContato();
    });

    // Botão de fechar.
    if (botaoFechar) {
        botaoFechar.addEventListener("click", fecharContato);
    }

    // Fecha ao clicar fora do painel.
    overlayContato.addEventListener("click", (evento) => {
        if (evento.target === overlayContato) {
            fecharContato();
        }
    });

    // Fecha usando a tecla Escape.
    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            overlayContato.classList.contains("ativo")
        ) {
            fecharContato();
        }
    });

    if (formularioContato) {
        formularioContato.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (!formularioContato.checkValidity()) {
                formularioContato.reportValidity();
                return;
            }

            const dados = new FormData(formularioContato);

            const nome = String(
                dados.get("nome") || ""
            ).trim();

            const email = String(
                dados.get("email") || ""
            ).trim();

            const assunto = String(
                dados.get("assunto") || ""
            ).trim();

            const mensagem = String(
                dados.get("mensagem") || ""
            ).trim();

            // Verifica se os campos essenciais foram preenchidos.
            if (!nome || !email || !mensagem) {
                mostrarStatus(
                    "Preencha seu nome, e-mail e mensagem.",
                    "erro"
                );
                return;
            }

            // Verifica o formato do e-mail.
            const campoEmail = formularioContato.querySelector(
                'input[name="email"]'
            );

            if (campoEmail && !campoEmail.validity.valid) {
                campoEmail.reportValidity();
                return;
            }

            /*
             * O formulário ainda não está conectado a um servidor.
             * Exibe uma confirmação local sem fingir que a mensagem
             * foi enviada.
             */
            mostrarStatus(
                "Formulário preenchido! Para enviar a mensagem, conecte-o a um serviço de envio ou backend.",
                "sucesso"
            );

            console.log("Dados preenchidos no contato:", {
                nome,
                email,
                assunto,
                mensagem
            });
        });
    }

    // Mostra mensagens de estado do formulário.
    function mostrarStatus(mensagem, tipo) {
        if (!statusContato) return;

        statusContato.textContent = mensagem;
        statusContato.classList.remove("erro", "sucesso");
        statusContato.classList.add(tipo);
        statusContato.setAttribute("role", "status");
    }

})();

(() => {
    const botaoContato = document.querySelector(".btn-contatos");
    const overlayContato = document.querySelector(".contato-overlay");
    const painelContato = document.querySelector(".contato-painel");
    const botaoFechar = document.querySelector(".fechar-contato");
    const formularioContato = document.querySelector(".form-contato");
    const statusContato = document.querySelector(".status-contato");

    // Verifica se os elementos principais existem.
    if (!botaoContato || !overlayContato || !painelContato) {
        console.warn(
            "Contato: confira .btn-contatos, .contato-overlay e .contato-painel no HTML."
        );
        return;
    }

    // Abre o painel de contato.
    function abrirContato() {
        overlayContato.classList.add("ativo");
        document.body.classList.add("contato-aberto");

        overlayContato.setAttribute("aria-hidden", "false");

        // Impede que a página de fundo role enquanto o painel estiver aberto.
        document.body.style.overflow = "hidden";

        // Coloca o foco no botão de fechar, se disponível.
        if (botaoFechar) {
            botaoFechar.focus();
        }
    }

    // Fecha o painel de contato.
    function fecharContato() {
        overlayContato.classList.remove("ativo");
        document.body.classList.remove("contato-aberto");

        overlayContato.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        botaoContato.focus();
    }

    // Clique no botão principal.
    botaoContato.addEventListener("click", (evento) => {
        evento.preventDefault();
        abrirContato();
    });

    // Botão de fechar.
    if (botaoFechar) {
        botaoFechar.addEventListener("click", fecharContato);
    }

    // Fecha ao clicar fora do painel.
    overlayContato.addEventListener("click", (evento) => {
        if (evento.target === overlayContato) {
            fecharContato();
        }
    });

    // Fecha usando a tecla Escape.
    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            overlayContato.classList.contains("ativo")
        ) {
            fecharContato();
        }
    });
    if (formularioContato) {
        formularioContato.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (!formularioContato.checkValidity()) {
                formularioContato.reportValidity();
                return;
            }

            const dados = new FormData(formularioContato);

            const nome = String(
                dados.get("nome") || ""
            ).trim();

            const email = String(
                dados.get("email") || ""
            ).trim();

            const assunto = String(
                dados.get("assunto") || ""
            ).trim();

            const mensagem = String(
                dados.get("mensagem") || ""
            ).trim();

            // Verifica se os campos essenciais foram preenchidos.
            if (!nome || !email || !mensagem) {
                mostrarStatus(
                    "Preencha seu nome, e-mail e mensagem.",
                    "erro"
                );
                return;
            }

            // Verifica o formato do e-mail.
            const campoEmail = formularioContato.querySelector(
                'input[name="email"]'
            );

            if (campoEmail && !campoEmail.validity.valid) {
                campoEmail.reportValidity();
                return;
            }

            /*
             * O formulário ainda não está conectado a um servidor.
             * Exibe uma confirmação local sem fingir que a mensagem
             * foi enviada.
             */
            mostrarStatus(
                "Formulário preenchido! Para enviar a mensagem, conecte-o a um serviço de envio ou backend.",
                "sucesso"
            );

            console.log("Dados preenchidos no contato:", {
                nome,
                email,
                assunto,
                mensagem
            });
        });
    }

    // Mostra mensagens de estado do formulário.
    function mostrarStatus(mensagem, tipo) {
        if (!statusContato) return;

        statusContato.textContent = mensagem;
        statusContato.classList.remove("erro", "sucesso");
        statusContato.classList.add(tipo);
        statusContato.setAttribute("role", "status");
    }

})();

(() => {
    const carrossel = document.querySelector(".carrossel-projetos");
    const janela = document.querySelector(".janela-projetos");
    const lista = document.querySelector(".lista-projetos");
    const anterior = document.querySelector(".btn-anterior");
    const proximo = document.querySelector(".btn-proximo");

    if (!carrossel || !janela || !lista) {
        console.error(
            "Projetos: confira .carrossel-projetos, .janela-projetos e .lista-projetos no HTML."
        );
        return;
    }

    const cards = Array.from(lista.querySelectorAll(".card-projeto"));

    if (cards.length === 0) {
        console.warn("Projetos: nenhum card .card-projeto foi encontrado.");
        return;
    }

    let indiceAtual = 0;

    function calcularPasso() {
        if (cards.length < 2) {
            return cards[0].getBoundingClientRect().width;
        }

        const primeiro = cards[0].getBoundingClientRect();
        const segundo = cards[1].getBoundingClientRect();

        return segundo.left - primeiro.left;
    }

    function atualizarCarrossel() {
        const passo = calcularPasso();
        const larguraJanela = janela.clientWidth;
        const larguraLista = lista.scrollWidth;

        const deslocamentoMaximo = Math.max(
            0,
            larguraLista - larguraJanela
        );

        const deslocamento = Math.min(
            indiceAtual * passo,
            deslocamentoMaximo
        );

        lista.style.transform = `translateX(-${deslocamento}px)`;

        if (anterior) {
            anterior.disabled = indiceAtual === 0;
        }

        if (proximo) {
            const chegouAoFim =
                deslocamento >= deslocamentoMaximo - 1;

            proximo.disabled = chegouAoFim;
        }
    }

    function avancar() {
        const passo = calcularPasso();
        const maximo = Math.max(
            0,
            lista.scrollWidth - janela.clientWidth
        );

        const maximoIndice = Math.ceil(maximo / passo);

        indiceAtual = Math.min(indiceAtual + 1, maximoIndice);

        atualizarCarrossel();
    }

    function voltar() {
        indiceAtual = Math.max(0, indiceAtual - 1);
        atualizarCarrossel();
    }

    if (proximo) {
        proximo.addEventListener("click", avancar);
    }

    if (anterior) {
        anterior.addEventListener("click", voltar);
    }

    window.addEventListener("resize", atualizarCarrossel);

    atualizarCarrossel();
})();
