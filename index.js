let card_collapse = document.getElementsByClassName("card")

for (let i = 0; i < card_collapse.length; i++) {
    card_collapse[i].addEventListener("click", function() {
        if (card_collapse[i].className.match("card-toggled")) {
            document.getElementById("featured").classList.remove("works-after")
        }
        else {
            document.getElementById("featured").classList.add("works-after")
        }
        card_collapse[i].classList.toggle("card-toggled")
        for (let j = 0; j < card_collapse.length; j++) {
            if (card_collapse[j] == card_collapse[i]) continue
            card_collapse[j].classList.remove("card-toggled")
        }
    })
}