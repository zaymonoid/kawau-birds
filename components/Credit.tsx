import { creditParts, type Credit as CreditData } from "@/lib/birds";

/** "Photo: <author> · Public domain" */
export default function Credit({ credit }: { credit: CreditData }) {
  const { kind, author, licence, href } = creditParts(credit);
  return (
    <>
      {kind}: <a href={href}>{author}</a> · {licence}
    </>
  );
}
