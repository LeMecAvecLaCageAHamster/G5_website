const members = document.querySelectorAll(".member");
const contents = document.querySelectorAll(".content");
// const others = document.querySelector(".others");
const organisation = document.querySelector(".organisation");
const synthese = document.querySelector(".synthese");

members.forEach(member => {
    member.addEventListener("mouseenter", function() {
        var id = this.id
        var element = document.getElementsByClassName(`${id}`);
        organisation.classList.add('not-visible');
        synthese.classList.add('not-visible');
        element[0].classList.add('is-visible');
    });
});
members.forEach(member => {
    member.addEventListener("mouseleave", function() {
        var id = this.id
        var element = document.getElementsByClassName(`${id}`);
        organisation.classList.remove('not-visible');
        synthese.classList.remove('not-visible');
        element[0].classList.remove('is-visible');
    });
});