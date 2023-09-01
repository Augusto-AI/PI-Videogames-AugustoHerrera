export default function Validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Se requiere un nombre";
  }

  if (!input.description) {
    errors.description = "Se requiere una descripción.";
  }

  if (!input.released) {
    errors.released = "Se requiere una fecha de lanzamiento.";
  }

  if (!input.image) {
    errors.image = "Se requiere una imagen.";
  }

  if (input.rating < 1 || input.rating > 5) {
    errors.rating = "El valor debe estar entre 1 y 5.";
  }

  if (input.genres.length === 0) {
    errors.genres = "Se requiere seleccionar un género.";
  }

  if (input.platforms.length === 0) {
    errors.platforms = "Se requiere seleccionar al menos una plataforma.";
  }

  return errors;
}
