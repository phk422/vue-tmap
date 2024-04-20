<template>
  <tmap-map :center="center" mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ">
    <tmap-heatmap :points="points" />
  </tmap-map>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      center: { lat: 30.514, lng: 104.079 },
      points: [
        {
          lng: 104.079,
          lat: 30.514,
          count: 3,
        },
      ],
    };
  },
});
</script>
