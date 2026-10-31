export interface BlogPost {
  slug: string
  category: string
  tags: string[]
  title: string
  excerpt: string
  date: string
  readTime: number
  image: string
  featured: boolean
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-websites-people-enjoy-using',
    category: 'Web Development',
    tags: ['Web Development', 'User Experience'],
    title: 'Building websites people enjoy using',
    excerpt:
      'A useful website starts with clear content and thoughtful interactions, then brings everything together with a fast, responsive experience.',
    date: '2026-10-24',
    readTime: 5,
    image: '/images/services/website.jpg',
    featured: true,
    content: [
      'A website is often the first interaction someone has with a business or portfolio. That first visit should make it easy to understand what the site offers and what to do next.',
      'I start by organizing content around visitors’ needs. Clear headings, readable text, and straightforward navigation help people find their way without having to guess.',
      'The details matter too: layouts should adapt to small screens, images should load efficiently, and buttons should give clear feedback. These small decisions add up to a calmer, more dependable experience.',
      'Good web development is not only about making a page look finished. It is about making the page useful, accessible, and easy to maintain as needs change.'
    ]
  },
  {
    slug: 'why-maintainable-code-matters',
    category: 'Software Engineering',
    tags: ['Software Engineering', 'Best Practices'],
    title: 'Why maintainable code matters',
    excerpt:
      'Readable, well-organized code makes future improvements safer and helps a project stay understandable as it grows.',
    date: '2026-10-16',
    readTime: 4,
    image: '/images/services/web-app.jpg',
    featured: true,
    content: [
      'Most software changes after its first release. New requirements arrive, bugs are uncovered, and people other than the original author need to understand how the system works.',
      'Consistent naming, small focused components, and clear data boundaries make those changes easier. The goal is not clever code; it is code that communicates its intent.',
      'Tests and sensible documentation help protect important behavior, while regular cleanup prevents temporary shortcuts from becoming permanent obstacles.',
      'Maintainability is a practical investment. It saves time when a product needs to adapt and gives the team more confidence to improve it.'
    ]
  },
  {
    slug: 'learning-through-every-project',
    category: 'Career & Learning',
    tags: ['Career & Learning', 'Reflection'],
    title: 'Learning through every project',
    excerpt:
      'Projects are a chance to practice, ask better questions, and turn unfamiliar problems into skills you can use again.',
    date: '2026-10-08',
    readTime: 4,
    image: '/images/services/training.jpg',
    featured: false,
    content: [
      'Every project brings a different combination of people, constraints, and technical challenges. That variety is one of the best ways to keep learning.',
      'When I meet an unfamiliar problem, I try to break it into smaller questions, test assumptions early, and keep notes on what I discover. This makes the work less intimidating and the lessons easier to remember.',
      'Not every experiment works the first time. Reviewing what happened, asking for feedback, and adjusting the approach are all part of building stronger habits.',
      'Over time, these small lessons add up. Each completed project gives me another perspective to bring to the next one.'
    ]
  },
  {
    slug: 'designing-useful-digital-products',
    category: 'Design & UX',
    tags: ['Design & UX', 'User Experience'],
    title: 'Designing useful digital products',
    excerpt:
      'Good product design helps people complete real tasks with less friction, not just admire a polished screen.',
    date: '2026-09-29',
    readTime: 6,
    image: '/images/services/mobile-app.jpg',
    featured: false,
    content: [
      'A digital product is successful when it helps people do something they care about. Visual polish is valuable, but it should support the task rather than compete with it.',
      'Understanding the user’s goal is a useful first step. From there, a clear information structure and predictable interactions can reduce unnecessary effort.',
      'It is also important to test designs with real usage in mind. A flow that seems obvious to its creator may still leave new users unsure what to do next.',
      'Useful design is an ongoing process: listen, make a focused improvement, and learn from how people use the product.'
    ]
  }
]

export const blogCategories = ['All topics', ...new Set(blogPosts.map(post => post.category))]
