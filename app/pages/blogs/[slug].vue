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
  <main class="min-h-[70vh] bg-[#f3f9f8] px-5 py-12 text-[#174b45] sm:px-6 sm:py-16">
    <article class="mx-auto max-w-4xl">
      <NuxtLink to="/blogs" class="inline-flex items-center gap-2 text-sm font-bold text-[#168b7d] hover:text-[#11776c]">
        <span aria-hidden="true">←</span> All articles
      </NuxtLink>

      <header class="pb-8 pt-8 sm:pb-10 sm:pt-10">
        <p class="text-xs font-extrabold uppercase tracking-[0.16em] text-[#168b7d]">{{ post.category }}</p>
        <h1 class="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{{ post.title }}</h1>
        <p class="mt-5 max-w-3xl text-lg leading-relaxed text-[#66827e]">{{ post.excerpt }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[#66827e]">
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
        class="max-h-[520px] w-full rounded-2xl object-cover shadow-xl shadow-[#174b45]/10"
        fetchpriority="high"
      >

      <div class="mx-auto max-w-3xl">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e8e5] py-6">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="rounded-full bg-[#e8f4f2] px-3 py-1 text-xs font-bold text-[#168b7d]"
            >
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center gap-2" aria-label="Share this article">
            <span class="mr-1 text-xs font-bold text-[#66827e]">Share</span>
            <button
              type="button"
              class="rounded-lg border border-[#c2ded9] px-3 py-2 text-xs font-bold text-[#174b45] transition hover:border-[#168b7d] hover:text-[#168b7d]"
              aria-label="Share on Facebook"
              @click="sharePost('facebook')"
            >
              Facebook
            </button>
            <button
              type="button"
              class="rounded-lg border border-[#c2ded9] px-3 py-2 text-xs font-bold text-[#174b45] transition hover:border-[#168b7d] hover:text-[#168b7d]"
              aria-label="Share on LinkedIn"
              @click="sharePost('linkedin')"
            >
              LinkedIn
            </button>
            <button
              type="button"
              class="rounded-lg border border-[#c2ded9] px-3 py-2 text-xs font-bold text-[#174b45] transition hover:border-[#168b7d] hover:text-[#168b7d]"
              aria-label="Share on X"
              @click="sharePost('x')"
            >
              X
            </button>
          </div>
        </div>

        <div class="space-y-6 py-8 text-base leading-8 text-[#3d5d58] sm:py-10 sm:text-lg">
          <p v-for="paragraph in post.content" :key="paragraph">{{ paragraph }}</p>
        </div>

        <footer class="border-t border-[#d6e8e5] py-8">
          <NuxtLink
            to="/blogs"
            class="inline-flex items-center gap-2 rounded-xl bg-[#168b7d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#11776c]"
          >
            Explore more articles <span aria-hidden="true">→</span>
          </NuxtLink>
        </footer>
      </div>
    </article>
  </main>
</template>
