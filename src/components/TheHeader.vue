<template>
  <header class="header">
    <h1 class="header__title">Tic Tac Toe</h1>
    <div class="header__row">
      <a class='header__link' href="https://merge.rocks/" target="_blank"><icon-merge class="header__icon" /></a>
      <a class='header__link' href="https://beetroot.academy/" target="_blank"><icon-beetroot-academy class="header__icon" /></a>
    </div>
  </header>
</template>
<script>
import IconMerge from "./icons/IconMerge";
import IconBeetrootAcademy from "./icons/IconBeetrootAcademy";

export default {
  name: 'TheHeader',
  components: {
    IconMerge,
    IconBeetrootAcademy
  }
}
</script>
<style lang="scss">
@import '~@/scss/vars';
.header {
  &__title {
    margin-bottom: 32px;
    color: $main-color;
    @media screen and (min-width: 450px) {
      font-size: 44px;
    }
  }
  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__icon {
    width: auto;
    height: 32px;
    @media screen and (min-width: 450px) {
      height: 40px;
    }
  }
  &__link {
    &:not(:last-of-type) {
      margin-right: 24px;
    }
  }
}
</style>