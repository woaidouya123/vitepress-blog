<div class="game-container">
  <div class="op">
    <el-switch v-model="blackFirst" active-text="执黑" @change="refresh" />
    <el-switch v-model="robot" active-text="人机" active-value="white" :inactive-value="false" @change="refresh" />
    <el-button :icon="Refresh" @click="refresh" circle />
  </div>
  <go-bang :lines="15" :width="600" :height="600" :black-first="blackFirst" :robot="robot" :key="gameKey" />
</div>

<script lang="ts" setup>
import goBang from '../../view/gobang/index.vue';
import { ElButton, ElSwitch } from 'element-plus';
import {
  Refresh
} from '@element-plus/icons-vue';
import { ref } from "vue";
let gameKey = ref(0);
let blackFirst = ref(true);
let robot = ref("white");
const refresh = () => {
  gameKey.value++;
}
</script>
<style scoped>
  .game-container {
    text-align: center
  }
  .op {
    margin-bottom: 10px;
  }
  .op .el-switch, .op .el-button {
    margin-right: 20px;
    --el-switch-on-color: rgb(165 136 104);
    --el-color-primary: rgb(165 136 104);
    --el-button-text-color: rgb(165 136 104);
    --el-button-border-color: rgb(165 136 104);
    --el-button-hover-border-color: rgb(165 136 104);
    --el-button-hover-bg-color: rgba(165 136 104, .3);
  }
</style>
