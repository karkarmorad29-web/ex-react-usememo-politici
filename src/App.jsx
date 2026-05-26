import React, { useState, useEffect, useMemo } from 'react'

function PoliticianCard({ name, image, position, biography, onImageError }) {
  console.log('Card')
  return (
    <div className='card'>
      <img src={image} alt={name} onError={onImageError} />
      <h2>{name}</h2>
      <p><strong>Posizione:</strong>{position}</p>
      <p>{biography}</p>
    </div>
  );
}

const MemoizedPoliticianCard = React.memo(PoliticianCard);

function App() {
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState('')


  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/280x280?text=No+Image'
  }

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error));
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const isInName = politician.name.toLowerCase().includes(search.toLowerCase());
      const isInBio = politician.biography.toLowerCase().includes(search.toLowerCase());
      return isInName || isInBio;
    });
  }, [politicians, search]);

  return (
    <div>
      <h1>lista Politici</h1>
      <input
        className='search-input'
        type="text"
        placeholder='Cerca per nome o biografia'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className='politicians-list'>
        {filteredPoliticians.map(politician => (
          <MemoizedPoliticianCard key={politician.id} {...politician} onImageError={handleImageError} />
        ))}

      </div>
    </div>


  )
}

export default App
