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
  const cari = document.querySelector("#btnCari");
  const modal = document.querySelector("#mdlEdit");

  const idEdit = document.querySelector("#idEdit");
  const shelfEdit = document.querySelector("#shelfEdit");
  const jdlEdit = document.querySelector("#judulEdit");
  const pnlEdit = document.querySelector("#penulisEdit");
  const thnEdit = document.querySelector("#tahunEdit");
  const formEdit = document.querySelector("#formEdit");
  const submitEdit = document.querySelector("#btnUbah");

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
      } else {
        books.push(book);
        localStorage.setItem("book", JSON.stringify(books));
      }

      if (sts.checked == true) {
        loadSelesai();
      } else {
        loadBelumSelesai();
      }

      form.reset();
    } else {
      alert("Form belum lengkap");
    }
  });

  // Ubah Status
  document.addEventListener("click", function (e) {
    if (e.target && e.target.className == "status") {
      let id = e.target.getAttribute("data-id");
      let shelf = e.target.getAttribute("data-shelf");
      let data = JSON.parse(localStorage.getItem("book"));

      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          if (shelf == 1) {
            data[i].isComplete = true;
          } else {
            data[i].isComplete = false;
          }
          break;
        }
      }
      localStorage.setItem("book", JSON.stringify(data));
      loadBelumSelesai();
      loadSelesai();
    }
  });

  // Ubah Data
  document.addEventListener("click", function (e) {
    if (e.target && e.target.className == "edit-book") {
      let id = e.target.getAttribute("data-id");
      let judul = e.target.getAttribute("data-judul");
      let penulis = e.target.getAttribute("data-penulis");
      let tahun = e.target.getAttribute("data-tahun");
      let shelf = e.target.getAttribute("data-shelf");

      let data = JSON.parse(localStorage.getItem("book"));

      modal.style.display = "block";
      idEdit.value = id;
      shelfEdit.value = shelf;
      jdlEdit.value = judul;
      pnlEdit.value = penulis;
      thnEdit.value = tahun;
    }
  });
  window.addEventListener("click", function (e) {
    if (e.target && e.target.className == "modal") {
      modal.style.display = "none";
    }
  });

  // Submit Ubah Data
  submitEdit.addEventListener("click", function () {
    if (jdlEdit.value != "" || pnlEdit.value != "" || thnEdit.value != "") {
      let data = JSON.parse(localStorage.getItem("book"));

      for (let i = 0; i < data.length; i++) {
        if (data[i].id == idEdit.value) {
          data[i].title = jdlEdit.value;
          data[i].author = pnlEdit.value;
          data[i].year = thnEdit.value;
          break;
        }
      }
      localStorage.setItem("book", JSON.stringify(data));
      if (shelfEdit.value == 1) {
        loadBelumSelesai();
      } else {
        loadSelesai();
      }

      formEdit.reset();
      modal.style.display = "none";
    } else {
      alert("Form belum lengkap");
    }
  });

  // Hapus Data
  document.addEventListener("click", function (e) {
    if (e.target && e.target.className == "delete-book") {
      let id = e.target.getAttribute("data-id");
      let shelf = e.target.getAttribute("data-shelf");
      let data = JSON.parse(localStorage.getItem("book"));
      if (confirm("Ingin hapus buku?") == true) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == id) {
            data.splice(i, 1);
            break;
          }
        }
        localStorage.setItem("book", JSON.stringify(data));
        if (shelf == 1) {
          loadBelumSelesai();
        } else {
          loadSelesai();
        }
      }
    }
  });

  // Cari Buku
  cari.addEventListener("click", function () {
    loadSelesai();
    loadBelumSelesai();
  });
});

// Function Belum Selesai
function loadBelumSelesai() {
  let key = document.querySelector("#cari");
  const shelf = document.querySelector("#belumSelesai");
  let books = JSON.parse(localStorage.getItem("book"));

  if (key.value != "") {
    books = books.filter((o) =>
      o.title.toLowerCase().includes(key.value.toString().toLowerCase())
    );
  } else {
    books = JSON.parse(localStorage.getItem("book"));
  }

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
            <button class="status" data-id="${d[i].id}" data-shelf="1">Selesai dibaca</button>
            <button class="delete-book" data-id="${d[i].id}" data-shelf="1">Hapus</button>
            <button class="edit-book" data-id="${d[i].id}" data-judul="${d[i].title}" data-penulis="${d[i].author}" data-tahun="${d[i].year}" data-shelf="1">Ubah</button>
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

// Function Selesai
function loadSelesai() {
  let key = document.querySelector("#cari");
  const shelf = document.querySelector("#selesai");
  let books = JSON.parse(localStorage.getItem("book"));

  if (key.value != "") {
    books = books.filter((o) =>
      o.title.toLowerCase().includes(key.value.toString().toLowerCase())
    );
  } else {
    books = JSON.parse(localStorage.getItem("book"));
  }

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
            <button class="status" data-id="${d[i].id}" data-shelf="2">Belum selesai dibaca</button>
            <button class="delete-book" data-id="${d[i].id}" data-shelf="2">Hapus</button>
            <button class="edit-book" data-id="${d[i].id}" data-judul="${d[i].title}" data-penulis="${d[i].author}" data-tahun="${d[i].year}" data-shelf="2">Ubah</button>
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
