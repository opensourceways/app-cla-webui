<template>
  <Button
    :loading="dataDisable"
    :style="customStyle"
    :class="buttonClass"
    @click="submit()"
  >
    {{ text }}
  </Button>
</template>

<script>
import { Button } from 'element-ui';

export default {
  name: 'HttpButton',
  components: {
    Button,
  },
  props: {
    text: {
      type: String,
      default: 'button',
    },
    buttonDisable: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '9rem',
    },
    height: {
      type: String,
      default: '4rem',
    },
    borderRadius: {
      type: String,
      default: '2rem',
    },
  },
  watch: {
    buttonDisable(newValue) {
      this.dataDisable = newValue;
    },
  },
  data() {
    return {
      buttonWidth: this.width,
      dataDisable: this.buttonDisable,
      buttonClass: 'loginButton',
      customStyle: {
        width: this.width,
        height: this.height,
        borderRadius: this.height,
      },
    };
  },
  methods: {
    submit() {
      this.$emit('httpSubmit');
    },
  },
};
</script>

<style scoped>
@import '../assets/font/css/Roboto-Light.css';

.loginButton {
  font-family: Roboto-Light, sans-serif;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  background: linear-gradient(to right, #97db30, #319e55);
}

.loginButton:focus {
  outline: none;
}

.el-button.is-disabled {
  cursor: default;
  background-color: #b3e19d;
  color: white;
}
</style>
