<script setup lang="ts">
import { blogPosts } from '~~/shared/utils/blogs'

const route = useRoute()
const post = blogPosts.find(article => article.slug === route.params.slug)

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })
}

useSeoMeta({
  title: () => `${post.title} | Blog`,
  description: () => post.excerpt,
  ogTitle: () => post.title,
  ogDescription: () => post.excerpt,
  ogImage: () => post.image
})

const sharePost = (platform: 'facebook' | 'linkedin' | 'x') => {
  const pageUrl = window.location.href
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`
  }

  window.open(shareUrls[platform], '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <main class="blog-page min-h-[70vh] bg-[#172335] px-5 py-12 text-[#f1f5f9] sm:px-6 sm:py-16">
    <article class="mx-auto max-w-4xl">
      <NuxtLink to="/blogs" class="inline-flex items-center gap-2 text-sm font-bold text-[#0ea5e9] hover:text-[#0284c7]">
        <span aria-hidden="true">←</span> All articles
      </NuxtLink>

      <header class="pb-8 pt-8 sm:pb-10 sm:pt-10">
        <p class="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0ea5e9]">{{ post.category }}</p>
        <h1 class="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{{ post.title }}</h1>
        <p class="mt-5 max-w-3xl text-lg leading-relaxed text-[#aab8ca]">{{ post.excerpt }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[#aab8ca]">
          <time :datetime="post.date">
            {{ new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${post.date}T00:00:00`)) }}
          </time>
          <span aria-hidden="true">·</span>
          <span>{{ post.readTime }} min read</span>
        </div>
      </header>

      <img
        :src="post.image"
        :alt="post.title"
        class="max-h-[520px] w-full rounded-2xl object-cover shadow-xl shadow-black/25"
        fetchpriority="high"
      >

      <div class="mx-auto max-w-3xl">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-[#344256] py-6">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-1 text-xs font-bold text-sky-300"
            >
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center gap-2" aria-label="Share this article">
            <span class="mr-1 text-xs font-bold text-[#aab8ca]">Share</span>
            <button
              type="button"
              class="rounded-lg border border-[#344256] bg-[#202d40] px-3 py-2 text-xs font-bold text-[#f1f5f9] transition hover:border-[#0ea5e9] hover:text-[#38bdf8]"
              aria-label="Share on Facebook"
              @click="sharePost('facebook')"
            >
              Facebook
            </button>
            <button
              type="button"
              class="rounded-lg border border-[#344256] bg-[#202d40] px-3 py-2 text-xs font-bold text-[#f1f5f9] transition hover:border-[#0ea5e9] hover:text-[#38bdf8]"
              aria-label="Share on LinkedIn"
              @click="sharePost('linkedin')"
            >
              LinkedIn
            </button>
            <button
              type="button"
              class="rounded-lg border border-[#344256] bg-[#202d40] px-3 py-2 text-xs font-bold text-[#f1f5f9] transition hover:border-[#0ea5e9] hover:text-[#38bdf8]"
              aria-label="Share on X"
              @click="sharePost('x')"
            >
              X
            </button>
          </div>
        </div>

        <div class="space-y-6 py-8 text-base leading-8 text-[#cbd5e1] sm:py-10 sm:text-lg">
          <p v-for="paragraph in post.content" :key="paragraph">{{ paragraph }}</p>
        </div>

        <footer class="border-t border-[#344256] py-8">
          <NuxtLink
            to="/blogs"
            class="inline-flex items-center gap-2 rounded-xl bg-[#0ea5e9] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0284c7]"
          >
            Explore more articles <span aria-hidden="true">→</span>
          </NuxtLink>
        </footer>
      </div>
    </article>
  </main>
</template>
