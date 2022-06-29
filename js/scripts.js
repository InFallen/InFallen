const list = document.querySelectorAll('.list');
const parts = document.querySelectorAll('.part');
function activeLink(){
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
    var link = this.querySelectorAll('a')[0].href;
    
    parts.forEach((part) => activePage(part, link));
}
list.forEach((item) =>
item.addEventListener('click', activeLink));

function activePage(item, link) {
        item.classList.remove('active');
        var name = item.getAttribute('name');
        console.log(link);
        if(link.includes(name)){
            item.classList.add('active');
        }
};