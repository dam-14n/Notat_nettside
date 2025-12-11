import { Prisma } from "../generated/prisma/client";
import { prisma } from "../utils/connect";

export async function createNote(input: Prisma.NoteCreateInput) {
  try {
    const result = await prisma.note.create({ data: input });
    return result;
  } catch (e) {
    throw e;
  }
}

export async function getNote(filterQuery: Prisma.NoteWhereUniqueInput) {
  try {
    const result = await prisma.note.findUnique({ where: filterQuery });
    return result;
  } catch (e) {
    throw e;
  }
}

export async function getAndUpdateNote(
  filterQuery: Prisma.NoteWhereUniqueInput,
  data: any,
) {
  return prisma.note.update({ where: filterQuery, data });
}

export async function deleteNote(filterQuery: Prisma.NoteWhereUniqueInput) {
  return prisma.note.delete({ where: filterQuery });
}

export async function getAllNotes(userId: number) {
  try {
    const result = await prisma.note.findMany({ where: { userId } });
    return result;
  } catch (e) {
    throw e;
  }
}
