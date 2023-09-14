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

  postNoteHandler = async (request, h) => {
    try {
      this.#validator.validateNotePayload(request.payload);

      const { title = 'untitled', body, tags } = request.payload;
      const noteId = await this.#service.addNote({ title, body, tags });

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

  getNotesHandler = async (request, h) => {
    const notes = await this.#service.getNotes();

    return h
      .response({
        status: 'success',
        data: {
          notes,
        },
      })
      .code(200);
  };

  getNoteByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;
      const note = await this.#service.getNotesById(id);

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

  putNoteByIdHandler = async (request, h) => {
    try {
      this.#validator.validateNotePayload(request.payload);

      const { id } = request.params;
      const { title = 'untitled', body, tags } = request.payload;
      await this.#service.editNoteById(id, { title, body, tags });

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

  deleteNoteByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;
      await this.#service.deleteNoteById(id);

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
