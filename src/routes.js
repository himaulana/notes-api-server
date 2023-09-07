import * as handler from './handler.js';

export default [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.add,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.all,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.detail,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.edit,
  },
  { method: 'DELETE', path: '/notes/{id}', handler: handler.remove },
];
