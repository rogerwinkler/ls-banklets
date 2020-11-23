<template>
  <div class="mx-overline-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.mx-overline-wrapper {
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: $mx-primary;
  margin: 10px 0 10px 0;
}
</style>
