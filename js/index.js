"use strict";
let todoList = [];
function search() {
    console.log('search...');
}
function addContent() {
    console.log('addContent...');
    let textAreaValue = $('#add-content').val();
    if (textAreaValue != null && textAreaValue.length > 0 && textAreaValue.trim() != '') {
        console.log('addContent has text');
        let newNote = new Note(textAreaValue);
        todoList.push(newNote);
        showNotes();
        $('#add-content').val('');
    }
}
function deleteNote(id) {
    console.log('deleteNote...', id);
    todoList.splice(id, 1);
    showNotes();
}
function showNotes() {
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
    constructor(description) {
        this._description = description;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
}
