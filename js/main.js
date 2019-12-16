//Make sure sw are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw_cached_site.js')
            .then(reg => console.log('sw registered'))
            .catch(err => console.log(`sw error: ${err}`))
    });
}