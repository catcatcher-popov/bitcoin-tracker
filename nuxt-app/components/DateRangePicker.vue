<template>
  <div class="flex items-end space-x-4 mb-4">
    <div v-for="field in fields" :key="field.id" class="flex flex-col">
      <label :for="field.id" class="text-sm mb-1">{{ field.label }}</label>
      <input
        :id="field.id"
        v-model="values[field.key]"
        type="datetime-local"
        class="border rounded px-2 py-1"
      />
    </div>
    <button class="px-4 py-2 bg-green-600 text-white rounded" @click="apply">Применить</button>
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
