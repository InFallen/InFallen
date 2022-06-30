const list = document.querySelectorAll('.list');
const parts = document.querySelectorAll('.part');
var title = document.title;
function activeLink(){
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
    var link = this.querySelectorAll('a')[0].href;
    parts.forEach((part) => activePage(part, link, this));
    
}
list.forEach((item) =>
item.addEventListener('click', activeLink));

function activePage(item, link, list) {
        item.classList.remove('active');
        var name = item.getAttribute('name');
        if(link.includes(name)){
            item.classList.add('active');
            document.title = title + ' ' + name.toUpperCase();
        }
        
};