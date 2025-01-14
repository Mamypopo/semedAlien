import prisma from "../config/prisma.js";

export const createAlien = async (alienData) => {
    try {
        const data = {
            ...alienData,
            albdate: alienData.albdate || null,
        };

        console.log('Data to be saved:', data);

        return await prisma.alien.upsert({
            where: { alcode: alienData.alcode },
            update: data,
            create: data,
        });
    } catch (error) {
        console.error('Error in createAlien:', error);
        throw error;
    }
};


export const getAlienByCode = async (alcode) => {
    return await prisma.alien.findUnique({
        where: { alcode }
    });
};

export const getAllAliens = async () => {
    return await prisma.alien.findMany();
};