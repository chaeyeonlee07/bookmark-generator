import { Button } from 'flowbite-react';
import React, { useState, useRef } from "react";
import './App.css'
import reading_girl1 from './bg/reading_girl1.jpg';
import reading_girl2 from './bg/reading_girl2.jpg';
import reading_girl3 from './bg/reading_girl3.png';
import { exportComponentAsPNG } from 'react-component-export-image';

const initialInput = [
  { id: 0, name: 'Title', body: [{ other: ['Grit'] }], chosen: true },
  { id: 1, name: 'Publisher', body: [{ other: ['Scribner'] }], chosen: true },
  { id: 2, name: 'Author', body: [{ other: ['Angela Duckworth'] }], chosen: true },
  { id: 3, name: 'Period of Reading', body: [{ other: ['Nov 20 2021 - Nov 27 2021'] }], chosen: true },
  { id: 4, name: 'Summary', body: [{ other: ['What is the secret to success? It is the ability to persist through the process and endure its pain.'] }], chosen: true },
  { id: 5, name: 'Application to Life', body: [{ other: ['I will say out loud three times what I want to achieve in a day before I start my work,'] }], chosen: true },
  {
    id: 6,
    name: 'Reflection of the book', body: [{
      other: ['I was quite surprised to realize that it is not really about my execution ability that is the problem but rather a simple mind trick can help me achieve my goals.']
    }], chosen: true
  },
  { id: 7, name: 'Place I read the book', body: [{ other: ['Love Cafe at NyC'] }], chosen: true },
  { id: 8, name: 'Song', body: [{ other: ['Chopin nocturne'] }], chosen: true },
  { id: 9, name: 'Stationery', body: [{ other: ['Muji Gel Pen 0.38mm'] }], chosen: true }

];


const font_themes = [
  { id: 0, themeName: 'Classic', fontFamily: "'Bitter', serif" },
  { id: 1, themeName: 'Handwritten-Playful', fontFamily: "'Caveat', cursive" },
  { id: 2, themeName: 'Futuristic', fontFamily: "'DotGothic16', sans-serif" },
  { id: 3, themeName: 'Refined', fontFamily: "'Nanum Myeongjo', serif" },
  { id: 4, themeName: 'Traditional', fontFamily: "'PT Serif', serif" },
];

const bookmark_bg = [
  { id: 0, themeName: 'Reading Girl-Green', image_src: reading_girl1 },
  { id: 1, themeName: 'Reading Girl-Orange', image_src: reading_girl2 },
  { id: 2, themeName: 'Reading Girl-Yellow', image_src: reading_girl3 },

];

const ItemList = ({ sections, onToggle, onEdit, onSelectTheme, onSelectBg }) => {
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

  const handleBgChange = (bgId) => {
    onSelectBg(bgId);
  }

  return (
    <div style={{ fontSize: 14 }}>

      {sections.map(section => (
        <ul key={section.id} style={{ margin: '13px -10px' }} >
          <label >
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
                    cols={30}
                    style={{
                      border: 'none',
                      outline: 'none',
                      backgroundColor: '#faaf6a',
                      borderRadius: '10px',
                      margin: '10px',
                    }}

                    maxLength={section.id === 0 || section.id === 1 || section.id === 2 || section.id === 3
                      || section.id === 7
                      || section.id === 8
                      || section.id === 9
                      ? 30 : 200}
                  ></textarea>
                  <p>Character Limit: {section.id === 0 || section.id === 1 || section.id === 2 || section.id === 3
                    || section.id === 7
                    || section.id === 8
                    || section.id === 9 ? 30 : 200}</p>
                  <button style={{
                    color: 'white', backgroundColor: '#eb8634', border: 'none',
                    outline: 'none', borderRadius: '10px', margin: '0px 0px'
                  }} onClick={() => handleSave(section.id)}>Save</button>
                </div>
              ) : (
                <button
                  style={{
                    background: '#ed9a2d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '30%',
                    padding: '2px 2px',
                    margin: '0px 5px',
                  }} onClick={() => handleEdit(section.id, section.body[0].other.join("\n"))}
                  onMouseOver={(e) => e.target.style.background = '#f07e32'}
                  onMouseOut={(e) => e.target.style.background = '#ed9a2d'}
                >  Edit   </button>
              )}
            </>
          )}
        </ul>
      ))}

      <h4>Select your Bookmark:</h4>
      <ul style={{ margin: '0px -20px' }}>
        {bookmark_bg.map(bg => (
          <button
            key={bg.id}
            style={{
              background: '#fdd995',
              border: 'none',
              borderRadius: '10%',
              padding: '1px',
              margin: '4px 4px'
            }}

            onClick={() => handleBgChange(bg.id)}
            onMouseOver={(e) => e.target.style.background = '#f99a54'}
            onMouseOut={(e) => e.target.style.background = '#fdd995'}
          >
            {bg.themeName}
          </button>
        ))
        }

      </ul >
      <div>
      </div>
      <div>
        <h4>Select Font Theme:</h4>
        <ul style={{ margin: '0px -20px' }}>
          {font_themes.map(theme => (
            <button
              key={theme.id}
              style={{
                fontFamily: theme.fontFamily,
                background: '#fdd995',
                border: 'none',
                borderRadius: '10%',
                padding: '1px',
                margin: '4px 4px'
              }}
              onClick={() => handleThemeChange(theme.id)}
              onMouseOver={(e) => e.target.style.background = '#f99a54'}
              onMouseOut={(e) => e.target.style.background = '#fdd995'}
            >
              {theme.themeName}
            </button>
          ))}
        </ul>
      </div>
    </div >
  );
}

