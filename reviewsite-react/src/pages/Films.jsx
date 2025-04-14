import { useEffect, useState } from 'react';
import { imgLocation, loadMore } from '../utils/waterfallLayout';
import '../styles/items.css';
import '../styles/basic.css';
import FilmCard from '../components/FilmCard';

const films = [
  {
    title: 'A City of Sadness',
    image: '/images/A_city_of_sadness.JPG',
    alt: 'Poster for A City of Sadness',
    preview: `In the face of momentous times, the fate of ordinary people always seems so insignificant that it might as well be ignored. Individuals who bravely stand up to try to stop the torrents of the era often resemble Don Quixote futilely charging at windmills, usually ending up as martyrs, and more often, they don't even have the choice to be bystanders. Yet, the tragedy of ordinary people undoubtedly reflects the absurdity and cruelty of history.`,
    full: `After Japan's unconditional surrender in 1945 and Taiwan's subsequent recovery, a Lin family in Keelung thought they were about to live better days. However, fate had other plans, and the Lin family faced continuous upheavals. After the "February 28 Incident," only the fourth brother, Lin Wenqing (played by Tony Leung), a deaf-mute who owned a photo studio, remained out of trouble. However, the tragedy did not stop there; due to connections with progressive individuals, Lin Wenqing could not escape arrest, leaving only him and his infant nephew, Wu Kuan-mei (played by Hsin Shu-fen), who was still babbling in his cradle.`,
    load_id: 'A-City-of-Sadness'
  },
  {
    title: 'The Suspended Step of a Stork',
    image: '/images/The_suspended_step_of_a_stork.JPG',
    alt: 'The Suspended Step of a Stork',
    preview: `The story is set on the Greek border and is said to be a film about the despair of the end of the century. It focuses on the issues of contemporary borders, refugees, and transitions after the decline of Eastern European communism and the dissolution of the Soviet Union.`,
    full: `A politician leaves the parliament and vanishes from his home without a trace. Journalist Gregory Karr is reporting on the immigrants and refugees stuck at the border, where he encounters someone who greatly resembles the missing politician. He also discovers a town split by a river used as a national border, witnessing a surreal wedding with the bride and her family on one side of the river and the groom and his guests on the other. The man's identity remains unconfirmed, and the plight of the unfortunate refugees and the divided village deepens Karr's despair about the human condition.`,
    load_id: 'The-Suspended-Step-of-a-Stork'
  },
  {
    title: 'Andrei Rublev',
    image: '/images/Andrei_Rublev.jpg',
    alt: 'Poster for Andrei Rublev',
    preview: `At the beginning of the 15th century, during a tumultuous period in Russia, the renowned icon painter Andrei Rublev (portrayed by Anatoli Solonitsyn) is invited to Moscow by the Grand Prince to paint for a church, where he receives aristocratic treatment. However, Rublev finds himself in a tragic era ravaged by Tatar invasions and filled with disaster and slaughter. Witnessing the suffering of the people under the Grand Prince's tyranny, Rublev decisively leaves the church to return to the monastery. Soon, he is forced to return to Moscow to create icons once again. Confronted with the innocent slaughter of the residents and the ruthless destruction of churches during the wars, Rublev falls into a deep questioning of the huge disparity between art and reality, refusing to continue painting. By 1423, the Tatar forces are finally driven out of Russian lands. After enduring trials of fire and blood, Rublev ultimately completes his masterpiece, "The Trinity."`,
    full: `Directed by the Soviet cinematic master Andrei Tarkovsky, the epic film "Andrei Rublev" uses Tarkovsky's unique poetic cinematic language and dense, historical mural-like strokes to depict the life of wandering and decisions of the famous 15th-century Russian icon painter Andrei Rublev. The film was awarded the FIPRESCI Prize at the 22nd Cannes Film Festival in 1969.`,
    load_id: 'Andrei-Rublev'
  },
  {
    title: 'Time of the Gypsies',
    image: '/images/Time_of_the_Gypsies.JPG',
    alt: 'Poster for Time of the Gypsies',
    preview: `In the village of Ciganska, young Behan lives with his grandmother and relatives. He falls in love with Azna, but her mother disapproves. The tribe leader Amed exploits Behan's powers and the children he traffics. Behan rises in power but returns home to shocking news about Azna.`,
    full: `This film won the Best Director Award at the Cannes Film Festival in 1989.`,
    load_id: 'Time-of-the-Gypsies'
  },
  {
    title: 'Mouchette',
    image: '/images/Mouchette.JPG',
    alt: 'Mouchette',
    preview: `Mouchette is a 14-year-old girl in rural France, enduring a bleak and difficult life with a neglectful, alcoholic father, dying mother, and constant bullying.`,
    full: `This film won several awards, including the OCIC Award at the 1967 Cannes Film Festival, the Best Film Award from the French Film Critics Association in 1968, the Silver Ribbon for Best Foreign Director from the Italian Film Journalists Association in 1969, and the Pasinetti Award for Best Film at the 1967 Venice Film Festival.`,
    load_id: 'Mouchette'
  },
  {
    title: 'A Brighter Summer Day',
    image: '/images/A_brighter_summer_day.JPG',
    alt: 'Poster for A Brighter Summer Day',
    preview: `Before meeting Xiaoming, Xiaosi was a model student. But after falling for her, he gets pulled into a world of gangs, heartbreak, and emotional turmoil.`,
    full: `After falling for Xiaoming, Xiaosi plunged into a bottomless abyss... Eventually, his disillusionment and frustration lead him to a violent and irreversible decision.`,
    load_id: 'A-Brighter-Summer-Day'
  },
  {
    title: 'Sunrise: A Song of Two Humans',
    image: '/images/Sunrise.JPG',
    alt: 'Sunrise',
    preview: `A farmer is seduced by a city woman into attempting to murder his wife. He has a change of heart, and the couple rekindles their love during a trip to the city.`,
    full: `The film is widely regarded as one of the greatest silent films ever made, winning several awards at the first Academy Awards.`,
    load_id: 'Sunrise'
  },
  {
    title: 'Intolerance',
    image: '/images/Intolerance.JPG',
    alt: 'Intolerance',
    preview: `This is D.W. Griffith's most ambitious work, exploring four parallel stories across time periods, centered around the theme of intolerance.`,
    full: `Intolerance is structured around four distinct historical periods: the fall of Babylon, the crucifixion of Jesus Christ, the St. Bartholomew's Day Massacre in France, and early 20th-century labor conflicts in America. Griffith's use of parallel editing and visual grandeur made this film a milestone of cinematic technique despite its initial box office failure.`,
    load_id: 'Intolerance'
  },
  {
    title: 'Autumn Sonata',
    image: '/images/Autumn_sonata.JPG',
    alt: 'Poster for Autumn Sonata',
    preview: `A famous pianist reunites with her daughter after seven years of emotional estrangement, leading to an intense and heartbreaking confrontation.`,
    full: `Ingrid Bergman delivers a powerful performance in this intimate drama directed by Ingmar Bergman, examining themes of maternal failure, resentment, and reconciliation in a single emotional night.`,
    load_id: 'Autumn-Sonata'
  },
  {
    title: 'Farewell My Concubine',
    image: '/images/Farewell_my_concubine.JPG',
    alt: 'Farewell My Concubine',
    preview: `Two opera performers bound by their art and complicated feelings face the upheavals of 20th-century China.`,
    full: `The film explores gender identity, loyalty, betrayal, and artistic devotion in a lifelong love triangle. It won the Palme d'Or at Cannes and is considered one of the greatest Chinese films ever made.`,
    load_id: 'Farewell-My-Concubine'
  }


];

const Films = () => {
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    imgLocation('items', 'box');
    const handleResize = () => imgLocation('items', 'box');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: true }));
    loadMore(id);
  };

  return (
    <div className="page">
      <h1>Film Reviews</h1>
      <div id="items">
        {films.map((film, index) => (
          <FilmCard
            key={index}
            film={film}
            isExpanded={expanded[film.load_id]}
            onLoadMore={handleLoadMore}
          />
        ))}
      </div>
    </div>
  );
};

export default Films;
