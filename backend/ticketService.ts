import { Prisma, Ticket } from "@prisma/client";
import prisma from "../utils/prisma";
import { CreateTicket, EditTicket } from "./ticketSchema";
import HttpError from "../utils/HttpError";
import { TicketWithUserName } from "./ticketTypes";

const ticketSelect = {
    id: true,
    title: true,
    description: true,
    status: true,
    User: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
};

const ticketService = {
    getAllTicket: async (
        userRole: string,
        userId: string
    ): Promise<TicketWithUserName[]> => {
        const queryArgs: Prisma.TicketFindManyArgs = {
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                userId: true,
                User: {
                    select: {
                        name: true,
                    },
                },
            },
        };
        if (userRole !== "ADMIN") {
            queryArgs.where = {
                userId: userId,
            };
        }
        const allTickets = await prisma.ticket.findMany(queryArgs);
        return allTickets as TicketWithUserName[];
    },

    getTicketById: async (
        ticketId: string,
        userRole: string,
        userId: string
    ): Promise<Ticket> => {
        const ticketExists = await prisma.ticket.count({
            where: { id: ticketId },
        });

        if (!ticketExists) throw new HttpError("Ticket does not exists", 404);

        const ticketById = await prisma.ticket.findUnique({
            where: { id: ticketId },
        });

        if (ticketById!.userId === userId || userRole === "ADMIN") {
            return ticketById!;
        }

        throw new HttpError(
            "You don't have privilage to see this ticket!",
            403
        );
    },

    postTicker: async (
        userId: string,
        ticketData: CreateTicket
    ): Promise<Ticket> => {
        const newTicket = prisma.ticket.create({
            data: {
                title: ticketData.title,
                description: ticketData.description,
                userId: userId,
            },
        });

        return newTicket;
    },

    editTicket: async (
        ticketId: string,
        userRole: string,
        userId: string,
        ticketData: EditTicket
    ): Promise<Ticket> => {
        const ticketExists = await prisma.ticket.findUnique({
            where: { id: ticketId },
            select: { userId: true },
        });

        if (!ticketExists) throw new HttpError("Ticket does not exists", 404);

        if (ticketExists.userId === userId || userRole === "ADMIN") {
            const editedTicket = await prisma.ticket.update({
                where: { id: ticketId },
                data: {
                    title: ticketData.title,
                    description: ticketData.description,
                    status: ticketData.status,
                    userId: ticketData.userId,
                },
            });

            return editedTicket;
        }
        throw new HttpError("This ticket is not yours!", 403);
    },

    deleteTicket: async (
        ticketId: string,
        userId: string,
        userRole: string
    ) => {
        const ticketExists = await prisma.ticket.findUnique({
            where: { id: ticketId },
            select: { userId: true },
        });

        if (!ticketExists) throw new HttpError("Ticket does not exists", 404);

        if (ticketExists.userId === userId || userRole === "ADMIN") {
            const deletedTicket = await prisma.ticket.delete({
                where: { id: ticketId },
            });

            return deletedTicket;
        }

        throw new HttpError("This ticket is not yours!", 403);
    },
};

export default ticketService;
