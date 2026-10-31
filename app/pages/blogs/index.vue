<script setup lang="ts">
import { computed, ref } from 'vue'
import { blogCategories, blogPosts } from '~~/shared/utils/blogs'

const searchQuery = ref('')
const selectedCategory = ref('All topics')

const featuredPosts = computed(() => blogPosts.filter(post => post.featured).slice(0, 2))
const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory.value === 'All topics' || post.category === selectedCategory.value
    const searchableText = [post.title, post.excerpt, post.category, ...post.tags]
      .join(' ')
      .toLowerCase()

    return matchesCategory && (!query || searchableText.includes(query))
  })
})

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(`${date}T00:00:00`)
  )
</script>

<template>
  <main class="min-h-[70vh] bg-[#f3f9f8] px-5 py-14 text-[#174b45] sm:px-6 sm:py-20">
    <div class="mx-auto max-w-7xl">
      <header class="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <p class="mb-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#168b7d]">
          <span class="h-0.5 w-7 rounded-full bg-[#168b7d]" aria-hidden="true" />
          Blog & Insights
        </p>
        <h1 class="text-4xl font-black tracking-tight sm:text-5xl">Ideas worth sharing</h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#66827e] sm:text-lg">
          Notes on web development, software engineering, design, and lessons learned along the way.
        </p>
      </header>

      <section v-if="featuredPosts.length" aria-labelledby="featured-heading" class="mb-16">
        <div class="mb-6 flex items-end justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-[#168b7d]">Editor’s picks</p>
            <h2 id="featured-heading" class="mt-2 text-2xl font-black sm:text-3xl">Featured articles</h2>
          </div>
          <a href="#all-posts" class="hidden text-sm font-bold text-[#168b7d] hover:text-[#11776c] sm:inline-flex">
            Browse all posts <span class="ml-2" aria-hidden="true">↓</span>
          </a>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <article
            v-for="post in featuredPosts"
            :key="post.slug"
            class="overflow-hidden rounded-2xl border border-[#d6e8e5] bg-white shadow-lg shadow-[#174b45]/5"
          >
            <NuxtLink :to="`/blogs/${post.slug}`" :aria-label="`Read full article: ${post.title}`" class="group block">
              <img
                :src="post.image"
                :alt="post.title"
                class="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-64"
                fetchpriority="high"
              >
              <div class="p-6 sm:p-8">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold text-[#66827e]">
                  <span class="rounded-full bg-[#e8f4f2] px-3 py-1 text-[#168b7d]">{{ post.category }}</span>
                  <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                  <span>{{ post.readTime }} min read</span>
                </div>
                <h3 class="mt-4 text-2xl font-black leading-snug text-[#174b45] group-hover:text-[#168b7d]">
                  {{ post.title }}
                </h3>
                <p class="mt-3 leading-relaxed text-[#66827e]">{{ post.excerpt }}</p>
                <span class="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#168b7d]">
                  Read article <span aria-hidden="true">→</span>
                </span>
              </div>
            </NuxtLink>
          </article>
        </div>
      </section>

      <section id="all-posts" aria-labelledby="all-posts-heading">
        <div class="mb-6">
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-[#168b7d]">Explore the archive</p>
          <h2 id="all-posts-heading" class="mt-2 text-2xl font-black sm:text-3xl">All articles</h2>
        </div>

        <div class="mb-8 grid gap-4 rounded-2xl border border-[#d6e8e5] bg-white p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <label class="relative block">
            <span class="sr-only">Search articles</span>
            <svg
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#66827e]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path stroke-linecap="round" d="m16 16 4 4" />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search articles or topics..."
              class="w-full rounded-xl border border-[#c2ded9] bg-[#f8fbfa] py-3 pl-11 pr-4 text-sm text-[#174b45] outline-none transition focus:border-[#168b7d] focus:ring-2 focus:ring-[#168b7d]/15"
            >
          </label>
          <div class="flex flex-wrap gap-2" aria-label="Filter by category">
            <button
              v-for="category in blogCategories"
              :key="category"
              type="button"
              class="rounded-full border px-3.5 py-2 text-xs font-bold transition-colors"
              :class="selectedCategory === category
                ? 'border-[#168b7d] bg-[#168b7d] text-white'
                : 'border-[#c2ded9] bg-white text-[#66827e] hover:border-[#168b7d] hover:text-[#168b7d]'"
              :aria-pressed="selectedCategory === category"
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <p class="mb-4 text-sm text-[#66827e]" aria-live="polite">
          {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'article' : 'articles' }}
        </p>
        <div v-if="filteredPosts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="flex flex-col overflow-hidden rounded-2xl border border-[#d6e8e5] bg-white shadow-md shadow-[#174b45]/5 transition-transform duration-200 hover:-translate-y-1"
          >
            <NuxtLink :to="`/blogs/${post.slug}`" :aria-label="`Read full article: ${post.title}`" class="group flex h-full flex-col">
              <img :src="post.image" :alt="post.title" class="h-48 w-full object-cover" loading="lazy">
              <div class="flex flex-1 flex-col p-5">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold text-[#66827e]">
                  <span class="text-[#168b7d]">{{ post.category }}</span>
                  <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                </div>
                <h3 class="mt-3 text-xl font-extrabold leading-snug text-[#174b45] group-hover:text-[#168b7d]">
                  {{ post.title }}
                </h3>
                <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-[#66827e]">{{ post.excerpt }}</p>
                <div class="mt-auto flex items-center justify-between pt-5 text-sm font-bold">
                  <span class="text-[#168b7d]">Read more <span aria-hidden="true">→</span></span>
                  <span class="text-xs font-semibold text-[#66827e]">{{ post.readTime }} min read</span>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>
        <div v-else class="rounded-2xl border border-dashed border-[#c2ded9] bg-white px-6 py-12 text-center">
          <h3 class="text-lg font-bold text-[#174b45]">No articles found</h3>
          <p class="mt-2 text-sm text-[#66827e]">Try another search or choose a different topic.</p>
          <button
            type="button"
            class="mt-4 text-sm font-bold text-[#168b7d] hover:text-[#11776c]"
            @click="searchQuery = ''; selectedCategory = 'All topics'"
          >
            Clear filters
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
