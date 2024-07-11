'use client'
import { database } from "@/app/db/database";
import { Button } from "@/components/ui/button";
import { bids as bidsSchema } from "@/app/db/schema";
import { items as itemsSchema } from "@/app/db/schema";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { motion } from "framer-motion";
import { HeroHighlight,Highlight } from "@/components/ui/hero-highlight";


export default  function Home() {
  // const session = await auth();
  // if (!session) return null;
  // const user = session.user;
  // if (!user) return null;
  // // const bidsItems = await database.query.bids.findMany();
  // const allItems = await database.query.items.findMany();
  return (
    // <main className="space-y-8">
    //   <h1 className="text-4xl font-bold">Items For Sale</h1>
    //   <form
    //     action={async (formData: FormData) => {
    //       "use server";
    //       // await database.insert(bidsSchema).values({})
    //       await database.insert(itemsSchema).values({
    //         name: formData.get("name") as string,
    //         userId: user.id!,
    //       });
    //       revalidatePath("/");
    //     }}
    //   >
    //     <Input name="name" placeholder="name your item" />
    //     <Button>Post Item</Button>
    //   </form>
    //   {/* <div className="grid grid-cols-4 gap-8">
    //     {allItems.map((item) => (
    //       <ItemCard key={item.id} item={item} />
    //     ))}
    //   </div> */}
    //   {allItems?.map((item) => (
    //     <div key={item.id} className="text-black">{item.name}</div>
    //   ))}
    // </main>
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Join the Auction &apos;s Revolution. Unleash Exclusive Deals
        Post Your Items {" "}
        <Highlight className="text-black dark:text-white">
        Let the Bidding Begin!
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  //   <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
  //   <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
  //     <h2>Post Your Items, Start the Bidding Win Exciting Deals on <span className="text-primary">Bid Buddy!</span></h2>
  //     <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
  //       MarshalUi stands out as the premier marketplace for all things related
  //       to tailwindcss, offering an unparalleled platform for both sellers and
  //       buyers alike.
  //     </p>
  //   </div>
  //   {/* <ProductRow category="newest" />
  //   <ProductRow category="templates" />
  //   <ProductRow category="icons" />
  //   <ProductRow category="uikits" /> */}
  // </section>

  );
}
