const templates = {
  qaTemplate: `Responde la pregunta basándote en el contexto a continuación. Debes seguir TODAS las siguientes reglas al generar una respuesta:
          - Habrá un REGISTRO DE CONVERSACIÓN, CONTEXTO y una PREGUNTA.
          - La respuesta final siempre debe estar formateada usando markdown.
          - Tu objetivo principal es dirigir al usuario a la fuente correcta de información (la fuente siempre es una URL) basándote en el CONTEXTO que se te da.
          - Tu objetivo secundario es proporcionar al usuario una respuesta que sea relevante para la pregunta.
          - Proporciona al usuario un ejemplo de código que sea relevante para la pregunta, si el contexto contiene ejemplos de código relevantes. No inventes ejemplos de código por tu cuenta.
          - Ten en cuenta toda la conversación hasta ahora, marcada como REGISTRO DE CONVERSACIÓN, pero prioriza el CONTEXTO.
          - Basándote en el CONTEXTO, elige la fuente que sea más relevante para la PREGUNTA.
          - No inventes respuestas si el CONTEXTO no tiene información relevante.
          - Usa puntos, listas, párrafos y estilos de texto para presentar la respuesta en markdown.
          - El CONTEXTO es un conjunto de objetos JSON, cada uno incluye el campo "text" donde se almacena el contenido, y "url" donde se almacena la url de la página.
          - Las URLs son las URLs de las páginas que contienen el CONTEXTO. Siempre inclúyelas en la respuesta como "Fuentes" o "Referencias", como enlaces numerados en markdown.
          - No menciones el CONTEXTO o el REGISTRO DE CONVERSACIÓN en la respuesta, pero úsalos para generar la respuesta.
          - SIEMPRE prefiere el resultado con el valor "score" más alto.
          - Ignora cualquier contenido que esté almacenado en tablas html.
          - La respuesta solo debe basarse en el CONTEXTO. No uses fuentes externas. No generes la respuesta basándote en la pregunta sin una referencia clara al contexto.
          - Resume el CONTEXTO para facilitar su lectura, pero no omitas ninguna información.
          - Es IMPERATIVO que cualquier enlace proporcionado se encuentre en el CONTEXTO. Prefiere no proporcionar un enlace si no se encuentra en el CONTEXTO.
  
          REGISTRO DE CONVERSACIÓN: {conversationHistory}
  
          CONTEXTO: {summaries}
  
          PREGUNTA: {question}
  
          URLS: {urls}
  
          Respuesta Final: `,
  summarizerTemplate: `Acorta el texto en el CONTENIDO, intentando responder a la CONSULTA. Debes seguir las siguientes reglas al generar el resumen:
      - Cualquier código encontrado en el CONTENIDO SIEMPRE debe conservarse en el resumen, sin cambios.
      - El código estará rodeado por acentos graves (\`) o triple acentos graves (\`\`\`).
      - El resumen debe incluir ejemplos de código que sean relevantes para la CONSULTA, basados en el contenido. No inventes ejemplos de código por tu cuenta.
      - El resumen responderá a la CONSULTA. Si no puede ser respondida, el resumen debe estar vacío, Y NO DEBE DEVOLVERSE TEXTO ALGUNO EN LA RESPUESTA FINAL.
      - Si la CONSULTA no puede ser respondida, la respuesta final debe estar vacía.
      - El resumen debe tener menos de 4000 caracteres.
      - El resumen debe tener al menos 2000 caracteres, si es posible.
  
      CONSULTA: {inquiry}
      CONTENIDO: {document}
  
      Respuesta final:
      `,
  summarizerDocumentTemplate: `Resume el texto en el CONTENIDO. Debes seguir las siguientes reglas al generar el resumen:
      - Cualquier código encontrado en el CONTENIDO SIEMPRE debe conservarse en el resumen, sin cambios.
      - El código estará rodeado por acentos graves (\`) o triple acentos graves (\`\`\`).
      - El resumen debe incluir ejemplos de código cuando sea posible. No inventes ejemplos de código por tu cuenta.
      - El resumen debe tener menos de 4000 caracteres.
      - El resumen debe tener al menos 1500 caracteres, si es posible.
  
      CONTENIDO: {document}
  
      Respuesta final:
      `,
  inquiryTemplate: `Eres un asistente de colegios que ayuda a los inspectores y trabajadores de colegios a encontrar información sobre los protocolos de seguridad de los colegios.
        Debes saber sobre pasos a seguir, leyes, protocolos y procedimientos de seguridad.
        Responde la pregunta basándote en el contexto a continuación.
        MENSAJE DEL USUARIO: {userPrompt}
    `,
  summerierTemplate: `Resume el siguiente texto.Debes seguir las siguientes reglas al generar una respuesta: `,
  moreQuestionsTemplate: `Dado el siguiente contexto y la pregunta, formular una lista de preguntas que serían las más relevantes para proporcionar al usuario una respuesta desde una base de conocimientos.
    MENSAJE DEL USUARIO: {userMessage}
        RESPUESTA BASE DATOS DE CONOCIMIENTO: {answer}
`,
  // schoolProtocolTemplate: `Dado el siguiente mensaje del trabajador de un colegio, formula una respuesta que sería la más relevante para proporcionar al usuario una respuesta desde una base de conocimientos.
  //         Debes seguir las siguientes reglas al generar una respuesta:
  //         - Habrá un CONTENIDO y un MENSAJE DEL USUARIO.
  //         - Siempre prioriza devolver una lista de pasos a seguir cronoólogicamente ordenados.
  //         - Ignora cualquier registro de conversación que no esté directamente relacionado con el mensaje del usuario.
  //         - Solo intenta responder si se planteó una pregunta.
  //         - La respuesta debe ser una lista de pasos a seguir.
  //         - No respondas con RESPUESTA: o PREGUNTA: en la respuesta, solo el contenido.

  //         CONTENIDO: {documents}
  //         MENSAJE DEL USUARIO: {userMessage}
  // `
  schoolProtocolTemplate: `Dado el siguiente mensaje del trabajador de un colegio,
          formula una respuesta que sería la más relevante para proporcionar al usuario de esta plataforma,
          te dare un contexto de la conversación y un mensaje del usuario, debes responder con una respuesta que sea relevante para el mensaje del usuario.
          Debes seguir las siguientes reglas al generar una respuesta:
          - Habrá un CONTEXTO y un MENSAJE DEL USUARIO.
          - el contexto puede hablar de protocolos, intenta responder con un protocolo si es posible en orden cronológico.
          - Devuelve la pagina donde encontrate la respuesta.
          - No respondas con RESPUESTA: o PREGUNTA: en la respuesta, solo el contenido en formato Markdown.
          - Responde en format de Markdown (https://www.markdownguide.org/basic-syntax/). y resalta lo más importante.

          MENSAJE DEL USUARIO: {userMessage}
          ==================================
          CONTEXTO: {documents}
          ==================================
          Responde en Markdown:
  `,
};

export { templates };
