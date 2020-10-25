// import $ from "jquery";
class Note {

    _id: string;
    _description: string;
    constructor(id: string, description: string) {
        this._id = id;
        this._description = description;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }
}

let todoList: Note[] = [];
let listFound: Note[] = [];

//para hacer pruebas de búsqueda
// let note1: Note = new Note(uuidv4(), 'Permanece conectado a lo que más te importa gracias a una batería de larga duración y a un diseño ligero y fino con bisel con microborde. Pensado para mantener la productividad y estar entretenido en cualquier parte, el portátil HP 15S-FQ de 15,6" (39,6 cm) ofrece un rendimiento fiable y una amplia pantalla, que te permite retransmitir y navegar entre tareas con rapidez desde el alba hasta el ocaso.');
// let note2: Note = new Note(uuidv4(), 'Aprovecha al máximo tu tiempo de juego con el ratón G203 2nd Gen para gaming, con tecnología LIGHTSYNC, un sensor para gaming y un diseño clásico con 6 botones. Anima tu juego... y tu escritorio.');
// let note3: Note = new Note(uuidv4(), 'Auriculares inalámbricos Sony WH-1000XM3B con función Noise Cancelling digital que te permite escuchar sin distracciones, optimización personal de Noise Cancelling y optimización de la presión atmosférica, libertad inalámbrica con la tecnología Bluetooth y NFC, la escucha inteligente mediante control de sonido adaptativo ajusta el sonido ambiental a tu actividad, audio de alta calidad con DSEE HX, S-Master HX y LDAC, control táctil: cambia de pista, sube o baja el volumen y responde llamadas tocando o deslizando el dedo sobre el panel.');
// todoList.push(note1);
// todoList.push(note2);
// todoList.push(note3);


function search(): void {
    console.log('search...');
    let inputValue = $('#id-search').val() as string;
    if (inputValue != null && inputValue.length > 0 && inputValue.trim() != '') {
        console.log('search:', inputValue);
        let inputValues: string[] = inputValue.toLowerCase().split(' ');
        listFound = [];
        for (const itemTodo of todoList) {
            let added = false;
            for (let i = 0; i < inputValues.length && !added; i++) {
                if (itemTodo.description.toLowerCase().includes(inputValues[i])) {
                    added = true;
                    listFound.push(itemTodo);
                }
            }
        }
        showNotesSearch(listFound);
    }else{
        showNotes(todoList);
    }
}

function addContent(): void {
    console.log('addContent...');

    let textAreaValue = $('#add-content').val() as string;
    if (textAreaValue != null && textAreaValue.length > 0 && textAreaValue.trim() != '') {
        console.log('addContent has text');
        let newNote: Note = new Note(uuidv4(), textAreaValue);
        todoList.push(newNote);
        showNotes(todoList);
        $('#add-content').val('');
        $('#id-search').val('');
    }
}

function deleteNote(id: string): void {
    console.log('deleteNote...', id);
    todoList = todoList.filter(function (obj) {
        return obj.id !== id;
    });
    listFound = listFound.filter(function (obj) {
        return obj.id !== id;
    });
    // todoList.splice(id, 1);
    showNotes(todoList);
}

function deleteNoteFromSearch(id: string): void {
    console.log('deleteNote...', id);
    todoList = todoList.filter(function (obj) {
        return obj.id !== id;
    });
    listFound = listFound.filter(function (obj) {
        return obj.id !== id;
    });
    showNotesSearch(listFound);
}

function showNotes(list: Note[]): void {
    //     <div id="id-todo-content" class="todo-content">
    //     <div class="todo-content-box">
    //         <div class="todo-content-note">
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla amet esse vitae numquam assumenda
    //             sequi modi. Quam suscipit voluptatum modi repudiandae sed consequatur. Provident harum omnis est,
    //             distinctio eveniet reprehenderit.
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla amet esse vitae numquam assumenda
    //             sequi modi. Quam suscipit voluptatum modi repudiandae sed consequatur. Provident harum omnis est,
    //             distinctio eveniet reprehenderit.
    //         </div>
    //         <div class="todo-content-buttons">
    //             <i class="far fa-trash-alt" onclick="deleteNote('0')"></i>
    //         </div>
    //     </div>
    // </div>
    $('#id-todo-content').empty();
    let resultDiv = '';
    for (let i = 0; i < list.length; i++) {
        resultDiv += `<div id="${list[i].id}" class="todo-content-box">`;
        resultDiv += `<div class="todo-content-note">${list[i].description}</div>`;
        resultDiv += `<div class="todo-content-buttons"><i class="far fa-trash-alt" onclick="deleteNote('${list[i].id}')"></i></div>`;
        resultDiv += `</div>`;
    }

    $('#id-todo-content').append(resultDiv);
}

function showNotesSearch(list: Note[]): void {
    //     <div id="id-todo-content" class="todo-content">
    //     <div class="todo-content-box">
    //         <div class="todo-content-note">
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla amet esse vitae numquam assumenda
    //             sequi modi. Quam suscipit voluptatum modi repudiandae sed consequatur. Provident harum omnis est,
    //             distinctio eveniet reprehenderit.
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla amet esse vitae numquam assumenda
    //             sequi modi. Quam suscipit voluptatum modi repudiandae sed consequatur. Provident harum omnis est,
    //             distinctio eveniet reprehenderit.
    //         </div>
    //         <div class="todo-content-buttons">
    //             <i class="far fa-trash-alt" onclick="deleteNote('0')"></i>
    //         </div>
    //     </div>
    // </div>
    $('#id-todo-content').empty();
    let resultDiv = '';
    for (let i = 0; i < list.length; i++) {
        resultDiv += `<div id="${list[i].id}" class="todo-content-box">`;
        resultDiv += `<div class="todo-content-note">${list[i].description}</div>`;
        resultDiv += `<div class="todo-content-buttons"><i class="far fa-trash-alt" onclick="deleteNoteFromSearch('${list[i].id}')"></i></div>`;
        resultDiv += `</div>`;
    }

    $('#id-todo-content').append(resultDiv);
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//   console.log(uuidv4());
