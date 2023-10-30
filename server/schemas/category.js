import { defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Film Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Category Name',
      validation: rule=> rule.required(),
   },
   {
      name: 'films',
      type: 'array',
      title: 'Films',
      of: [{type: 'reference', to: [{type: 'film'}]}]
   }
  ],
})