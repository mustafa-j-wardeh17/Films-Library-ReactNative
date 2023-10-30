import { defineType } from 'sanity'

export default defineType({
    name: 'cast',
    title: 'Cast',
    type: 'document',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Character Name',
            validation: rule => rule.required(),
        },
        {
            name: 'gender',
            type: 'string',
            title: 'Gender',
            validation: rule => rule.required(),
        },
        {
            name: 'type',
            type: 'string',
            title: 'Known For',
            validation: rule => rule.required(),
        },
        {
            name: 'popularity',
            type: 'string',
            title: 'Popularity',
            validation: rule => rule.required(),
        },
        {
            name: 'biography',
            type: 'string',
            title: 'Biography',
            validation: rule => rule.max(400),
        },
        {
            name: 'image',
            type: 'image',
            title: 'Charackter Image',
            validation: rule => rule.required(),
        },
        {
            name: 'related',
            type: 'array',
            title: 'Films',
            of: [{ type: 'reference', to: [{ type: 'film' }] }]
        }
    ],
})