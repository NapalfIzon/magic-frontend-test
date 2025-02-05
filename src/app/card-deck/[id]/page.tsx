import { notFound } from "next/navigation";

const CardDetailPage = ({ params }: { params: { id: string } }) => {
  const cardId = params.id;

  if (!cardId) {
    return notFound();
  }

  return (
    <div>
      <h1>Card Deck Detail Page</h1>
      <p>Card Deck ID: {cardId}</p>
    </div>
  );
};

export default CardDetailPage;
