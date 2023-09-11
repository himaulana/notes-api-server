export default class NotesHandler {
  #service;

  constructor(service) {
    this.#service = service;
  }

  postNoteHandler = (request, h) => {
    try {
      const noteId = this.#service.addNote(request.payload);

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId,
          },
        })
        .code(201);
    } catch (error) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(400);
    }
  };

  getNotesHandler = (request, h) => {
    const notes = this.#service.getNotes();

    return h
      .response({
        status: 'success',
        data: {
          notes,
        },
      })
      .code(200);
  };

  getNoteByIdHandler = (request, h) => {
    try {
      const { id } = request.params;
      const note = this.#service.getNote(id);

      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(404);
    }
  };

  putNoteByIdHandler = (request, h) => {
    try {
      const { id } = request.params;
      this.#service.editNote(id, request.payload);

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        })
        .code(200);
    } catch (error) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(404);
    }
  };

  deleteNoteByIdHandler = (request, h) => {
    try {
      const { id } = request.params;
      this.#service.deleteNote(id);

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        })
        .code(200);
    } catch (error) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(404);
    }
  };
}
