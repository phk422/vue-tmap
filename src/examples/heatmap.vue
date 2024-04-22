<template>
  <tmap-map :center="center" mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ">
    <tmap-heatmap :points="points" :gradient-color="gradientColor" />
  </tmap-map>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      center: { lat: 30.514, lng: 104.079 },
      gradientColor: {
        0.5: '#0000ff',
        0.65: 'rgb(117,211,248)',
        0.7: 'rgb(0, 255, 0)',
        0.9: '#ffea00',
        1.0: '#ff0000',
      },
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
