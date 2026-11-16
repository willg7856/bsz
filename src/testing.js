/**
 * What counts as "testing" content from Octopus: countdowns of type Test, and news posts
 * tagged Testing (or Test / Tests). Tests lead the home page — they're the main thing.
 */
export const isTest = (countdown) => countdown?.category === 'test'

export const isTestPost = (post) => /\btests?\b|\btesting\b/i.test(post?.tag || '')
