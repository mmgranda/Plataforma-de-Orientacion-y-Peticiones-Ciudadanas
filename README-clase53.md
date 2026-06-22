# Clase 53 - Revisión y cambio de estado

## Objetivo

Agregar al dashboard la capacidad de cambiar el estado de una petición y registrar observaciones de revisión.

## Tarjeta ClickUp

HU-10 - Cambiar estado de petición

## Archivos creados o modificados

- `src/services/peticiones.service.js`
- `src/routes/dashboard.routes.js`
- `public/dashboard.html`
- `public/js/dashboard.js`
- `docs/checklist-revision-revisor.md`

## Ruta creada

```txt
PATCH /api/dashboard/peticiones/:id/estado
