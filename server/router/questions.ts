

import * as trpc from '@trpc/server'
import { prisma } from '../db/client';
import { z } from 'zod';

export const questionRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.pollQuestion.findMany()
    }
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(600)
    }),
    async resolve({ input }) {
      return await prisma.pollQuestion.create({
        data: {
          question: input.question
        }
      })
    }
  });