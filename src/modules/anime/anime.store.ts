import { Anime } from './anime.types';
import { newId } from '../../common/utils/id';

const now = () => new Date().toISOString();

export const animeStore: Anime[] = [
    {
        id: newId(),
        title: 'Naruto',
        titleEn: 'Naruto',
        titleJp: 'ナルト',
        synopsis: 'Whenever Naruto Uzumaki proclaims that he will someday become the Hokage—a title bestowed upon the best ninja in the Village Hidden in the Leaves—no one takes him seriously. Since birth, Naruto has been shunned and ridiculed by his fellow villagers. But their contempt isn\'t because Naruto is loud-mouthed, mischievous, or because of his ineptitude in the ninja arts, but because there is a demon inside him. Prior to Naruto\'s birth, the powerful and deadly Nine-Tailed Fox attacked the village. In order to stop the rampage, the Fourth Hokage sacrificed his life to seal the demon inside the body of the newborn Naruto.\n' +
            '\n' +
            'And so when he is assigned to Team 7—along with his new teammates Sasuke Uchiha and Sakura Haruno, under the mentorship of veteran ninja Kakashi Hatake—Naruto is forced to work together with other people for the first time in his life. Through undergoing vigorous training and taking on challenging missions, Naruto must learn what it means to work in a team and carve his own route toward becoming a full-fledged ninja recognized by his village.',
        status: 'finished',
        year: 2002,
        season: 'fall',
        ageRating: 'PG-13',
        posterUrl: 'https://example.com/naruto.jpg',
        createdAt: now()
    },
    {
        id: newId(),
        title: 'Naruto Shippuuden',
        titleEn: 'Naruto Shippuuden',
        titleJp: '-ナルト- 疾風伝',
        synopsis: 'It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the mysterious organization of elite rogue ninja, is closing in on their grand plan which may threaten the safety of the entire shinobi world.\n' +
            '\n' +
            'Although Naruto is older and sinister events loom on the horizon, he has changed little in personality—still rambunctious and childish—though he is now far more confident and possesses an even greater determination to protect his friends and home. Come whatever may, Naruto will carry on with the fight for what is important to him, even at the expense of his own body, in the continuation of the saga about the boy who wishes to become Hokag',
        status: 'finished',
        year: 2007,
        season: 'fall',
        ageRating: 'PG-13',
        posterUrl: 'https://example.com/naruto.jpg',
        createdAt: now()
    }
];
