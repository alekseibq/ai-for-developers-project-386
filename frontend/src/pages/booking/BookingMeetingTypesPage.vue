<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMeetingTypesStore } from "@/stores/meetingTypes";

const store = useMeetingTypesStore();
const router = useRouter();

onMounted(() => {
  store.fetchMeetingTypes();
});
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-2">Выберите тип события</h2>
    <p class="text-sm text-gray-500 mb-6">
      Выберите подходящий тип встречи, чтобы продолжить
    </p>

    <div v-if="store.loading" class="text-gray-500">Загрузка...</div>

    <div
      v-else-if="store.error"
      class="text-red-600 bg-red-50 border border-red-200 rounded-md p-3 text-sm"
    >
      {{ store.error }}
    </div>

    <div v-else-if="store.meetingTypes.length === 0" class="text-gray-500">
      Пока нет ни одного типа события.
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="mt in store.meetingTypes"
        :key="mt.id"
        class="border border-gray-200 rounded-lg p-5 bg-white cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
        @click="router.push(`/booking/${mt.id}`)"
        role="button"
        :tabindex="0"
        @keydown.enter="router.push(`/booking/${mt.id}`)"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold">{{ mt.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ mt.description }}</p>
          </div>
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 whitespace-nowrap ml-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ mt.duration_minutes }} мин
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
