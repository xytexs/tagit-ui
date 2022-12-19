<template>
  <div>
    <NoteComponent :is-processing="isProcessing" @publish="createNote"></NoteComponent>
  </div>
</template>

<script>
import NoteComponent from "@/components/notes/NoteComponent";
import {createRecord} from "@/api/tegit";

export default {
  name: 'NoteCreatePage',
  components: {
    NoteComponent
  },
  props: ['layout'],
  data() {
    return {
      isProcessing: false,
    }
  },
  methods: {
    async createNote(note) {
      this.isProcessing = true

      const {data} = await createRecord({text: note.text, html: note.html})
      console.log(data)
      this.isProcessing = false
      this.$router.push(`/notes/${data.ID}`)
    }
  },
  created() {
  }
}
</script>
