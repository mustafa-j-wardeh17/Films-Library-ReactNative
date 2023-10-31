import sanityClient from '../Sanity';
let sanityQuery = (query, params) => sanityClient.fetch(query, params);

export const getFilmRepository = () => {
  return sanityQuery(`
  *[_type == 'category'] {
    ...,
    films[]->{
    ...,
      related[]->{
         ...,
          casts[]->
          {
            ...,
            related[]->{
              ...
            }
          },
          related[]->
          {
            ...,
            related[]->
              {
                ...,
                related[]->{
                  ...,
                    casts[]->{
                      ...
                    },
                },
                casts[]->{
                  ...
                }
              }

          },
      },
      casts[]->{
        ...,
        related[]->
        {
          ...,
          casts[]->
          {
            ...
          },
          related[]->
          {
            ...,
            casts[]->
            {
            ...
            },
          },
        }
      }
    }
}
    `);

}


// import sanityClient from '../Sanity';

// let sanityQuery = (query, params) => sanityClient.fetch(query, params);

// const generateFilmQuery = (depth) => {
//   if (depth <= 0) {
//     return `{ ... }`;
//   }

//   const nestedQuery = `films[]->{
//       ...,
//       related[]->{
//         ...,
//         casts[]->{
//           ...,
//           ${generateFilmQuery(depth - 1)}
//         },
//         related[]->{
//           ...,
//           ${generateFilmQuery(depth - 1)}
//         }
//       }
//     }`;

//   return `
//     ...,
//     ${nestedQuery}
//   `;
// };

// export const getFilmRepository = (depth=10) => {
//   return sanityQuery(`
//     *[_type == 'category'] {
//       ...,
//       ${generateFilmQuery(depth)}
//     }
//   `);
// };
