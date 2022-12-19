<template>
  <div class="note-list">
    <note-list-item
        v-for="(item, key) in items"
        :key="key"
        :id="item.id"
        :heading="item.heading"
        :body="item.excerpt"
        :tags="item.tags"
    />
  </div>
</template>

<script>
import {getRecords} from "@/api/tegit";
import NoteListItem from "@/components/notes/NoteListItem";

export default {
  name: 'NoteListPage',
  components: {NoteListItem},
  data() {
    return {
      items: []
    }
  },
  async mounted() {
    const {data} = await getRecords()
    console.log(data)

    this.items = data.map(item => {
      return {
        id: item.ID,
        heading: '',
        excerpt: item.Text,
        tags: item.Tags,
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.note-list {
  margin-top: 50px;
}
</style>
