let pedidos = {
  prato: "",
  bebida: "",
  sobremesa: "",
  nome: "",
  endereco: "",
};

function verificaOrdem() {
  if (!pedidos.prato || !pedidos.bebida || !pedidos.sobremesa) {
    alert(
      "Por favor, selecione um ítem de cada categoria para finalizar o pedido."
    );
  } else {
    let verifyOrderDiv = document.getElementById("verify-order");
    verifyOrderDiv.children[0].children[1].children[0].innerHTML =
      pedidos.prato.getElementsByClassName("option-name")[0].innerHTML;
    verifyOrderDiv.children[0].children[2].children[0].innerHTML =
      pedidos.bebida.getElementsByClassName("option-name")[0].innerHTML;
    verifyOrderDiv.children[0].children[3].children[0].innerHTML =
      pedidos.sobremesa.getElementsByClassName("option-name")[0].innerHTML;
    verifyOrderDiv.children[0].children[1].children[1].innerHTML = pedidos.prato
      .getElementsByClassName("option-price")[0]
      .innerHTML.replace("R$ ", "");
    verifyOrderDiv.children[0].children[2].children[1].innerHTML =
      pedidos.bebida
        .getElementsByClassName("option-price")[0]
        .innerHTML.replace("R$ ", "");
    verifyOrderDiv.children[0].children[3].children[1].innerHTML =
      pedidos.sobremesa
        .getElementsByClassName("option-price")[0]
        .innerHTML.replace("R$ ", "");
    let totalPedidos =
      parseFloat(
        pedidos.prato
          .getElementsByClassName("option-price")[0]
          .innerHTML.replace("R$ ", "")
          .replace(",", ".")
      ) +
      parseFloat(
        pedidos.bebida
          .getElementsByClassName("option-price")[0]
          .innerHTML.replace("R$ ", "")
          .replace(",", ".")
      ) +
      parseFloat(
        pedidos.sobremesa
          .getElementsByClassName("option-price")[0]
          .innerHTML.replace("R$ ", "")
          .replace(",", ".")
      );
    verifyOrderDiv.children[0].children[4].children[1].innerHTML =
      "R$ " + totalPedidos.toFixed(2).replace(".", ",");
    verifyOrderDiv.style.display = "block";
  }
}

window.onload = function () {
  setInterval(function () {
    let finishOrderBtn = document.getElementById("finish-order-btn");
    if (pedidos.prato && pedidos.bebida && pedidos.sobremesa) {
      finishOrderBtn.innerHTML = "Fechar pedido";
      finishOrderBtn.classList.add("finished");
      finishOrderBtn.disabled = false;
    } else {
      finishOrderBtn.innerHTML = "Selecione os 3 itens para fechar o pedido";
      finishOrderBtn.classList.remove("finished");
      finishOrderBtn.disabled = true;
    }
  }, 200);

  let options = document.getElementsByClassName("option");

  for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function (event) {
      let clickedDiv = event.currentTarget;
      let parentDiv = clickedDiv.parentElement;
      for (let i = 0; i < parentDiv.children.length; i++) {
        parentDiv.children[i].classList.remove("selected");
        if (parentDiv.children[i].children[4])
          parentDiv.children[i].children[4].remove();
      }
      if (parentDiv.id === "food") {
        pedidos.prato = clickedDiv;
      } else if (parentDiv.id === "drink") {
        pedidos.bebida = clickedDiv;
      } else if (parentDiv.id === "dessert") {
        pedidos.sobremesa = clickedDiv;
      }
      if (!clickedDiv.classList.contains("selected")) {
        clickedDiv.classList.add("selected");
        clickedDiv.innerHTML +=
          '<img class="option-checked" src="assets/images/checked.png">';
      }
    });
  }

  document
    .getElementById("confirm-order-btn")
    .addEventListener("click", function (event) {
      if (!pedidos.prato || !pedidos.bebida || !pedidos.sobremesa) {
        alert(
          "Por favor, selecione um ítem de cada categoria para finalizar o pedido."
        );
      } else {
        let verifyOrderDiv = document.getElementById("verify-order");
        verifyOrderDiv.style.display = "none";
        let nome = null,
          endereco = null;
        while (!nome) {
          nome = prompt("Para melhor identificar-lo, qual o seu nome?");
        }
        while (!endereco) {
          endereco = prompt("Para qual endereço o pedido será enviado?");
        }
        let totalPedidos =
          parseFloat(
            pedidos.prato
              .getElementsByClassName("option-price")[0]
              .innerHTML.replace("R$ ", "")
              .replace(",", ".")
          ) +
          parseFloat(
            pedidos.bebida
              .getElementsByClassName("option-price")[0]
              .innerHTML.replace("R$ ", "")
              .replace(",", ".")
          ) +
          parseFloat(
            pedidos.sobremesa
              .getElementsByClassName("option-price")[0]
              .innerHTML.replace("R$ ", "")
              .replace(",", ".")
          );
        let message = `Olá, gostaria de fazer o pedido:
- Prato: ${pedidos.prato.getElementsByClassName("option-name")[0].innerHTML}
- Bebida: ${pedidos.bebida.getElementsByClassName("option-name")[0].innerHTML}
- Sobremesa: ${
          pedidos.sobremesa.getElementsByClassName("option-name")[0].innerHTML
        }
Total: R$ ${totalPedidos.toFixed(2)}

Nome: ${nome}
Endereço: ${endereco}`;
        window.location.href =
          "https://wa.me/5538991386950?text=" + encodeURIComponent(message);
      }
    });

  document
    .getElementById("cancel-order-btn")
    .addEventListener("click", function () {
      let verifyOrderDiv = document.getElementById("verify-order");
      verifyOrderDiv.style.display = "none";
    });
};
