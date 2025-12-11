import { Express, Request, Response } from "express";
import validate from "./middleware/validateRequest";
import {
  getNoteSchema,
  createNoteSchema,
  updateNoteSchema,
  deleteNoteSchema,
} from "./schema/notes.schema";
import {
  createNoteHandler,
  deleteNoteHandler,
  getNoteHandler,
  updateNoteHandler,
  getAllNotesHandler,
} from "./controllers/notes.controller";
import bodyParser, { json } from "body-parser";

let jsonParser = bodyParser.json();

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get("/api/notes", getAllNotesHandler);
  app.get("/api/notes/:noteId", validate(getNoteSchema), getNoteHandler);
  app.post(
    "/api/notes",
    [jsonParser, validate(createNoteSchema)],
    createNoteHandler,
  );
  app.put(
    "/api/notes/:noteId",
    [jsonParser, validate(updateNoteSchema)],
    updateNoteHandler,
  );
  app.delete(
    "/api/notes/:noteId",
    validate(deleteNoteSchema),
    deleteNoteHandler,
  );
}

export default routes;
