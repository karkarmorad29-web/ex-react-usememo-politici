import { useState, useEffect, useMemo } from 'react'

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
      <input type="text"
        placeholder='Cerca per nome o biografia'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className='politicians-list'>
        {filteredPoliticians.map(politician => (
          <div className='card' key={politician.id}>
            <img src={politician.image} alt={politician.name} onError={handleImageError} />
            <h2>{politician.name}</h2>
            <p><strong>Posizione:</strong>{politician.position}</p>
            <p>{politician.biography}</p>
          </div>
        ))}

      </div>
    </div>


  )
}

export default App
