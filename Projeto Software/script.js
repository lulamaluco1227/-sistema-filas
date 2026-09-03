const cadastroForm = document.getElementById("cadastroForm");
if (cadastroForm) {
    cadastroForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("emailCadastro").value;
        const senha = document.getElementById("senhaCadastro").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;
        const mensagem = document.getElementById("mensagemCadastro");
        if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
            mensagem.textContent = "Preencha todos os campos.";
            return;
        }
        if (senha !== confirmarSenha) {
            mensagem.textContent = "As senhas não são iguais.";
            return;
        }
        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        mensagem.textContent = "Cadastro realizado com sucesso!";
        setTimeout(function() {
            window.location.href = "index.html";
        }, 1000);
    });
}
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const mensagem = document.getElementById("mensagem");
        const usuarioSalvo = localStorage.getItem("usuario");
        if (usuarioSalvo === null) {
            mensagem.textContent = "Usuário não cadastrado.";
            return;
        }
        const usuario = JSON.parse(usuarioSalvo);
        if (email === usuario.email && senha === usuario.senha) {
            localStorage.setItem("logado", "true");
            window.location.href = "fila.html";
        } else {
            mensagem.textContent = "E-mail ou senha incorretos.";
        }
    });
}
const gerarSenha = document.getElementById("gerarSenha");
if (gerarSenha) {
    const logado = localStorage.getItem("logado");
    if (logado !== "true") {
        window.location.href = "index.html";
    }
    let numeroSenha = Number(localStorage.getItem("numeroSenha"));
    if (isNaN(numeroSenha)) {
        numeroSenha = 0;
    }
    const proximaSenha = document.getElementById("proximaSenha");
    const senhaAtual = document.getElementById("senhaAtual");
    proximaSenha.textContent = "A" + String(numeroSenha + 1).padStart(3, "0");
    gerarSenha.addEventListener("click", function() {
        numeroSenha++;
        localStorage.setItem("numeroSenha", numeroSenha);
        const senha = "A" + String(numeroSenha).padStart(3, "0");
        document.getElementById("minhaSenha").textContent =
            "Sua senha é: " + senha;
        proximaSenha.textContent =
            "A" + String(numeroSenha + 1).padStart(3, "0");
        senhaAtual.textContent = senha;
    });
}
const sair = document.getElementById("sair");
if (sair) {
    sair.addEventListener("click", function() {
        localStorage.removeItem("logado");
        window.location.href = "index.html";
    });
}