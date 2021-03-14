const MAX_LENGTH = 140;

window.addEventListener('load', () => {
    /** @type {HTMLInputElement} */
    const todoInput = document.querySelector('#todoInput');
    const todosUl = document.querySelector('#todosUl');

    todosUl.innerHTML = window.localStorage.getItem('todos');

    for (const button of todosUl.querySelectorAll('button')) {
        button.addEventListener('click', handleButtonClick);
    }

    function handleButtonClick(/** @type {Event} */ event) {
        if (!window.confirm('Are you sure?')) {
            return;
        }

        /** @type {HTMLButtonElement} */
        const button = event.currentTarget;
        button.parentElement.remove();
        save();
    }

    function save() {
        window.localStorage.setItem('todos', todosUl.innerHTML);
    }

    todoInput.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' || todoInput.value === '') {
            return;
        }

        if (todoInput.value.length > MAX_LENGTH) {
            alert(`Must be less than ${MAX_LENGTH} chars, have ${todoInput.value.length}`);
            return;
        }

        const li = document.createElement('li');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = Math.random();

        li.append(input);

        const label = document.createElement('label');
        label.textContent = todoInput.value;
        label.htmlFor = input.id;

        li.append(label);

        const button = document.createElement('button');
        button.textContent = '×';
        button.addEventListener('click', handleButtonClick);

        li.append(button);

        todosUl.append(li);
        save();

        todoInput.value = '';
    });
});

