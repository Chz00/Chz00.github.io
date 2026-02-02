function toggleSection(sectionId) {

    var content = document.getElementById(sectionId);
    var arrow = document.getElementById(sectionId + "-arrow");
    

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        arrow.classList.add("rotate");

    } else {
        content.style.display = "none";
        arrow.classList.remove("rotate");
    }
}