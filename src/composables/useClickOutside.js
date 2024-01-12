import { ref, onMounted, onUnmounted } from 'vue';
const useClickOutside = (element) => {
  const isClickOutside = ref(false);
  const onClick = (e) => {
    if (element.value) {
      isClickOutside.value = !element.value.contains(e.target);
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
