import React, { useState } from "react";

const initialInput = [
  { id: 0, name: 'Grit', placeholder: 'Header', body: [{ other: ['publisher', 'Reading Period: Nov 01 2023 - Nov 15 2023'] }], chosen: true },
  { id: 1, name: 'Summary', body: [{ other: ['What is the secret to success? It is the ability to persist through the process and endure its pain.'] }], chosen: true },
  { id: 2, name: 'Application to Life', body: [{ other: ['I will say out loud three times what I want to achieve in a day before I start my work,'] }], chosen: true },
  {
    id: 3,
    name: 'Reflection of the book', body: [{
      other: ['I was quite surprised to realize that it is not really about my execution ability that is the problem but rather \
     a simple mind trick can help me achieve my goals.']
    }], chosen: true
  },
  { id: 4, name: 'Things I associate with the book', body: [{ other: ['stationery', 'reading_place: coro cafe in fifth st, berkeley', 'music'] }], chosen: true }
];

function ItemList({ sections, onToggle }) {
  const handleToggle = (id) => {
    const updatedList = sections.map(section => {
      if (section.id === id) {
        return { ...section, chosen: !section.chosen };
      }
      return section;
    });
    onToggle(updatedList);
  };

  return (
    <div>
      <ul>
        {sections.map(section => (
          <li key={section.id}>
            <label>
              <input
                type="checkbox"
                checked={section.chosen}
                onChange={() => handleToggle(section.id)}
              /> {section.name}
            </label>
          </li>
        ))}
      </ul>

      <div>
        {sections.filter(section => section.chosen).map(section => (
          <div key={section.id}>
            {section.body.map(content => (
              <p key={section.id}>
                {content.other.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [list, setList] = useState(initialInput);

  const handleToggle = (updatedList) => {
    setList(updatedList);
  };

  return (
    <>
      <h1>Book Summary</h1>
      <h2>Items selected: </h2>
      <ItemList
        sections={list}
        onToggle={handleToggle}
      />
    </>
  );
}