<template>
  <div class="note-view">
    <div class="editor" v-html="html">
    </div>
    <div class="note-view__tags">
      <span class="tag" v-for="(tag, key) in tags" :key="key">#{{ tag }}</span>
    </div>
  </div>

</template>

<script>
import {getRecordByID} from "@/api/tegit";

export default {
  name: 'NoteViewPage',
  data() {
    return {
      html: '',
      tags: [],
    }
  },
  async mounted() {
    console.log(this.$route.params.id)

    const {data} = await getRecordByID(this.$route.params.id)

    this.html = data.Html
    this.tags = data.Tags
  }
}
</script>

<style scoped lang="scss">
.note-view {
  margin-top: 50px;
  &__tags {
    margin-top: 25px;
  }
}
</style>
