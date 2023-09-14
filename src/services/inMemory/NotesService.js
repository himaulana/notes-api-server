import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

export default class NotesService {
  #notes;

  constructor() {
    this.#notes = [];
  }

  addNote(data) {
    const id = nanoid(16);
    const date = new Date().toISOString();

    const newNote = {
      id,
      ...data,
      createdAt: date,
      updatedAt: date,
    };

    this.#notes.push(newNote);

    const isSuccess = this.#notes.find((note) => note.id === id);

    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this.#notes;
  }

  getNote(id) {
    const note = this.#notes.find((n) => n.id === id);

    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return note;
  }

  editNote(id, data) {
    const index = this.#notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan, Id tidak ditemukan');
    }

    this.#notes[index] = {
      ...this.#notes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
  }

  deleteNote(id) {
    const index = this.#notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }

    this.#notes.splice(index, 1);
  }
}
