<template>

  <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 200 }"
      v-if="editor"
  >
    <div class="editor__bubble-menu">
      <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
      >
        <FontAwesomeIcon icon="fa-solid fa-bold"/>
      </button>
      <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
      >
        <FontAwesomeIcon icon="fa-solid fa-italic"/>
      </button>
      <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
      >
        <FontAwesomeIcon icon="fa-solid fa-strikethrough"/>
      </button>
      <button
          v-show="!isTitle"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        <FontAwesomeIcon icon="fa-solid fa-heading"/>
      </button>
      <button
          v-if="!isTitle"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        <FontAwesomeIcon size="xs" icon="fa-solid fa-heading"/>
      </button>
      <button
          v-if="!isTitle"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <FontAwesomeIcon icon="fa-solid  fa-list-ul"/>
      </button>
      <!--      <button-->
      <!--          v-show="!isTitle"-->
      <!--          @click="notes.chain().focus().toggleLink().run()"-->
      <!--          :class="{ 'is-active': notes.isActive('link') }"-->
      <!--      >-->
      <!--        <FontAwesomeIcon icon="fa-solid  fa-link"/>-->
      <!--      </button>-->
    </div>
  </bubble-menu>

  <!--  <floating-menu-->
  <!--      :notes="notes"-->
  <!--      :tippy-options="{ duration: 100, placement: 'left-start'}" v-if="notes"-->
  <!--  >-->
  <!--    <div class="editor__floating-menu">-->
  <!--      <button @click="notes.chain().focus().toggleBulletList().run()"-->
  <!--              :class="{ 'is-active': notes.isActive('bulletList') }">-->
  <!--        Bullet List-->
  <!--      </button>-->
  <!--    </div>-->
  <!--  </floating-menu>-->

  <div class="editor">
    <editor-content :contenteditable="false" :editor="editor"/>
  </div>
</template>

<script>
import Document from '@tiptap/extension-document'
import LinkExt from '@tiptap/extension-link'
import PlaceHolder from '@tiptap/extension-placeholder'
import {
  Editor,
  EditorContent,
  // FloatingMenu,
  BubbleMenu
} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import FloatingMenuExt from '@tiptap/extension-floating-menu'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faItalic, faBold, faStrikethrough, faHeading, faListUl, faLink} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(
    faListUl,
    faLink,
    faHeading,
    faStrikethrough,
    faBold,
    faItalic
)


const CustomDocument = Document.extend({
  content: 'heading block*',
})

export default {
  name: 'Editor-Component',
  components: {
    EditorContent,
    // FloatingMenu,
    BubbleMenu,
    FontAwesomeIcon,
  },

  props: ['modelValue', 'editable'],
  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    }
  },
  methods: {
    mock() {
      return true
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.modelValue.html,
      extensions: [
        CustomDocument,
        PlaceHolder.configure({
          placeholder: ({node}) => {
            if (node.type.name === 'heading') {
              return 'What’s the title?'
            }

            return 'Can you add some further context?'
          },
        }),
        StarterKit.configure({
          document: false
        }),
        FloatingMenuExt,
        LinkExt.configure({
          autolink: true,
          openOnClick: true,
          linkOnPaste: true
        })
      ],
      onUpdate: ({editor}) => {
        this.$emit('update:modelValue', {
          html: editor.getHTML(),
          json: editor.getJSON(),
          text: editor.getText()
        })
      },
    })

    this.editor.commands.focus('end')
  },

  computed: {
    isTitle() {
      return this.editor.state.selection.$head.parent.type.name === 'heading' &&
          this.editor.state.selection.$head.parent.type.defaultAttrs.level === 1
    }
  },

  beforeUnmount() {
    this.editor.destroy()
  },

  watch: {
    editable(isEditable) {
      this.editor.setEditable(isEditable);

      if (isEditable) {
        this.editor.commands.focus('end')
      }
    }
  }
}

</script>

<style lang="scss">
.ProseMirror {
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }
}

.editor {
  .is-empty::before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
  }

  & > div {
    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: none;
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }

  font-family: "Times New Roman", serif;

  h1 {
    font-style: normal;
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: 0;
    font-size: 56px;

    & + p {
      margin-top: 6px;
    }
  }

  h3 {
    font-family: medium-content-sans-serif-font, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -.015em;
    margin-top: 56px;

    & + p {
      margin-top: 8px;
    }

    & + ul {
      margin-top: 12px;
    }
  }

  h4 {
    font-weight: 700;
    font-style: normal;
    font-size: 26px;
    line-height: 1.22;
    letter-spacing: -.012em;
    margin-top: 30px;
    font-family: medium-content-sans-serif-font, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;;

    & + p {
      margin-top: 4px;
    }

    & + ul {
      margin-top: 10px;
    }
  }

  p {
    margin-top: 29px;
    font-size: 21px;
    font-weight: 400;
    font-style: normal;
    line-height: 1.58;
    letter-spacing: -.003em;
  }

  ul {
    margin-top: 29px;
    padding: 0;
    list-style: none;

    li {
      font-weight: 400;
      font-style: normal;
      font-size: 21px;
      line-height: 1.58;
      letter-spacing: -.003em;
      margin-left: 30px;
      margin-bottom: 14px;

      p {
        margin: 0;
      }

      &:before {
        padding-top: 4px;
        padding-right: 15px;
        content: '\2022';
        font-size: 16.8px;
        position: absolute;
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 78px;
        margin-left: -78px;
        text-align: right;
      }
    }
  }

  a {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }

  &__floating-menu {
    background: white;
    padding: 5px 15px;
    border: 1px solid black;
    border-radius: 5px;

    button {
      margin-right: 15px;
      font-size: 19px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__bubble-menu {
    background: white;

    border: 1px solid black;
    border-radius: 5px;

    button {
      padding: 5px 15px;
      //margin-right: 15px;
      font-size: 19px;

      &:last-child {
        margin-right: 0;
      }

      &.is-active {
        background: black;
        color: white;
      }
    }
  }
}
</style>
