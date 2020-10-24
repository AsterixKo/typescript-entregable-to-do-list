// import $ from "jquery";

let todoList: Note[] = [];

function search(): void {
    console.log('search...');
}

function addContent(): void {
    console.log('addContent...');

    let textAreaValue = $('#add-content').val() as string;
    if (textAreaValue != null && textAreaValue.length > 0 && textAreaValue.trim() != '') {
        console.log('addContent has text');
        let newNote: Note = new Note(textAreaValue);
        todoList.push(newNote);
        showNotes();
        $('#add-content').val('');
    }
}

function deleteNote(id: number): void {
    console.log('deleteNote...', id);
    todoList.splice(id, 1);
    showNotes();
}

function showNotes(): void {
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
    for (let i = 0; i < todoList.length; i++) {
        resultDiv += `<div id="id-todo-content-box-${i}" class="todo-content-box">`;
        resultDiv += `<div class="todo-content-note">${todoList[i].description}</div>`;
        resultDiv += `<div class="todo-content-buttons"><i class="far fa-trash-alt" onclick="deleteNote('${i}')"></i></div>`;
        resultDiv += `</div>`;
    }

    $('#id-todo-content').append(resultDiv);
}

class Note {

    _description: string;
    constructor(description: string) {
        this._description = description;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }
}