window.addEventListener("load", function () {
  // Init
  // localStorage.clear();
  const jdl = document.querySelector("#judul");
  const pnl = document.querySelector("#penulis");
  const thn = document.querySelector("#tahun");
  const sts = document.querySelector("#status");
  const form = document.querySelector("#formData");
  const submit = document.querySelector("#btnSimpan");

  // Submit Data
  submit.addEventListener("click", function () {
    let data = [];
    let books = JSON.parse(localStorage.getItem("book"));
    let book = {
      id: +new Date(),
      title: jdl.value,
      author: pnl.value,
      year: thn.value,
      isComplete: sts.checked == true ? true : false,
    };

    if (books == null) {
      data.push(book);
      localStorage.setItem("book", JSON.stringify(data));
      form.reset();
    } else {
      books.push(book);
      localStorage.setItem("book", JSON.stringify(books));
      form.reset();
    }
    loadData();
  });
});

function loadData() {
  let books = JSON.parse(localStorage.getItem("book"));
}
