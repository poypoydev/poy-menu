let secili = 0;
let length = 0;
let currval = "";

window.addEventListener("message", (event) => {
  const data = event.data;

  if (event.data.type === "open") {
    $(".option-div").html("");
    currval = "";
    secili = 0;
    length = event.data.options.length;
    const options = event.data.options;
    if (length === 0) return;
    const title = options.title;
    $("#name").html(title);
    let text = "";
    const secenekler = options.options;
    secenekler.forEach((val, index) => {
      text =
        text +
        ` <div class="menu-option" data-value="${val.value}">
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
  console.log(e, length);
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
  } else if (e.keyCode == 8 || e.keyCode == 27) {
    $.post("https://poyMenu/close");
    $(".container").fadeOut();
  }
}

const setNewMenuItem = (itemnum) => {
  $(".menu-option").css("background-color", "#111825");
  $(".menu-option").css("color", "#6d6a7c");
  console.log(itemnum);
  const elements = document.getElementsByClassName("menu-option");
  length = elements.length;
  console.log(elements);
  let suan = elements[itemnum];
  console.log(suan);
  if (!suan) return;
  suan.style.backgroundColor = "#282f3b";
  suan.style.color = "white";
  currval = $(suan).data("value");
};
