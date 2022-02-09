
const listItem = document.querySelectorAll(".list__item");


function openMenuMultiple(item) {
    item.parentElement.classList.toggle("list__item_active");
}

function openMenuSingle(item) {
    const isActive = item.parentElement.classList.contains("list__item_active");

    if (isActive) {
         listItem.forEach(i => i.classList.remove("list__item_active"));
    } else {
        listItem.forEach(i => i.classList.remove("list__item_active"));
        item.parentElement.classList.add("list__item_active");
    }
}

function openMenu() {
    listItem.forEach(i => {
        i.addEventListener("click", (e) => {
            const item = e.target;
            flag ? openMenuMultiple(item) : openMenuSingle(item);
        });
    });
}
