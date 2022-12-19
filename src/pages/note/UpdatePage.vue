<template>
  <div>
    <NoteComponent
        @publish="updateNote"
        :is-processing="isProcessing"/>
  </div>
</template>

<script>
import NoteComponent from "@/components/notes/NoteComponent";


export default {
  name: 'ArticleUpdatePage',
  components: {
    NoteComponent
  },
  data() {
    return {
      isProcessing: false
    }
  },

  methods: {
    async updateNote(data) {
      this.isProcessing = true
      return new Promise((resolve) => setTimeout(() => {
        console.log(data)
        this.isProcessing = false
        return resolve()
      }, 5000));
    }
  },
  created() {
  }
}
</script>
