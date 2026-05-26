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
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');


  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/280x280?text=No+Image'
  }

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error));
  }, []);

  const positions = useMemo(() => {
    const uniquePositions = [];
    politicians.forEach(p => {
      if (!uniquePositions.includes(p.position)) {
        uniquePositions.push(p.position);
      }
    });
    return uniquePositions;
  }, [politicians]);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const isInName = politician.name.toLowerCase().includes(search.toLowerCase());
      const isInBio = politician.biography.toLowerCase().includes(search.toLowerCase());
      const isPositionValid = selectedPosition === '' ||
        selectedPosition === politician.position;
      return (isInName || isInBio) && isPositionValid;
    });
  }, [politicians, search, selectedPosition]);

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
      <select
        value={selectedPosition}
        onChange={e => setSelectedPosition(e.target.value)}
      >
        {positions.map((position, index) => (
          <option key={index} value={position}>{position}</option>
        ))}
      </select>
      <div className='politicians-list'>
        {filteredPoliticians.map(politician => (
          <MemoizedPoliticianCard key={politician.id} {...politician} onImageError={handleImageError} />
        ))}

      </div>
    </div>


  )
}

export default App
