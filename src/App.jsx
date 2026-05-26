import { useState, useEffect } from 'react'

function App() {
  const [politicians, setPoliticians] = useState([])

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/280x280?text=No+Image'
  }

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error));
  }, []);

  console.log(politicians);

  return (
    <div>
      <h1>lista Politici</h1>
      <div className='politicians-list'>
        {politicians.map(politician => (
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
