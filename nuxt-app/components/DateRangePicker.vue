<template>
  <div class="flex items-end space-x-4 mb-4">
    <div v-for="f in fields" :key="f.id" class="flex flex-col">
      <label :for="f.id" class="text-text-secondary mb-1">{{ f.label }}</label>
      <input
        :id="f.id"
        v-model="values[f.key]"
        type="datetime-local"
        class="bg-background-dark border border-text-secondary text-text-primary rounded px-2 py-1 focus:outline-none focus:border-bitcoin-gold"
      />
    </div>
    <button
      class="px-4 py-2 bg-bitcoin-gold text-background-dark rounded transition-colors hover:opacity-90"
      @click="apply"
    >
      Применить
    </button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

import type { CustomPeriodDTO } from '~/types';

const props = defineProps<{
  modelValue: CustomPeriodDTO;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: CustomPeriodDTO): void;
}>();

const fields = [
  { id: 'from', label: 'С', key: 'from' as const },
  { id: 'to', label: 'По', key: 'to' as const },
];

const values = reactive<CustomPeriodDTO>({
  from: props.modelValue.from,
  to: props.modelValue.to,
});

watch(
  () => props.modelValue,
  (v) => {
    values.from = v.from;
    values.to = v.to;
  }
);

function apply() {
  emit('update:modelValue', { from: values.from, to: values.to });
}
</script>
