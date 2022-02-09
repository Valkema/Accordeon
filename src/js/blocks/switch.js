const switchElem = document.getElementById("switch");
const switchLabel = document.querySelector(".switch__title");

let flag = true;

function switchMode() {
    switchElem.addEventListener("change", () => {
        flag = !flag;

        switchLabel.textContent = flag ? "Change interface type to seen single item" : "Change interface type to seen multiple items";
    });
}
