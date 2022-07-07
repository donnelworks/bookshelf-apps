window.addEventListener("load", function () {
  // Init
  loadSelesai();
  loadBelumSelesai();
  // localStorage.clear();
  const jdl = document.querySelector("#judul");
  const pnl = document.querySelector("#penulis");
  const thn = document.querySelector("#tahun");
  const sts = document.querySelector("#status");
  const form = document.querySelector("#formData");
  const submit = document.querySelector("#btnSimpan");

  // Submit Data
  submit.addEventListener("click", function () {
    if (jdl.value != "" || pnl.value != "" || thn.value != "") {
      let data = [];
      let books = JSON.parse(localStorage.getItem("book"));
      let book = {
        id: +new Date(),
        title: jdl.value,
        author: pnl.value,
        year: parseInt(thn.value),
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

      if (sts.checked == true) {
        loadSelesai();
      } else {
        loadBelumSelesai();
      }
    } else {
      alert;
    }
  });
});

function loadBelumSelesai() {
  const shelf = document.querySelector("#belumSelesai");
  let books = JSON.parse(localStorage.getItem("book"));
  if (books != null) {
    let d = books.filter((o) => o.isComplete == false);
    let list = "";
    if (d.length != 0) {
      for (let i = 0; i < d.length; i++) {
        list += `<div class="row">
        <div class="col">
          <div class="card border book-list">
            <h3>${d[i].title}</h3>
            <p>Penulis: ${d[i].author}</p>
            <p>Tahun: ${d[i].year}</p>
            <button class="status" data-id="${d[i].id}">Selesai dibaca</button>
            <button class="delete-book" data-id="${d[i].id}">Hapus</button>
            <button class="edit-book" data-id="${d[i].id}">Ubah</button>
          </div>
        </div>
      </div>`;
      }
      shelf.innerHTML = list;
    } else {
      list = `<div class="row">
      <div class="col">
        <div class="card border-dashed book-list" style="text-align: center;">
          <p>Tidak ada buku</p>
        </div>
      </div>
    </div>`;
      shelf.innerHTML = list;
    }
  } else {
    list = `<div class="row">
      <div class="col">
        <div class="card border-dashed book-list" style="text-align: center;">
          <p>Tidak ada buku</p>
        </div>
      </div>
    </div>`;
    shelf.innerHTML = list;
  }
}

function loadSelesai() {
  const shelf = document.querySelector("#selesai");
  let books = JSON.parse(localStorage.getItem("book"));
  if (books != null) {
    let d = books.filter((o) => o.isComplete == true);
    let list = "";
    if (d.length != 0) {
      for (let i = 0; i < d.length; i++) {
        list += `<div class="row">
        <div class="col">
          <div class="card border book-list">
            <h3>${d[i].title}</h3>
            <p>Penulis: ${d[i].author}</p>
            <p>Tahun: ${d[i].year}</p>
            <button class="status" data-id="${d[i].id}">Selesai dibaca</button>
            <button class="delete-book" data-id="${d[i].id}">Hapus</button>
            <button class="edit-book" data-id="${d[i].id}">Ubah</button>
          </div>
        </div>
      </div>`;
      }
      shelf.innerHTML = list;
    } else {
      list = `<div class="row">
      <div class="col">
        <div class="card border-dashed book-list" style="text-align: center;">
          <p>Tidak ada buku</p>
        </div>
      </div>
    </div>`;
      shelf.innerHTML = list;
    }
  } else {
    list = `<div class="row">
      <div class="col">
        <div class="card border-dashed book-list" style="text-align: center;">
          <p>Tidak ada buku</p>
        </div>
      </div>
    </div>`;
    shelf.innerHTML = list;
  }
}
