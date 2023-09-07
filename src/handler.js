import { nanoid } from 'nanoid';
import notes from './notes.js';

const add = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.find((item) => item.id === id);

  if (!isSuccess) {
    return h
      .response({
        status: 'failed',
        message: 'Catatan gagal ditambahkan',
      })
      .code(500)
      .header('Access-Control-Allow-Origin', '*');
  }

  return h
    .response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    })
    .code(201)
    .header('Access-Control-Allow-Origin', '*');
};

const all = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const detail = (request, h) => {
  const { id } = request.params;

  const note = notes.find((item) => item.id === id);

  if (note !== undefined) {
    return h
      .response({
        status: 'success',
        data: {
          note,
        },
      })
      .code(200);
  }

  return h
    .response({
      status: 'failed',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);
};

const edit = (request, h) => {
  const { id } = request.params;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      ...request.payload,
      updatedAt,
    };

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200);
  }

  return h
    .response({
      status: 'failed',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    })
    .code(404);
};

const remove = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return h
      .response({ status: 'success', message: 'Catatan berhasil dihapus' })
      .code(200);
  }

  return h
    .response({
      status: 'failed',
      message: 'Gagal menghapus catatan. Id tidak ditemukan',
    })
    .code(404);
};

export { add, all, detail, edit, remove };
