"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Note {
    constructor(id, description) {
        this.__id = id;
        this._description = description;
    }
    get _id() {
        return this._id;
    }
    set _id(id) {
        this.__id = id;
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
loadToDoListFromDB();
function loadToDoListFromDB() {
    fetchNotesJSON().then((res) => {
        console.log('fetchNotesJSON');
        console.log(res);
        todoList = res;
        showNotes(todoList);
    });
}
function search() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('search...');
        let inputValue = $('#id-search').val();
        if (inputValue != null && inputValue.length > 0 && inputValue.trim() != '') {
            console.log('search:', inputValue);
            yield fetchNotesSearchJSON(inputValue).then((res) => {
                listFound = res;
            });
            showNotesSearch(listFound);
        }
        else {
            showNotes(todoList);
        }
    });
}
function addContent() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('addContent...');
        let textAreaValue = $('#add-content').val();
        if (textAreaValue != null && textAreaValue.length > 0 && textAreaValue.trim() != '') {
            console.log('addContent has text');
            let newNote = new Note(uuidv4(), textAreaValue);
            yield fetchNotesCreateNote(newNote);
            yield loadToDoListFromDB();
            showNotes(todoList);
            $('#add-content').val('');
            $('#id-search').val('');
        }
    });
}
function deleteNote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('deleteNote...', id);
        yield fetchNotesDeleteNote(id);
        console.log('fetchNotesDeleteNote_end');
        todoList = todoList.filter(function (obj) {
            return obj._id != id;
        });
        listFound = listFound.filter(function (obj) {
            return obj._id != id;
        });
        yield loadToDoListFromDB();
        showNotes(todoList);
    });
}
function deleteNoteFromSearch(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('deleteNote...', id);
        yield fetchNotesDeleteNote(id);
        console.log('fetchNotesDeleteNote_end');
        todoList = todoList.filter(function (obj) {
            return obj._id != id;
        });
        listFound = listFound.filter(function (obj) {
            return obj._id != id;
        });
        console.log('listFound', listFound);
        showNotesSearch(listFound);
    });
}
function showNotes(list) {
    $('#id-todo-content').empty();
    let resultDiv = '';
    for (let i = 0; i < list.length; i++) {
        resultDiv += `<div id="${list[i]._id}" class="todo-content-box">`;
        resultDiv += `<div class="todo-content-note">${list[i].description}</div>`;
        resultDiv += `<div class="todo-content-buttons"><i class="far fa-trash-alt" onclick="deleteNote('${list[i]._id}')"></i></div>`;
        resultDiv += `</div>`;
    }
    $('#id-todo-content').append(resultDiv);
}
function showNotesSearch(list) {
    $('#id-todo-content').empty();
    let resultDiv = '';
    for (let i = 0; i < list.length; i++) {
        resultDiv += `<div id="${list[i]._id}" class="todo-content-box">`;
        resultDiv += `<div class="todo-content-note">${list[i].description}</div>`;
        resultDiv += `<div class="todo-content-buttons"><i class="far fa-trash-alt" onclick="deleteNoteFromSearch('${list[i]._id}')"></i></div>`;
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
function fetchNotesJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/notes/`, {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        });
        const notes = yield response.json();
        return notes;
    });
}
function fetchNotesSearchJSON(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/notes/${query}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        });
        const notes = yield response.json();
        return notes;
    });
}
function fetchNotesCreateNote(note) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawResponse = yield fetch(`http://localhost:3000/notes/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: note.description })
        });
        const content = yield rawResponse.json();
        console.log(content);
    });
}
function fetchNotesDeleteNote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawResponse = yield fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    });
}
