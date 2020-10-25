"use strict";
class Note {
    constructor(id, description) {
        this._id = id;
        this._description = description;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
}
let todoList = [];
let listFound = [];
function search() {
    console.log('search...');
    let inputValue = $('#id-search').val();
    if (inputValue != null && inputValue.length > 0 && inputValue.trim() != '') {
        console.log('search:', inputValue);
        let inputValues = inputValue.toLowerCase().split(' ');
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
    }
    else {
        showNotes(todoList);
    }
}
function addContent() {
    console.log('addContent...');
    let textAreaValue = $('#add-content').val();
    if (textAreaValue != null && textAreaValue.length > 0 && textAreaValue.trim() != '') {
        console.log('addContent has text');
        let newNote = new Note(uuidv4(), textAreaValue);
        todoList.push(newNote);
        showNotes(todoList);
        $('#add-content').val('');
        $('#id-search').val('');
    }
}
function deleteNote(id) {
    console.log('deleteNote...', id);
    todoList = todoList.filter(function (obj) {
        return obj.id !== id;
    });
    listFound = listFound.filter(function (obj) {
        return obj.id !== id;
    });
    showNotes(todoList);
}
function deleteNoteFromSearch(id) {
    console.log('deleteNote...', id);
    todoList = todoList.filter(function (obj) {
        return obj.id !== id;
    });
    listFound = listFound.filter(function (obj) {
        return obj.id !== id;
    });
    showNotesSearch(listFound);
}
function showNotes(list) {
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
function showNotesSearch(list) {
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
