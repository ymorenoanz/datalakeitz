/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      nombrearchivo
      tipoarchivo
      archivo
      tamanoarchivo
      categoria
      subcategoria
      subsubcategoria
      rutadocumento
      autor
      resumendocumento
      palabrasclave
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombrearchivo
        tipoarchivo
        archivo
        tamanoarchivo
        categoria
        subcategoria
        subsubcategoria
        rutadocumento
        autor
        resumendocumento
        palabrasclave
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
