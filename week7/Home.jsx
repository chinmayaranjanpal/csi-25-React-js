import { useState } from 'react';
const products = [...Array(8)].map((_, i) => ({ id: i, name: `Product ${i+1}`, price: 99 + i }));

export default function Home() {
  const [view, setView] = useState('grid');
  return (
    <div className="p-4">
      <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
        Toggle {view === 'grid' ? 'List' : 'Grid'}
      </button>
      <div className={`grid ${view === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mt-4`}>
        {products.map(p => (
          <div key={p.id} className="border p-4 rounded">
            <h2>{p.name}</h2>
            <p>${p.price}</p>
            <button className="bg-blue-500 text-white px-2 py-1 mt-2">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
