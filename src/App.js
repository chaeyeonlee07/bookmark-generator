import React, { useState } from "react";
import './App.css'

<>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Bitter&family=Caveat:wght@600&family=Concert+One&family=Dancing+Script:wght@600&family=DotGothic16&family=Genos:ital@1&family=Merienda&family=Nanum+Myeongjo&family=Nunito:wght@300&family=PT+Serif&family=Single+Day&family=Yantramanav&family=Zeyada&family=Zilla+Slab:ital,wght@1,500&display=swap"
    rel="stylesheet"
  />
</>
 
const initialInput = [
  { id: 0, name: 'Title',   body: [{ other: ['Grit'] }], chosen: true },
  { id: 1, name: 'Publisher', body: [{other:['Scribner']}],  chosen: true},
  { id: 2, name: 'Author', body: [{other:['Angela Duckworth']}],  chosen: true},
  { id: 3, name: 'Period of Reading', body: [{other:['Nov 20 2021 - Nov 27 2021']}],  chosen: true}, 
  { id: 4, name: 'Summary', body: [{ other: ['What is the secret to success? It is the ability to persist through the process and endure its pain.'] }], chosen: true },
  { id: 5, name: 'Application to Life', body: [{ other: ['I will say out loud three times what I want to achieve in a day before I start my work,'] }], chosen: true },
  { id: 6,
    name: 'Reflection of the book', body: [{
      other: ['I was quite surprised to realize that it is not really about my execution ability that is the problem but rather a simple mind trick can help me achieve my goals.']
    }], chosen: true
  },
  { id: 7, name: 'Place I read the book', body: [{ other: ['Love Cafe at NyC']  }], chosen: true },
  { id: 8, name: 'Song', body: [{ other: ['Chopin nocturne']  }], chosen: true },
  { id: 9, name: 'Stationery', body: [{ other: ['Muji Gel Pen 0.38mm']  }], chosen: true }

]; 


const font_themes = [
  { id: 0, themeName: 'Classic', fontFamily : "'Bitter', serif"},
  { id: 1, themeName: 'Handwritten-Playful', fontFamily : "'Caveat', cursive"},
  { id: 2, themeName: 'Futuristic', fontFamily : "'DotGothic16', sans-serif"},
  { id: 3, themeName: 'Refined', fontFamily : "'Nanum Myeongjo', serif"},
  { id: 4, themeName: 'Traditional', fontFamily : "'PT Serif', serif"},
];

function ItemList({ sections, onToggle, onEdit, onSelectTheme}) {
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');
   
  const handleToggle = (id) => {
    setEditId(null); 
    const updatedList = sections.map(section => {
      if (section.id === id) {
        return { ...section, chosen: !section.chosen };
      }
      return section;
    });
    onToggle(updatedList);
  };

  const handleEdit = (id, content) => {
    setEditId(id);
    setEditContent(content);
  };

  const handleSave = (id) => {
    const updatedList = sections.map(section => {
      if (section.id === id) {
        const updatedBody = [{ other: editContent.split("\n") }];  
        return { ...section, body: updatedBody };
      }
      return section;
    });
    onEdit(updatedList);
    setEditId(null);
  };

  const handleThemeChange = (themeId) => {
    onSelectTheme(themeId);
  }

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
            {section.chosen && (
              <>
                {editId === section.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={8}
                      cols={50}
                    ></textarea>
                    <button onClick={() => handleSave(section.id)}>Save</button>
                  </div>
                ) : (
                  <button onClick={() => handleEdit(section.id, section.body[0].other.join("\n"))}>Edit</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>

      <div>
        <h3>Select Font Theme:</h3>
        <ul>
          {font_themes.map(theme => (
            <li key={theme.id}>
              <button onClick={() => handleThemeChange(theme.id)}>{theme.themeName}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  const [list, setList] = useState(initialInput);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [layout, setLayout] = useState("vertical");

  const handleToggle = (updatedList) => {
    setList(updatedList);
  };

  const handleEdit = (updatedList) => {
    setList(updatedList);
  };

  const handleSelectTheme = (themeId) => {
    setSelectedTheme(themeId);
  };

 

  const toggleLayout = () => {
    setLayout(layout === "vertical" ? "horizontal" : "vertical");
  };

  const getFontFamilyForTheme = (themeId) => {
    const selectedTheme = font_themes.find(font_themes => font_themes.id === themeId);
    return selectedTheme ? selectedTheme.fontFamily : '';
  };

  return (
    <>
      <h1>Book Summary</h1>
      <h2>Items selected: </h2>
      <button onClick={toggleLayout}>
        Toggle Layout ({layout === "vertical" ? "Horizontal" : "Vertical"})
      </button>
      <ItemList
        sections={list}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onSelectTheme={handleSelectTheme}
      />

      <h2>Overview </h2>  

      <div
        style={{
          display: layout === "vertical" ? "block" : "flex",
          flexDirection: layout === "vertical" ? "column" : "row",
          fontFamily: getFontFamilyForTheme(selectedTheme),
        }}>
        {list.filter(section => section.chosen).map(section => (
          <div key={section.id}>
            {section.body.map(content => (
              <p key={section.id}>
                <strong>{section.name}</strong> <br></br>
                {content.other.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </p>
            ))}
          </div>
        ))}
      </div>

    </>

  );
}