const App = () => {
  const [list, setList] = useState(initialInput);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedBg, setSelectedBg] = useState(null);
  const [file, setFile] = useState();
  const printRef = useRef();

  const handleChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
    }
  }

  const handleToggle = (updatedList) => {
    setList(updatedList);
  };

  const handleEdit = (updatedList) => {
    setList(updatedList);
  };

  const handleSelectTheme = (themeId) => {
    setSelectedTheme(themeId);
  };

  const handleSelectBg = (bgId) => {
    setSelectedBg(bgId);
  };



  const getFontFamilyForTheme = (themeId) => {
    const selectedTheme = font_themes.find(font_themes => font_themes.id === themeId);
    return selectedTheme ? selectedTheme.fontFamily : '';
  };

  return (
    <html>
      <div id="fullpage" style={{ backgroundColor: '#feeeab', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', margin: '5px 5px' }}>
        <h1 style={{ color: '#f8853e', fontWeight: '35' }}>Make Your Own Bookmark</h1>
        <button style={{
          background: '#ed9a2d',
          color: '#fff',
          border: 'none',
          padding: '4px 4px',
          margin: '0px 5px',
          borderRadius: '10px',
        }}
          onMouseOver={(e) => e.target.style.background = '#f07e32'}
          onMouseOut={(e) => e.target.style.background = '#ed9a2d'}
          onClick={() => exportComponentAsPNG(printRef)} >
          Export Your Bookmark as PNG
        </button>
        <p>Note: If the bookmark's image is being cut off, then add more contents into your bookmark!</p>
        <h4>Items selected: </h4>

        <ItemList
          sections={list}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onSelectTheme={handleSelectTheme}
          onSelectBg={handleSelectBg}
        />
        <h4>Add Image:</h4>
        <label class="custom-file-upload">
          <input type="file" onChange={handleChange} />Choose Image</label>
        <div className={`item-img`} ref={printRef}
          style={{
            backgroundImage:
              selectedBg !== null && bookmark_bg[selectedBg]
                ? `url(${bookmark_bg[selectedBg].image_src})`
                : '',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            fontFamily: getFontFamilyForTheme(selectedTheme),
            position: 'absolute',
            top: '50%',
            flex: 1,
            left: '50%',
            transform: 'translate(80%, -50%)',
            padding: '3px',
            maxWidth: '300%',
            margin: '11x',
            fontSize: 12,

          }}
        >
          {file && <img src={file} style={{ width: '100px', height: '100px' }} />}
          <div className="box" >
            {list.filter(section => section.chosen).map(section => (
              <div key={section.id}>
                {section.body.map(content => (
                  <p
                    key={section.id}
                    style={{
                      wordWrap: 'break-word',
                    }}
                  >
                    <strong>{`${section.name} `}</strong>
                    {content.other.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div >

    </html>
  );
}

export default App;