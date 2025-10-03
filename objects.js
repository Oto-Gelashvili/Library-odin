document.addEventListener('DOMContentLoaded', () => {
  // ========== Library Logic ==========

  const myLibrary = [];

  function Book(title, author, pages, readState) {
    if (!new.target) {
      throw Error(
        "you must use 'new' operator when calling object constructor"
      );
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
  }

  // to manage  readState
  Book.prototype.toggleRead = function () {
    this.readState = !this.readState;
  };

  function addBookToLibrary(title, author, pages, readState) {
    const newBook = new Book(title, author, pages, readState);
    myLibrary.push(newBook);
    return newBook;
  }

  addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
  addBookToLibrary('1984', 'George Orwell', 328, false);

  // ========== FORM ==========

  const addBtn = document.querySelector('.addBtn');
  const closeBtn = document.querySelector('.closeBtn');
  const form = document.querySelector('form');
  const requiredInputs = form.querySelectorAll('input[required]');

  //show form
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    form.classList.add('active');
  });

  // close form
  document.addEventListener('click', (e) => {
    if (
      (!form.contains(e.target) && e.target !== addBtn) ||
      e.target === closeBtn
    ) {
      form.classList.remove('active');
    }
  });

  //form submission + error handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    requiredInputs.forEach((input) => {
      const error = input
        .closest('.form-group')
        ?.querySelector('.error-message');

      if (!input.value.trim()) {
        valid = false;
        if (error) error.style.display = 'block';
      } else {
        if (error) error.style.display = 'none';
      }
    });

    if (!valid) return;

    const title = form.querySelector('#title').value.trim();
    const author = form.querySelector('#author').value.trim();
    const pages = parseInt(form.querySelector('#pages').value.trim(), 10);
    const readState = form.querySelector('#readState').checked;

    addBookToLibrary(title, author, pages, readState);
    renderLibrary();

    form.reset();
    form.classList.remove('active');
  });

  //removing errors after input has been fixed
  requiredInputs.forEach((input) => {
    input.addEventListener('input', () => {
      const error = input
        .closest('.form-group')
        ?.querySelector('.error-message');
      if (input.value.trim() && error) {
        error.style.display = 'none';
      }
    });
  });

  // rendering library in grid container
  const gridCont = document.querySelector('.gridCont');

  renderLibrary(); // here  working on hosting knowledge, even though we are calling function before its defined below, fucntions are fully hoisted and variables that function uses are defined before calling of function ntherfore it works, but if we had gridcont defined below this line it wouldnt work anymore

  function renderLibrary() {
    gridCont.innerHTML = myLibrary
      .map(
        (book, index) => `
      <div class="bookCard"> 
       <div class="bookCardHeader">
          <div class="readStateCont">
              <label class="custom-checkbox">
                Read
                <input 
                  type="checkbox" 
                  id="readState-${index}" 
                  name="readState-${index}" 
                  ${book.readState ? 'checked' : ''} 
                  data-index="${index}"
                />
                <span class="checkmark"></span>
              </label>
          </div>
            <span class="material-symbols-outlined closeBtn"> close </span>
        </div>
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p class="bookPages">${book.pages} pages</p>
       
      </div>
    `
      )
      .join('');

    // change state of readStata
    gridCont.querySelectorAll('input[type="checkbox"]').forEach((box) => {
      box.addEventListener('change', (e) => {
        const i = e.target.dataset.index;
        myLibrary[i].toggleRead();
        renderLibrary();
        console.log(myLibrary);
      });
    });

    // Close button to remove book
    gridCont.querySelectorAll('.closeBtn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const i = e.target.dataset.index;
        myLibrary.splice(i, 1);
        renderLibrary();
      });
    });
  }
});
