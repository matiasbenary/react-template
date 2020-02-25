import React from 'react';
import Card from '../../molecules/Card';

const CardsContainer = ({ cards }) => (
    <div className="grid">
      {cards.map((card) => <Card key={card.id} title={card.title} description={card.short_description} />)}
    </div>
  );

export default CardsContainer;
