<template>
  <span class="ai-reveal-text"><template v-if="!animate">{{ text }}</template><template v-else><span v-for="(letter, index) in letters" :key="`${epoch}-${index}`" class="ai-reveal-letter" :style="{ animationDelay: streaming ? '0ms' : `${revealDelays[index] - offset}ms` }">{{ letter }}</span></template></span>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { textDelays, splitCharacters } from './text-cadence.js'
const props = defineProps({ text: { type: String, default: '' }, streaming: Boolean, startedAt: { type: Number, default: 0 }, animate: { type: Boolean, default: true } })
const letters = computed(() => splitCharacters(props.text || ''))
// 整段返回与逐字追加使用同一段输出节奏，避免固定卡在标点处。
const revealDelays = computed(() => textDelays(props.text))
const offset = ref(0)
const epoch = ref(0)
let localStartedAt = Date.now()
// 回到页面时抵扣后台时间，浏览器即使暂停过 CSS 动画也不会从旧位置补播。
function syncClock() {
  if (props.streaming || document.hidden) return
  offset.value = Date.now() - (props.startedAt || localStartedAt)
  epoch.value++
}
watch(() => [props.text, props.startedAt], () => {
  localStartedAt = Date.now()
  syncClock()
}, { immediate: true })
onMounted(() => {
  document.addEventListener('visibilitychange', syncClock)
  window.addEventListener('focus', syncClock)
})
onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', syncClock)
  window.removeEventListener('focus', syncClock)
})
</script>

<style scoped>
.ai-reveal-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.ai-reveal-letter { opacity: 0; animation: ai-letter-in 1s linear forwards; }
@keyframes ai-letter-in {
  0% { opacity: .025; }
  20% { opacity: .08; }
  55% { opacity: .4; }
  100% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) { .ai-reveal-letter { animation: none; opacity: 1; } }
</style>
