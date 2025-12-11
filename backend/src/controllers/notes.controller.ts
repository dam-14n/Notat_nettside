import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import {
  GetNoteInput,
  DeleteNoteInput,
  CreateNoteInput,
  UpdateNoteInput,
} from "../schema/notes.schema";
import {
  createNote,
  deleteNote,
  getAndUpdateNote,
  getNote,
  getAllNotes,
} from "../services/note.service";

export async function createNoteHandler(
  req: Request<{}, {}, CreateNoteInput["body"]>,
  res: Response,
) {
  const body = req.body;

  const note = await createNote({ ...body });

  return res.send(note);
}

export async function updateNoteHandler(
  req: Request<UpdateNoteInput["params"], {}, UpdateNoteInput["body"]>,
  res: Response,
) {
  const noteId = parseInt(req.params.noteId);
  const update = req.body;

  const note = await getNote({ id: noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  //   if (note.userId !== userId) {
  //     return res.sendStatus(403);
  //   }

  const updatedNote = await getAndUpdateNote({ id: noteId }, update);

  return res.send(updatedNote);
}

export async function getNoteHandler(
  req: Request<GetNoteInput["params"], {}>,
  res: Response,
) {
  const noteId = parseInt(req.params.noteId);
  const note = await getNote({ id: noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  return res.send(note);
}

export async function deleteNoteHandler(
  req: Request<DeleteNoteInput["params"], {}>,
  res: Response,
) {
  const noteId = parseInt(req.params.noteId);

  const note = await getNote({ id: noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  //   if (note.userId !== userId) {
  //     return res.sendStatus(403);
  //   }

  await deleteNote({ id: noteId });
  return res.sendStatus(200);
}

export async function getAllNotesHandler(req: Request, res: Response) {
  const userId = 0;
  const notes = await getAllNotes(userId);
  return res.send(notes);
}
