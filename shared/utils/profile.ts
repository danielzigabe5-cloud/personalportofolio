export interface ProfileData {
  name: string
  email: string
  phone: string
  role: string
  location: string
  aboutHeadline: string
  bio: string
  aboutDetails: string
  avatarUrl: string | null
}

export const defaultProfile: ProfileData = {
  name: 'Daniel Zigabe Minda',
  email: 'danielzigabe5@gmail.com',
  phone: '+251 945 800 348',
  role: 'Full-Stack & Mobile Developer',
  location: 'Ethiopia',
  aboutHeadline: 'Thoughtful software, built for people.',
  bio: "I'm a computer science student and software developer focused on useful, reliable web and mobile products.",
  aboutDetails: 'I enjoy turning complex ideas into functional, user-friendly applications. I work closely with teams to build meaningful digital solutions and care about the details that make software dependable and easy to use. My core tools include Nuxt.js, Laravel, and Flutter. I keep learning new technologies to improve performance and make better products.',
  avatarUrl: null
}
