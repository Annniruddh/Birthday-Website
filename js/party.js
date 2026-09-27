document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("partyForm");

    const result =
        document.getElementById("partyResult");

    const resultText =
        document.getElementById("resultText");

    const againButton =
        document.getElementById("againButton");


    if (!form || !result) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            const date =
                formData.get("date");

            const food =
                formData.get("food");

            const payment =
                formData.get("payment");


            if (
                !date ||
                !food ||
                !payment
            ) {

                return;

            }


            resultText.textContent =
                `You selected ${date}, ` +
                `with ${food} on the menu, ` +
                `and ${payment} handling the bill. ` +
                `Excellent. This evidence has been archived.`;


            form.style.display =
                "none";


            result.classList.add("show");


            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );


    againButton.addEventListener(
        "click",
        () => {

            result.classList.remove(
                "show"
            );

            form.style.display =
                "";

            form.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});