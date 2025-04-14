const FilmCard = ({ film, isExpanded, onLoadMore }) => (
    <div className="box">
      <div className="box-img">
        <h2>{film.title}</h2>
        <img src={film.image} alt={film.alt} width="150" />
        <p id={`first-p-${film.load_id}`}>{film.preview}</p>
  
        {film.full && isExpanded && (
          <div id={`more-${film.load_id}`}>
            <p>{film.full}</p>
          </div>
        )}
  
        {!isExpanded && film.full && (
          <button
            id={`more-btn-${film.load_id}`}
            onClick={() => onLoadMore(film.load_id)}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
  
  export default FilmCard;
  