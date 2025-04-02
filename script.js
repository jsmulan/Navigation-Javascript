const geoAPIKey = '67ed88668fc09777207759cxha84e04';

async function init() {
    document.querySelector('#navigation').innerHTML = 'Loading';
    const navigationJson = await (await fetch('./navigation.json')).json();

    document.querySelector('#navigation').innerHTML = renderCitiesNavigation(navigationJson.cities);
    document.querySelector('#navigation-content').innerHTML = renderCitiesContent(navigationJson.cities);

}

function renderCitiesNavigation(cities) {
    return cities.map(city => `<li id="${city.section}-link" class="navigation-links" onclick="animateNavigationTransition('${city.section}')">${city.label}</li>`).join('');
}

function renderCitiesContent(cities) {
    return cities.map(city => renderCityDetails(city)).join('');
}

function renderCityDetails(city) {
    return `
        <div id="${city.section}" class="hidden city-details">
            <h1>${city.label}</h1>
        </div>
    `;
}

async function navigationClick(city) {
    animateNavigationTransition(city);
}

function animateNavigationTransition(city) {
    document.querySelectorAll('.navigation-links').forEach(element => element.classList.remove('active'));
    document.querySelectorAll('.city-details').forEach(element => element.classList.add('hidden'));

    document.querySelector(`#${city}`).classList.remove('hidden');

    const cityLink = document.querySelector(`#${city}-link`);
    cityLink.classList.add('active');

    const underline = document.querySelector('#underline');

    const position = findPos(cityLink);

    if(underline.style.transition === '') {
        const navPosition = findPos(document.querySelector('#navigation'));
        underline.style.top = `${position.top}px`;
        underline.style.left = `${navPosition.left}px`;
        setTimeout(() => {
            underline.style.transition = 'all 1s';
        }, 100);
        setTimeout(() => {
            underline.style.left = `${position.left}px`;
            underline.style.width = `${position.width}px`;
        }, 150);
    } else {
        underline.style.left = `${position.left}px`;
        underline.style.width = `${position.width}px`;
    }
}

function findPos(element) {
    let curleft = 0;
    let curbottom = element.offsetHeight;
    const width = element.offsetWidth;
    if (element.offsetParent) {
        do {
            curleft += element.offsetLeft;
            curbottom += element.offsetTop;
        } while (element = element.offsetParent);
    return {left:curleft, width, top:curbottom};
    }
}

navigationData = init();