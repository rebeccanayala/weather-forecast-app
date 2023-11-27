document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '20345eec75350cb0d4cfc2c57a77d2a9';

    function obterLocalizacao() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    function obterDadosMeteorologicos(latitude, longitude) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=pt`;

        return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => console.error('Erro na requisição:', error));
    }

    function exibirDadosMeteorologicos(dados) {
        const cidadeElemento = document.getElementById('cidade');
        const temperaturaElemento = document.getElementById('temperatura');
        const condicaoElemento = document.getElementById('condicao');
        const ultimaAtualizacaoElemento = document.getElementById('ultima-atualizacao');

        cidadeElemento.textContent = `Cidade: ${dados.name}`;

        const temperaturaCelsius = Math.round(dados.main.temp - 273.15);

        const condicao = dados.weather[0].description;
        const condicaoComPrimeiraLetraMaiuscula = condicao.charAt(0).toUpperCase() + condicao.slice(1);

        temperaturaElemento.textContent = `Temperatura: ${temperaturaCelsius}°C`;
        condicaoElemento.textContent = `Condição: ${condicaoComPrimeiraLetraMaiuscula}`;

        const ultimaAtualizacao = new Date();
        const options = { month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        ultimaAtualizacaoElemento.textContent = `Atualizado: ${ultimaAtualizacao.toLocaleDateString('pt-BR', options)}`;
    }

    obterLocalizacao() 
    .then(posicao => obterDadosMeteorologicos(posicao.coords.latitude, posicao.coords.longitude))
    .then(dados => exibirDadosMeteorologicos(dados))
    .catch(error => console.error('Erro', error))
});
