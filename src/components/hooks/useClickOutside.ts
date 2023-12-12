import { ref, onMounted, onUnmounted, Ref } from 'vue';
const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false);
  const onClick = (e: MouseEvent) => {
    if (elementRef.value) {
      isClickOutside.value = !elementRef.value.contains(
        e.target as HTMLElement
      );
    }
  };
  onMounted(() => {
    window.addEventListener('click', onClick);
  });
  onUnmounted(() => {
    window.removeEventListener('click', onClick);
  });
  return isClickOutside;
};

export default useClickOutside;
