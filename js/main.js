//Make sure sw are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        //Need change to ../sw_cached_site.js for local
        //Need change to ../davidzhang.github.io/sw_cached_site.js for github page https://mydavidzhang.github.io/davidzhang.github.io/.
        navigator.serviceWorker.register('../davidzhang.github.io/sw_cached_site.js')
            .then(reg => console.log('sw registered'))
            .catch(err => console.log(`sw error: ${err}`))
    });
}