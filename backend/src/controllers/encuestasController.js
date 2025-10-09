// Controlador para gestión de encuestas

// Datos de ejemplo (temporales)
let encuestas = [
  {
    id: 1,
    titulo: "Encuesta de Satisfacción",
    descripcion: "Evalúa tu experiencia con nuestros servicios",
    preguntas: [
      {
        id: 1,
        texto: "¿Cómo calificarías nuestro servicio?",
        tipo: "escala",
        opciones: ["1", "2", "3", "4", "5"]
      },
      {
        id: 2,
        texto: "¿Recomendarías nuestros servicios?",
        tipo: "boolean",
        opciones: ["Sí", "No"]
      }
    ],
    activa: true,
    fechaCreacion: new Date().toISOString()
  }
];

let respuestas = [];

export const getAllEncuestas = (req, res) => {
  try {
    const encuestasActivas = encuestas.filter(encuesta => encuesta.activa);
    res.json({
      success: true,
      data: encuestasActivas,
      total: encuestasActivas.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las encuestas',
      error: error.message
    });
  }
};

export const getEncuestaById = (req, res) => {
  try {
    const { id } = req.params;
    const encuesta = encuestas.find(e => e.id === parseInt(id));
    
    if (!encuesta) {
      return res.status(404).json({
        success: false,
        message: 'Encuesta no encontrada'
      });
    }

    res.json({
      success: true,
      data: encuesta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la encuesta',
      error: error.message
    });
  }
};

export const createEncuesta = (req, res) => {
  try {
    const { titulo, descripcion, preguntas } = req.body;
    
    const nuevaEncuesta = {
      id: encuestas.length + 1,
      titulo,
      descripcion,
      preguntas,
      activa: true,
      fechaCreacion: new Date().toISOString()
    };

    encuestas.push(nuevaEncuesta);

    res.status(201).json({
      success: true,
      message: 'Encuesta creada exitosamente',
      data: nuevaEncuesta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la encuesta',
      error: error.message
    });
  }
};

export const updateEncuesta = (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, preguntas, activa } = req.body;
    
    const encuestaIndex = encuestas.findIndex(e => e.id === parseInt(id));
    
    if (encuestaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Encuesta no encontrada'
      });
    }

    encuestas[encuestaIndex] = {
      ...encuestas[encuestaIndex],
      titulo,
      descripcion,
      preguntas,
      activa,
      fechaModificacion: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Encuesta actualizada exitosamente',
      data: encuestas[encuestaIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la encuesta',
      error: error.message
    });
  }
};

export const deleteEncuesta = (req, res) => {
  try {
    const { id } = req.params;
    const encuestaIndex = encuestas.findIndex(e => e.id === parseInt(id));
    
    if (encuestaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Encuesta no encontrada'
      });
    }

    encuestas.splice(encuestaIndex, 1);

    res.json({
      success: true,
      message: 'Encuesta eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la encuesta',
      error: error.message
    });
  }
};

export const submitRespuesta = (req, res) => {
  try {
    const { id } = req.params;
    const { respuestas: respuestasUsuario } = req.body;
    
    const encuesta = encuestas.find(e => e.id === parseInt(id));
    
    if (!encuesta) {
      return res.status(404).json({
        success: false,
        message: 'Encuesta no encontrada'
      });
    }

    const nuevaRespuesta = {
      id: respuestas.length + 1,
      encuestaId: parseInt(id),
      respuestas: respuestasUsuario,
      fechaRespuesta: new Date().toISOString(),
      ip: req.ip
    };

    respuestas.push(nuevaRespuesta);

    res.status(201).json({
      success: true,
      message: 'Respuesta enviada exitosamente',
      data: nuevaRespuesta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al enviar la respuesta',
      error: error.message
    });
  }
};