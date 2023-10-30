import sanityClient from '../Sanity';
let sanityQuery = (query, params) => sanityClient.fetch(query, params);

export const getFilmRepository = () => {
    return sanityQuery(`
    *[_type == 'category'] {
        ...,
        films[]->{
        ...,
          casts[]->{
            ...,
            related[]->{
              ...,
              casts[]->{
                ...
              },
              related[]->{
                ...
              },
            }
          }
        }
    }
    `);
}


