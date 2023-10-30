import { defineType } from 'sanity'

export default defineType({
    name: 'film',
    title: 'Film',
    type: 'document',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Film Title',
            validation: rule => rule.required(),
        },
        {
            name: 'image',
            type: 'image',
            title: 'Film Cover',
            validation: rule => rule.required(),
        },
        {
            name: 'casts',
            type: 'array',
            title: 'Top Cast',
            of: [{ type: 'reference', to: [{ type: 'cast' }] }]
        },
        {
            name: 'related',
            type: 'array',
            title: 'Related',
            of: [{ type: 'reference', to: [{ type: 'film' }] }]
        }
    ],
})