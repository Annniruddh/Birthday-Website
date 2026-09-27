document.addEventListener("DOMContentLoaded", () => {

    const photos =
        document.querySelectorAll(".memory-photo");

    const modal =
        document.getElementById("memoryModal");

    const closeButton =
        document.getElementById("memoryClose");

    const title =
        document.getElementById("memoryModalTitle");

    const text =
        document.getElementById("memoryModalText");


    if (!modal || !photos.length) {
        return;
    }


    photos.forEach(photo => {

        photo.addEventListener("click", () => {

            title.textContent =
                photo.dataset.title || "Memory";

            text.textContent =
                photo.dataset.text ||
                "One of those memories worth keeping.";

            modal.classList.add("show");

            document.body.classList.add("locked");

        });

    });


    function closeModal() {

        modal.classList.remove("show");

        document.body.classList.remove("locked");

    }


    closeButton.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal();
        }

    });

});