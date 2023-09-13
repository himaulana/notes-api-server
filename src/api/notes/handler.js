import ClientError from '../../exceptions/ClientError.js';

export default class NotesHandler {
  #service;

  #validator;

  constructor(service, validator) {
    this.#service = service;
    this.#validator = validator;
  }

  #returnResponse = (h, error) => {
    if (error instanceof ClientError) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(error.statusCode);
    }

    console.log(error);

    return h
      .response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      })
      .code(500);
  };

  postNoteHandler = (request, h) => {
    try {
      this.#validator.validateNotePayload(request.payload);
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
      return this.#returnResponse(h, error);
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
      return this.#returnResponse(h, error);
    }
  };

  putNoteByIdHandler = (request, h) => {
    try {
      this.#validator.validateNotePayload(request.payload);
      const { id } = request.params;
      this.#service.editNote(id, request.payload);

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        })
        .code(200);
    } catch (error) {
      return this.#returnResponse(h, error);
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
      return this.#returnResponse(h, error);
    }
  };
}
