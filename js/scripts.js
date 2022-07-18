const list = document.querySelectorAll('.list');
const parts = document.querySelectorAll('.part');
var title = document.title;



function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
    var link = this.querySelectorAll('a')[0].href;
    parts.forEach((part) => activePage(part, link, this));
}



function activePage(item, link, list) {
    item.classList.remove('active');
    var name = item.getAttribute('name');
    if (link.includes(name)) {
        item.classList.add('active');
        document.title = title + ' ' + name.toUpperCase();
    }

};

function loadPage() {
    var link = String(document.location);
    if (!link.includes('index')) {
        return;
    }
    var startIndex = link.lastIndexOf('#') + 1;
    if (startIndex === 0) {
        return;
    }
    var endIndex = link.length;
    var part = link.substring(startIndex, endIndex);
    list.forEach((item) => {
        item.classList.remove('active');
        var href = item.querySelectorAll('a')[0].href;
        if (href.includes(part)) {
            item.classList.add('active');
        }
        parts.forEach((item) => {
            item.classList.remove('active');
            var name = item.getAttribute('name')
            if (name === part) {
                item.classList.add('active');
                document.title = title + ' ' + name.toUpperCase();
            }
        });
    });
}

// window.onload = loadPage;
window.addEventListener('load', loadPage);

list.forEach((item) =>
    item.addEventListener('click', activeLink));



