<template>
  <component
    v-if="dynamicComponent"
    :is="dynamicComponent"
    :code="code"
  ></component>
</template>

<script>
export default {
  props: ['code'],
  data() {
    return {
      dynamicComponent: null
    }
  },

  mounted() {
    import('./JsonComponent.vue').then((module) => {
      this.dynamicComponent = module.default
    })
  }
}
</script>

<style lang="scss" scoped></style>
