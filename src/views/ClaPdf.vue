<template>
  <el-row id="cla_pdf">
    <VuePdfEmbed
      class="pdfPage margin-bottom-1rem"
      ref="pdf"
      v-for="i in numPages"
      :key="i"
      :source="claText"
      :page="i"
    ></VuePdfEmbed>
  </el-row>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';
import http from '../util/_axios';
import * as url from '../util/api';
import * as util from '../util/util';
import pdfjsLib from 'pdfjs-dist';

export default {
  name: 'ClaPdf',
  components: {
    VuePdfEmbed
  },
  data() {
    return {
      claText: '',
      numPages: 10
    };
  },
  computed: {
    apply_to() {
      if (this.$store.state.loginType === 'corporation') {
        return this.$store.state.loginType;
      }
      return 'individual';
    },
    claTextUrl() {
      return this.$store.state.domain;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      window.addEventListener(
        'message',
        (event) => {
          if (event.data) {
            this.setClaText(event.data);
          }
        },
        false
      );
    },
    async getNumPages(url) {
      const doc = await VuePdfEmbed.getDocument(url).promise;
      this.numPages = doc.numPages;
      // let loadingTask = pdf.createLoadingTask(url);
      // loadingTask.promise
      //   .then((pdf) => {
      //     this.numPages = pdf.numPages;
      //   })
      //   .catch((err) => {
      //     return 'pdf 加载失败';
      //   });
      // const loadingTask = pdfjsLib.getDocument(url);
      // loadingTask.promise
      //   .then((pdf) => {
      //     console.log(pdf);
      //     this.numPages = pdf.numPages;
      //   })
      //   .catch((err) => {
      //     return 'pdf 加载失败';
      //   });
    },
    setClaText(obj) {
      let dataFromParent = obj;
      if (dataFromParent.pdfData && dataFromParent.pdfData.length) {
        for (let i = 0; i < dataFromParent.pdfData.length; i++) {
          if (
            Object.prototype.hasOwnProperty.call(
              dataFromParent.pdfData[i],
              dataFromParent.lang
            )
          ) {
            this.claText && window.URL.revokeObjectURL(this.claText);
            this.claText = window.URL.createObjectURL(
              dataFromParent.pdfData[i][dataFromParent.lang]
            );
            this.getNumPages(this.claText);
            return;
          }
        }
      }
      if (!Object.prototype.hasOwnProperty.call(dataFromParent, 'pdfData')) {
        return;
      }
      http({
        url: `${url.getCLAPdf}/${
          dataFromParent.link_id
        }/${sessionStorage.getItem('cla_id')}`,
        responseType: 'blob'
      })
        .then((res) => {
          if (res && res.data) {
            let blob = new Blob([res.data], { type: 'application/pdf' });
            let data = dataFromParent.pdfData;
            data.push({ [dataFromParent.lang]: blob });
            window.parent.postMessage(data, this.claTextUrl);
            window.URL.revokeObjectURL(this.claText);
            this.claText = window.URL.createObjectURL(blob);
            this.getNumPages(this.claText);
          }
        })
        .catch((err) => {
          util.catchErr(err, 'errorSet', this);
        });
    }
  },
  mounted() {
    console.log('mounted');
  }
};
</script>

<style scoped lang="less">
#cla_pdf > span:not(:last-of-type) {
  box-shadow: 0 0 20px 10px #f3f3f3;
  border-radius: 1rem;
  overflow: hidden;
}
</style>
