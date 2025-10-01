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

  function addBookToLibrary(title, author, pages, readState) {
    const newBook = new Book(title, author, pages, readState);
    myLibrary.push(newBook);
    return newBook;
  }

  addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
  addBookToLibrary('1984', 'George Orwell', 328, false);

  console.log(myLibrary);

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

    const newBook = addBookToLibrary(title, author, pages, readState);
    console.log('New book added:', newBook);
    console.log('Current library:', myLibrary);

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
});
