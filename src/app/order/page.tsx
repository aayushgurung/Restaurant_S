import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/section-heading";
import { OrderInterface } from "@/components/ordering/order-interface";
export const metadata: Metadata = {
  title: "Order online",
  description:
    "Bring a little Nepal home. Explore Shaswat’s interactive demo ordering experience for pick-up or delivery.",
};
export default function OrderPage() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR SOFA. OUR SOUL FOOD."
        title={
          <>
            A little Nepal, <em>to go.</em>
          </>
        }
        description="The same care, the same comforting flavours. Wherever you make yourself at home."
      />
      <OrderInterface />
    </>
  );
}
