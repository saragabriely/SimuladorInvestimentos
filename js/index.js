
var botaoCalcular = document.querySelector("#botao-calcular");

botaoCalcular.addEventListener("click", function(){
    event.preventDefault(event);

    // Captura os valores digitados
    var form              = document.querySelector("#input-valores");
    var valorInicial      = form.querySelector("#valor-inicial");
    var valorAporteMensal = form.querySelector("#aporte-mensal");
    var tempoMeses        = form.querySelector("#meses");
    var taxaDeJuros       = form.querySelector("#taxa-juros");

    var valorRendimento = calculaJuros(valorInicial.value, taxaDeJuros.value, tempoMeses.value);
    var valorIR         = calculaIR(tempoMeses.value, valorRendimento);
    var valorTotal      = parseFloat(valorInicial.value) + valorRendimento;
    var valorDescontado = (valorTotal - valorIR);

    populaCampos(valorTotal, valorRendimento, valorIR, valorDescontado);
});

function calculaJuros(valorTotal, taxaJurosAnual, tempoMeses) {

    var taxaJurosMensal = calculaTaxaMensal(taxaJurosAnual);
    var vl    = parseFloat(valorTotal);
    var taxa  = parseFloat(taxaJurosMensal);
    var juros = ((vl * taxa ) - vl);
    var total = 0.0;
    let contador = 0;

    while(contador < tempoMeses){
        juros = (vl * taxa);
        console.log("Juros " + juros);
        vl += juros;
        console.log("VL: R$ " + vl);
        contador += 1;
    }
    total = vl - parseFloat(valorTotal);

    return total;
}

function calculaTaxaMensal(taxaJurosAnual) {
    /* Transforma a taxa de juros anual em taxa mensal
    o	Transformar em decimal: 15% = 0,15;
    o	Somar um: 0,15 + 1 = 1,15;
    o	1 / 12 = 0,08333 - quanto o mês representa no ano;
    o	1,15 ^ 0,08333 = 1,01171 - 1 = 0,01171 * 100 = 1,17% ao mês!       
    ((Math.pow(((taxaJurosAnual / 100) + 1), (1 / 12))) - 1) * 100       */

    return ((Math.pow(((taxaJurosAnual / 100) + 1), (1 / 12))) - 1);
}

function calculaIR(tempoMeses, valorTotal) {
   
    var percIR = porcentagemIR(tempoMeses);

    return parseFloat(valorTotal * parseFloat(percIR));
}

function porcentagemIR(meses) {

    if(meses <= 6) return 0.225;                     // Até 180 dias   = 22,5%
    else if(meses > 6 && meses <= 12)  return 0.20;   // 181 - 360 dias = 20%
    else if(meses > 12 && meses <= 18) return 0.175; // 361 - 720 dias = 17,5%
    else return 0.15;                                 // > 720 dias     = 15% 
}

function populaCampos(vlTotal, vlArrecadado, vlIR, vlComDesconto) {
    // Pega os campos que serão preenchidos
    var valorTotal       = document.querySelector("#resultado-total");
    var valorArrecadado  = document.querySelector("#total-arrecadado");
    var IR               = document.querySelector("#valor-ir");
    var valorComDesconto = document.querySelector("#valor-com-desconto");

    valorTotal.textContent       = "R$ " + vlTotal;
    valorArrecadado.textContent  = "R$ " + vlArrecadado;
    IR.textContent               = "R$ " + vlIR;
    valorComDesconto.textContent = "R$ " + vlComDesconto;
}

