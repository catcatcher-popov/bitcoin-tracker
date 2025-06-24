<template>
  <div class="flex items-end space-x-8">
    <div v-for="f in FIELDS" :key="f.id" class="flex flex-row items-center">
      <div class="bg-text-primary/60 rounded pl-4">
        <label :for="f.id" class="text-background-dark mr-4 mb-1">{{ f.label }}</label>
        <input
          :id="f.id"
          v-model="values[f.key]"
          type="datetime-local"
          class="bg-background-dark border border-text-primary/30 text-text-primary rounded px-2 py-1 focus:outline-none focus:border-bitcoin-gold"
        />
      </div>
    </div>
    <button
      class="px-4 py-2 bg-none text-text-primary hover:bg-bitcoin-gold-secondary hover:shadow-lg hover:text-bitcoin-gold active:bg-bitcoin-gold active:text-background-dark transition-all justify-self-end rounded"
      @click="apply"
    >
      Применить
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

import type { CustomPeriodDTO } from 'types';

const FIELDS = [
  { id: 'from', label: 'С', key: 'from' as const },
  { id: 'to', label: 'По', key: 'to' as const },
];

const props = defineProps<{ modelValue: CustomPeriodDTO }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: CustomPeriodDTO): void }>();

const values = reactive<CustomPeriodDTO>({
  from: props.modelValue.from,
  to: props.modelValue.to,
});

watch(
  () => props.modelValue,
  (mv) => {
    values.from = mv.from;
    values.to = mv.to;
  }
);

function apply(): void {
  emit('update:modelValue', { from: values.from, to: values.to });
}
</script>
