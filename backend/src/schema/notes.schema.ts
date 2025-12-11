import { object, number, string, output } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Note:
 *       type: object
 *       required:
 *        - title
 *        - description
 *       properties:
 *         title:
 *           type: string
 *           default: ""
 *         description:
 *           type: string
 *           default: ""
 *     noteResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: number
 *
 */

const payload = {
  body: object({
    title: string({
      error: (iss) =>
        iss.input === undefined ? "Title is required." : "Invalid input.",
    }),

    body: string({
      error: (iss) =>
        iss.input === undefined ? "Description is required." : "Invalid input.",
    }),
  }),
};

const params = {
  params: object({
    noteId: string({
      error: (iss) =>
        iss.input === undefined ? "Note ID is required." : "Invalid input.",
    }).regex(/^\d+$/, "Note ID must be a valid number"),
  }),
};

export const createNoteSchema = object({
  ...payload,
});

export const updateNoteSchema = object({
  ...payload,
  ...params,
});

export const deleteNoteSchema = object({
  ...params,
});

export const getNoteSchema = object({
  ...params,
});

export type CreateNoteInput = output<typeof createNoteSchema>;
export type UpdateNoteInput = output<typeof updateNoteSchema>;
export type GetNoteInput = output<typeof getNoteSchema>;
export type DeleteNoteInput = output<typeof deleteNoteSchema>;
