<template>
  <section class="container">
    <div class="quill-editor"
         :content="content"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption"
         ref="myQuillEditor"
         >
    </div>
  </section>
</template>

<script>
// import { container } from 'quill-image-extend-module';
// import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module';

export default {
  data() {
    return {
      content: '',
      // editorOption: {
      //   theme: 'snow',
      //   modules: {
      //     toolbar: [
      //       ['bold', 'italic', 'underline', 'strike'],
      //       ['blockquote', 'code-block'],
      //       [{ header: 1 }, { header: 2 }],
      //       [{ list: 'ordered' }, { list: 'bullet' }],
      //       [{ script: 'sub' }, { script: 'super' }],
      //       [{ indent: '-1' }, { indent: '+1' }],
      //       [{ direction: 'rtl' }],
      //       [{ size: ['small', false, 'large', 'huge'] }],
      //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
      //       [{ font: [] }],
      //       [{ color: [] }, { background: [] }],
      //       [{ align: [] }],
      //       ['clean']
      //     ]
      //   }
      // }
      editorOption: {
        // placeholder: '',
        // theme: 'snow',
        // modules: {
        //   ImageExtend: {
        //     loading: true,
        //     name: 'img',
        //     // action: updateUrl,
        //     response: res => {
        //       return res.info;
        //     }
        //   },
        //   imageResize: true
        // },
        // toolbar: {
        //   container: container,
        //   handlers: {
        //     image: function() {
        //       // let image = QuillWatch.emit(this.$refs.myQuillEditor);
        //       console.log(image, 'wwwwwwwwwwwwww');
        //     }
        //   }
        // }
      }
    };
  },
  // beforeMount() {
  //   const {
  //     container,
  //     ImageExtend,
  //     QuillWatch
  //   } = require('quill-image-extend-module');
  //   this.editorOption = {
  //     // some quill options
  //     modules: {
  //       ImageExtend: {
  //         name: 'img',
  //         size: 3,
  //         action: '',
  //         response: res => {
  //           return res.info;
  //         },
  //         headers: xhr => {},
  //         sizeError: () => {},
  //         start: () => {
  //           console.log(" .................");
  //         },
  //         end: () => {},
  //         error: () => {},
  //         success: () => {},
  //         change: (xhr, formData) => {
  //           console.log('Image added');
  //         }
  //       },
  //       toolbar: {
  //         container,
  //         handlers: {
  //           image: function() {
  //             QuillWatch.emit(this.quill.id);
  //           }
  //         }
  //       }
  //     }
  //   };
  // },
  methods: {
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    onEditorChange({ editor, html, text }) {
      this.content = html;
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
  width: 100%
  margin: 0 auto
  padding: 0

  .quill-editor
    min-height: 200px
    max-height: 400px
    overflow-y: auto
</style>
