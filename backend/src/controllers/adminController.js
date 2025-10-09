// Controlador para funciones administrativas

export const getDashboardStats = (req, res) => {
  try {
    // Estadísticas simuladas
    const stats = {
      totalEncuestas: 15,
      encuestasActivas: 8,
      totalRespuestas: 147,
      usuariosRegistrados: 32,
      respuestasHoy: 12,
      respuestasEsteMes: 89,
      promedioRespuestasPorEncuesta: 9.8,
      tasaCompletado: 0.78
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas del dashboard',
      error: error.message
    });
  }
};

export const getAllUsers = (req, res) => {
  try {
    // Datos simulados de usuarios
    const users = [
      {
        id: 1,
        username: "admin",
        email: "admin@encuestas.com",
        role: "admin",
        fechaCreacion: "2024-01-15T10:00:00Z",
        ultimoAcceso: "2024-10-08T08:30:00Z",
        activo: true
      },
      {
        id: 2,
        username: "usuario1",
        email: "usuario1@example.com",
        role: "user",
        fechaCreacion: "2024-02-20T14:22:00Z",
        ultimoAcceso: "2024-10-07T16:45:00Z",
        activo: true
      },
      {
        id: 3,
        username: "usuario2",
        email: "usuario2@example.com",
        role: "user",
        fechaCreacion: "2024-03-10T09:15:00Z",
        ultimoAcceso: "2024-10-05T12:20:00Z",
        activo: false
      }
    ];

    res.json({
      success: true,
      data: users,
      total: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la lista de usuarios',
      error: error.message
    });
  }
};

export const exportData = (req, res) => {
  try {
    const { format } = req.params;
    
    // Datos simulados para exportar
    const encuestasData = [
      {
        id: 1,
        titulo: "Encuesta de Satisfacción",
        respuestas: 25,
        fechaCreacion: "2024-09-15",
        estado: "activa"
      },
      {
        id: 2,
        titulo: "Evaluación de Servicios",
        respuestas: 18,
        fechaCreacion: "2024-09-20",
        estado: "cerrada"
      }
    ];

    const respuestasData = [
      {
        encuestaId: 1,
        respuesta: "Muy satisfecho",
        fecha: "2024-10-01",
        usuario: "anónimo"
      },
      {
        encuestaId: 1,
        respuesta: "Satisfecho",
        fecha: "2024-10-02",
        usuario: "anónimo"
      }
    ];

    let exportedData;
    let contentType;
    let filename;

    switch (format.toLowerCase()) {
      case 'csv':
        // Simular CSV
        exportedData = "ID,Titulo,Respuestas,Fecha,Estado\n" +
          encuestasData.map(e => `${e.id},"${e.titulo}",${e.respuestas},${e.fechaCreacion},${e.estado}`).join('\n');
        contentType = 'text/csv';
        filename = 'encuestas_export.csv';
        break;
        
      case 'json':
        exportedData = JSON.stringify({
          encuestas: encuestasData,
          respuestas: respuestasData,
          fechaExportacion: new Date().toISOString()
        }, null, 2);
        contentType = 'application/json';
        filename = 'encuestas_export.json';
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Formato no soportado. Use csv o json'
        });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    res.send(exportedData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al exportar datos',
      error: error.message
    });
  }
};