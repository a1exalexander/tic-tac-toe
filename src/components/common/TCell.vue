<template>
  <button class="cell" @click="$emit('click')">
    <transition
          :enter-active-class="`animate__animated ${value === 'cross' ? 'animate__rotateIn' : 'animate__bounceIn'} faster`"
          leave-active-class="animate__animated animate__fadeOut faster"
        >
      <component v-if="value" class="cell__icon" :class="value" :is="value" />
    </transition>
  </button>
</template>
<script>


export default {
  name: "TCell",
  props: {
    value: {
      type: String,
      default: null
    }
  }
};
</script>
<style lang="scss">
@import "~@/scss/vars";
$style: cell;
.#{$style} {
  outline: none;
  cursor: pointer;
  padding: 16px;
  border: 2px solid $main-color;
  background-color: $dark;
  transition: all 0.2s ease;
  @media screen and (min-width: 450px) {
    padding: 24px;
  }
  &__icon {
    fill: $main-color;
    &.cross {
      fill: $cross-color;
    }
    &.zero {
      fill: $zero-color;
    }
  }
}
</style>