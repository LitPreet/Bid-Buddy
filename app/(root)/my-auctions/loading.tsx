import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="max-w-5xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10 gap-6 place-items-center">
      {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} className="h-60 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;