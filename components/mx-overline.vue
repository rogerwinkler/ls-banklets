<template>
  <div class="ls-overline-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.ls-overline-wrapper {
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: $ls-primary;
  margin: 10px 0 10px 0;
}
</style>
