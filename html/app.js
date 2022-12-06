let secili = 0;
let length = 0;
let currval = "";

window.addEventListener("message", (event) => {
  const data = event.data;

  if (event.data.type === "open") {
    $(".option-div").html("");
    currval = "";
    secili = 0;

    length = event.data.info.options.length;
    const options = event.data.info.options;
    if (length === 0) return;
    const title = event.data.info.title;
    $("#name").html(title);
    let text = "";
    const secenekler = event.data.info.options;
    secenekler.forEach((val, index) => {
      text =
        text +
        ` <div class="menu-option" data-value="${val.value}">
        ${val.icon ? `<i class="${val.icon}"></i>` : ""}
        <span>${val.title}</span>
      </div>`;
    });
    $(".option-div").append(text);
    setNewMenuItem(0);
    $(".container").fadeIn();
  }
});

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "38") {
    const max = length - 1;
    if (secili === 0) {
      secili = max;
      setNewMenuItem(max);
    } else {
      secili = secili - 1;
      setNewMenuItem(secili);
    }
    // up arrow
  } else if (e.keyCode == "40") {
    // down arrow
    const max = length - 1;
    if (secili === max) {
      secili = 0;
      setNewMenuItem(0);
    } else {
      secili = secili + 1;
      setNewMenuItem(secili);
    }
  } else if (e.keyCode == 13) {
    $.post("https://poyMenu/enter", JSON.stringify({ value: currval }));
    $(".container").fadeOut();
  } else if (e.keyCode == 8 || e.keyCode == 27) {
    $.post("https://poyMenu/close");
    $(".container").fadeOut();
  }
}

const setNewMenuItem = (itemnum) => {
  $(".menu-option").css("background-color", "#111825");
  $(".menu-option").css("color", "#6d6a7c");

  const elements = document.getElementsByClassName("menu-option");
  length = elements.length;

  let suan = elements[itemnum];

  if (!suan) return;
  suan.style.backgroundColor = "#282f3b";
  suan.style.color = "white";
  currval = $(suan).data("value");
};
