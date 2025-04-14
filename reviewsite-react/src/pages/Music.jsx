import '../styles/albums.css';

const musicItems = [
  {
    title: "Out of Later Years",
    iframe: "https://open.spotify.com/embed/album/3WTnhMbFXNE190kH3rczlJ",
  },
  {
    title: "The Only Guitar Album You'll Ever Need",
    image: "guitar.JPG",
  },
  {
    title: "Martha Argerich: the Collection 2",
    iframe: "https://open.spotify.com/embed/album/7IRZvMqH4NPejpgdMKKB81",
  },
  {
    title: "Debussy: La Mer - Images",
    image: "La_mer.JPG",
  },
  {
    title: "Karaoke live - Taipei - I",
    iframe: "https://open.spotify.com/embed/album/07eHPCtwW09AjZd7Cp8KN0",
  },
  {
    title: "Mahler",
    iframe: "https://open.spotify.com/embed/album/1aDYZ8TScdkpM0zVy49kKf",
  },
];

const Music = () => (
  <div className="page">
    <h1>Music Reviews</h1>
    <div id="items">
      {musicItems.map((item, i) => (
        <div className="box" key={i}>
          <div className="box-img">
            <h2>{item.title}</h2>
            {item.iframe ? (
              <iframe
                style={{ borderRadius: "12px" }}
                src={item.iframe}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ) : (
              <img src={`/images/${item.image}`} alt={item.title} width="150" />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Music;
