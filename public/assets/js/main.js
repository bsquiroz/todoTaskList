const $NAVLINK = document.querySelectorAll(".nav-link");

function colorLink() {
    $NAVLINK.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
    console.log("hola que mas");
}

$NAVLINK.forEach((l) => l.addEventListener("click", colorLink));
