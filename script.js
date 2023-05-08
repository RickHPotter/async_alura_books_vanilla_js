// Something that could become a potential CallBack Hell
/* 
const consultCEP = fetch(config)
.then((response) => response.json())
.then((r) => {
  if (r.erro) {
    throw Error('Invalid CEP!');
  } else {
    console.log(r);
  }
})
.catch((e) => console.error(e))
.finally((_) => console.log('Finished!'));
*/

const form = document.querySelector("#formulario");

const errorCep = document.querySelector('#erro')
const cep = form.querySelector("#cep");
const endereco = form.querySelector("#endereco");
const numero = form.querySelector("#numero");
const complemento = form.querySelector("#complemento");
const bairro = form.querySelector("#bairro");
const cidade = form.querySelector("#cidade");
const uf = form.querySelector("#estado");

cep.addEventListener("focusout", () => {
  if (cep.value.trim().length == 8) {
    updateFromCEP(cep.value);
  } else {
    errorCep.innerHTML = `<p>CEP tem que ter 8 dígitos.</p>`
  }
});

async function updateFromCEP(cep) {
  const response = await buscaEndereco(cep)
  if (response instanceof Error) {
    errorCep.innerHTML = `<p>${response.message}</p>`
  } else {
    endereco.value = response.logradouro
    complemento.value = response.complemento
    bairro.value = response.bairro
    cidade.value = response.localidade
    uf.value = response.uf
  }
}

async function buscaEndereco(cep) {
  const config = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const response = await (await fetch(config)).json();
    // error handling
    if (response.erro) {
      throw Error(`CEP Inválido!`);
    }
    return response;
  } catch (error) {
    return error;
  }
}

// in case many promises are to be done, you could use Promise.all
/*
let ceps = ['01001000', '74705250', '68585250']
ceps = cep.map((e) => buscaEndereco(e))
Promise.all(ceps).then(responses => console.log(responses))
*/

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// async function buscaEndereco(cep) {
//     var mensagemErro = document.getElementById('erro');
//     mensagemErro.innerHTML = "";
//     try {
//         var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//         var consultaCEPConvertida = await consultaCEP.json();
//         if (consultaCEPConvertida.erro) {
//             throw Error('CEP não existente!');
//         }
//         var cidade = document.getElementById('cidade');
//         var logradouro = document.getElementById('endereco');
//         var estado = document.getElementById('estado');

//         cidade.value = consultaCEPConvertida.localidade;
//         logradouro.value = consultaCEPConvertida.logradouro;
//         estado.value = consultaCEPConvertida.uf;

//         console.log(consultaCEPConvertida);
//         return consultaCEPConvertida;
//     } catch (erro) {
//         mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
//         console.log(erro);
//     }
// }

// var cep = document.getElementById('cep');
// cep.addEventListener("focusout", () => buscaEndereco(cep.value));
