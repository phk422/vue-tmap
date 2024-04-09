<template>
  <tmap-map :zoom="9" mapKey="TOZBZ-OU2CX-JJP4Z-7FCBV-CDDJ2-AHFQZ">
    <tmap-marker-cluster
      :id="id"
      :enableDefaultStyle="false"
      :minimumClusterSize="minimumClusterSize"
      :geometries="geometries"
      :zoomOnClick="zoomOnClick"
      :gridSize="gridSize"
      :averageCenter="averageCenter"
      :maxZoom="maxZoom"
    >
      <template #cluster="{ content }">
        <div class="cluster">{{ content }}</div>
      </template>
      <template #marker="{ extData }">
        <div class="marker">{{ getExtData(extData) }}</div>
      </template>
    </tmap-marker-cluster>
  </tmap-map>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'marker-cluster-style-demo',
  data() {
    const geometries = [
      {
        position: { lat: 39.953416, lng: 116.480945 },
        foo: {
          name: 'coder',
          age: 18,
        },
      },
      {
        position: { lat: 39.984104, lng: 116.407503 },
      },
      {
        position: { lat: 39.908802, lng: 116.497502 },
      },
      {
        position: { lat: 40.040417, lng: 116.373514 },
      },
      {
        position: { lat: 39.953416, lng: 116.380945 },
      },
      {
        position: { lat: 39.984104, lng: 116.307503 },
      },
      {
        position: { lat: 39.908802, lng: 116.397502 },
      },
      {
        position: { lat: 40.040417, lng: 116.273514 },
      },
    ];
    return {
      id: 'cluster',
      minimumClusterSize: 2, // 形成聚合簇的最小个数
      geometries,
      zoomOnClick: true, // 点击簇时放大至簇内点分离
      gridSize: 60, // 聚合算法的可聚合距离
      averageCenter: false, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
      maxZoom: 20, // 采用聚合策略的最大缩放级别,
      // markerStyle: {
      //   width: 19,
      //   height: 32,
      //   anchor: {
      //     x: 9.5,
      //     y: 16,
      //   },
      //   src: 'https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png',
      // }, // marker参数

      getExtData(extData: any) {
        console.log(extData, 'extData');
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.color {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
}
.green {
  width: 40px;
  height: 40px;
  background: #00ff00;
  cursor: pointer;
}
.blue {
  width: 40px;
  height: 40px;
  background: #00ffff;
  cursor: pointer;
}

.cluster {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  text-align: center;
  background: #00f;
  color: #fff;
}
.marker {
  background-image: url('https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png');
  background-size: contain;
  width: 19px;
  height: 32px;
  position: relative;
  top: -16px;
}
</style>
