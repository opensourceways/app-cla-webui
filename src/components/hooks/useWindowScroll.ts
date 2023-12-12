import { onMounted, onUnmounted, ref } from 'vue';
import { isBrowser } from '@/shared/utils';

const useWindowSroll = () => {
  let top = NaN;

  if (isBrowser()) {
    top = document.documentElement.scrollTop || document.body.scrollTop;
  }

  const scrollTop = ref(top);
  const onScroll = () => {
    scrollTop.value =
      document.documentElement.scrollTop || document.body.scrollTop;
  };

  onMounted(() => {
    scrollTop.value =
      document.documentElement.scrollTop || document.body.scrollTop;

    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onScroll);
  });

  return scrollTop;
};

export default useWindowSroll;
