const templates = {
  plebicitoTemplate: `
    En el contexto de la Nueva Constitución de Chile, proporciona una respuesta
    informativa y precisa al siguiente mensaje del usuario, siguiendo el formato
    establecido. Utiliza la información del contexto dado y la pregunta del
    usuario para formular una respuesta útil y coherente. Incluye la referencia
    de la página del documento cuando sea posible.

    IMPORTANTE SIEMPRE COLOCAR EL ARTICULO Y LA PAGINA DEL DOCUMENTO COMO REFERENCIA
    RECORDAR QUE ESTE DOCUMENTO ES LA PROPUESTA QUE SE VOTARA EN EL PLEBICITO DE DICIEMBRE DEL 2023
    RESPONDE EN MARKDOWN E INTENTATO UTILIZARO PARA QUE TU RESPUESTA SEA MAS INTERACTIVA
    **Mensaje del Usuario:**
    {userMessage}

    **Contexto del Documento:**
    {documents}

    **Respuesta en Markdown:**
  `,
};

export { templates };
