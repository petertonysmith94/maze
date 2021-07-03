<template>


</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MazeEntry from '@/components/MazeEntry.vue';

@Component({
  components: {
    MazeEntry
  }
})
export default class GridComponent extends Vue {
  @Prop()
  private grid!: Grid;
}
</script>
