export interface ContactoData {
  nombre: string;
  email: string;
  pais: string;
  telefono: number; // Cambiado a solo number
  mensaje: string;
}

export interface ApiResponse {
  message: string;
  id: number;
}

export async function guardarContacto(data: ContactoData): Promise<ApiResponse> {
  // Si recibes el teléfono como string en el formulario, conviértelo antes de llamar a esta función
  const response = await fetch('http://localhost:3000/api/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al guardar contacto');
  }

  return response.json();
}