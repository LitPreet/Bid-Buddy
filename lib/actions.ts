"use server";
import { bids as bidsSchema } from "@/app/db/schema";
import { items as itemsSchema } from "@/app/db/schema";
import { database } from "@/app/db/database";
import { revalidatePath } from "next/cache";
import { auth } from '@/auth';

interface Props{
    name:string;
    startingPrice:string
}

export async function createItemAction({name,startingPrice}: Props) {
    const session = await auth();
    if (!session) {
        throw new Error('Unauthorized')
    }
    const user = session.user;
    if (!user) {
        throw new Error('Unauthorized')
    }
    const priceAsCents = Math.floor(parseFloat(startingPrice))
    // await database.insert(bidsSchema).values({})
    await database.insert(itemsSchema).values({
        name: name,
        startingPrice: priceAsCents,
        userId: user.id!,
    });
    revalidatePath("/");
}