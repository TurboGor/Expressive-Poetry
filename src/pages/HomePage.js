import React from 'react';
/* React state and effect */
import { useState, useEffect } from 'react';
/* Components */
import PoemCard from '../components/PoemCard';
/* React router */
import { Link } from "react-router-dom";

export default function HomePage( {title, author} ) {
    const [poems, setPoems] = useState([]);

    /* Fetch data from backend */
    useEffect(() => {
  
      getPoems();
  
      async function getPoems() {
        // GET request using fetch with set headers
        const headers = { 'Content-Type': 'application/json', 'bob': 'Bobalooba' };
        try {
          await fetch('https://expressive-poetry-api.herokuapp.com/api/poems', { headers })
          .then((response) => response.json())
          .then((data) => data.sort((a, b) => (a.votes < b.votes) ? 1 : -1)) // sort by votes
          .then((data) => setPoems(data))
        } catch(e) { console.log(e) }
      }
    }, []);

    return (
        <div>
    <h1>Expressive poetry!</h1>
    <p>Highest voted poems:</p>

    {poems && (
      <div className="poems">
        {/* loop over the poems */}
        {poems.map((poem) => (
          <div key={poem.id}>
            <Link to={`/poem/${poem.id}`}>
              <PoemCard title={poem.title} author={poem.author} />
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
    )
}
