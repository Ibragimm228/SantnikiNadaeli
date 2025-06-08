<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/client/supabase'
import { formatDate } from '@/utils/formatDate'

const comments = ref([])
const newComment = ref('')
const username = ref('')
const isLoading = ref(false)

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const fetchComments = async () => {
  try {
    isLoading.value = true;
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('comments')
      .eq('id', props.article.id)
      .single();

    if (error) throw error;
    comments.value = data?.comments || [];
  } catch (err) {
    console.error('Error fetching comments:', err);
  } finally {
    isLoading.value = false;
  }
};

const submitComment = async () => {
  if (!newComment.value.trim()) return;

  const comment = {
    id: Date.now(),
    username: username.value.trim() || 'Anonymous',
    commentText: newComment.value.trim(),
    created_at: new Date().toISOString()
  };

  try {
    isLoading.value = true;

    const { data, error: fetchError } = await supabase
      .from('ashley_articles')
      .select('comments')
      .eq('id', props.article.id)
      .single();

    if (fetchError) throw fetchError;

    const currentComments = data?.comments || [];

    const { error: updateError } = await supabase
      .from('ashley_articles')
      .update({
        comments: [...currentComments, comment]
      })
      .eq('id', props.article.id);

    if (updateError) throw updateError;

    newComment.value = '';
    await fetchComments();
  } catch (err) {
    console.error('Error submitting comment:', err);
  } finally {
    isLoading.value = false;
  }
};


onMounted(() => {
  fetchComments()
})
</script>

<template>
  <div class="comments-section">
    <h2 class="comments-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="comment-icon">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      Discussion
    </h2>

    <div class="comment-form">
      <div class="form-group">
        <input id="username" v-model="username" type="text" placeholder="Your name (optional)" class="form-input">
      </div>
      <div class="form-group">
        <textarea id="comment" v-model="newComment" placeholder="Share your thoughts..." rows="4"
          class="form-textarea"></textarea>
      </div>
      <button @click="submitComment" :disabled="isLoading || !newComment.trim()" class="submit-button">
        <span v-if="isLoading" class="button-content">
          <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
          Sending...
        </span>
        <span v-else class="button-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="send-icon">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Post Comment
        </span>
      </button>
    </div>

    <div v-if="isLoading && !comments.length" class="loading-comments">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
      Loading comments...
    </div>

    <div v-else-if="!comments.length" class="no-comments">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="party-icon">
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
        </polygon>
      </svg>
      <p>No comments yet</p>
      <p class="subtext">Be the first to share your thoughts!</p>
    </div>

    <div v-else class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-avatar" :data-initials="comment.username?.slice(0, 2).toUpperCase() || 'AN'">
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author">{{ comment.username || 'Anonymous' }}</span>
            <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
          </div>
          <div class="comment-text">{{ comment.commentText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comments-section {
  margin-top: 2rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  font-family: "Segoe UI", sans-serif;
  margin-left: auto;
  margin-right: auto;
}

.comments-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.comment-icon {
  margin-right: 0.5rem;
  color: #3b82f6;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form-group {
  width: 100%;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background-color: #f9fafb;
  font-size: 1rem;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #3b82f6;
  background-color: #ffffff;
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;
}

.submit-button:hover {
  background-color: #2563eb;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
}

.comment-avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background-color: #6b7280;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.3rem;
}

.comment-author {
  font-weight: 600;
  color: #111827;
}

.comment-date {
  color: #9ca3af;
}

.comment-text {
  font-size: 0.95rem;
  color: #374151;
}
</style>