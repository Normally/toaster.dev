<template>
  <div>
    <div class="flex-row holder">
      <div class="flex-col ">
        <div class="filename">
          <div
            class="tab"
            @click="showSampleCode(false)"
            :class="{ active: !this.viewSample }"
          >
            Request body editor
          </div>
          <div
            class="tab"
            @click="showSampleCode(true)"
            :class="{ active: viewSample }"
          >
            Sample code
            <select v-if="viewSample" v-model="view">
              <option value="axios">axios</option>
              <option value="request">request</option>
              <option value="jquery">jQuery</option>
              <option value="got">got</option>
              <option value="superagent">superagent</option>
              <option value="cURL">cURL</option>
            </select>
          </div>
        </div>
        <div class="relative">
          <codemirror
            class="code"
            v-model="viewSample ? example : liveCode"
            :options="editorOption"
            ref="myEditor"
          ></codemirror>
          <button class="send" @click="send">Run</button>
          <div v-if="error" class="error">{{ error }}</div>
        </div>
      </div>
      <div class="flex-col">
        <div class="filename response">
          Response <span v-if="loading">↻</span>
        </div>
        <div>
          <code class="code">{{ result }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/javascript/javascript')
import 'codemirror/theme/material.css'
const stringifyObject = require('stringify-object')

import axios from 'axios'
import jsonrepair from 'jsonrepair'
const beautify = require('js-beautify').js
import examples from './examples.js'

export default {
  components: {
    codemirror
  },
  props: ['code'],
  data() {
    return {
      // mirror:
      liveCode: '',
      error: null,
      view: 'axios',
      viewSample: false,
      result: null,
      editorOption: {
        theme: 'material',
        lineWrapping: true
      },
      examples,
      loading: true
    }
  },
  methods: {
    showSampleCode(value) {
      try {
        let repaired = JSON.parse(jsonrepair(this.liveCode))
        this.error = false
        this.viewSample = value
        this.editor.setOption('readOnly', value ? true : false)
      } catch (error) {
        this.error = error.message
        this.viewSample = false
        return
      }
    },
    async send() {
      this.error = ''
      let repaired = ''
      try {
        repaired = jsonrepair(this.liveCode)
      } catch (error) {
        this.error = error.message
        return
      }

      try {
        repaired = JSON.parse(repaired)
      } catch (error) {
        this.error = error.message
        return
      }
      let enpoint = 'https://api.toaster.dev'
      this.loading = true
      let result = await axios.post(enpoint, repaired)
      this.loading = false
      this.result = result.data
    },
    resize() {
      if (window.innerWidth <= 960) {
        this.editor.setSize(null, 200)
      } else {
        this.editor.setSize(null, 320)
      }
    }
  },
  computed: {
    dev() {
      return process.env.NODE_ENV === 'development'
    },
    example() {
      let clean = JSON.parse(jsonrepair(this.liveCode))
      let pretty = stringifyObject(clean, {
        indent: '  ',
        singleQuotes: false
      })
      if (this.view !== 'cURL') {
        return beautify(this.examples[this.view](pretty), {
          indent_size: 2,
          space_in_empty_paren: true
        })
      } else {
        return this.examples[this.view](JSON.stringify(clean))
      }
    },
    editor() {
      return this.$refs.myEditor.editor
    }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  created() {
    this.liveCode = this.code
    this.send()
  }
}
</script>
<style scoped>
.flex-row {
  display: flex;
  width: 100%;
}
.flex-col {
  flex: 1;
  width: 50%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
}

.relative {
  position: relative;
}
* {
  box-sizing: border-box;
}
.holder {
  /* border-radius: 4px; */
  overflow: hidden;
  /* box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1); */
}
.filename {
  background: #263238;
  font-size: 0.85em;
  line-height: 40px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  width: 100%;
  overflow: hidden;
  user-select: none;
}
.filename .tab {
  position: relative;
  width: 50%;
  padding-left: 20px;
  cursor: pointer;
  background: #3d4f5a;
}
.filename .tab.active {
  background: #263238;
}

.tab select {
  position: absolute;
  outline: 0;
  appearance: none;
  color: #ccc;
  background: none;
  border: 1px solid #ccc;
  cursor: pointer;
  right: 10px;
  top: 10px;
  padding: 2px 5px;
  /* border-radius: 4px; */
  display: inline-block;
  text-align: right;
  font-size: 1em;
}
.tab select:hover {
  background: rgba(255, 255, 255, 0.1);
}

code {
  display: block;
  padding: 20px;
  width: 100%;
  height: 320px;
  white-space: pre;
  overflow: scroll;
  font-size: 0.85em;
  line-height: 150%;
  border-radius: 0;
  background: #f1f2f2;
}
.filename.response {
  background: #f1f2f2;
  /* border-radius: 0 8px 0 0; */
  color: rgba(0, 0, 0, 0.5);
  padding-left: 20px;
  display: block;
}
.filename.response span {
  float: right;
  margin-right: 20px;
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
button.send {
  flex: none;
  position: absolute;
  bottom: 5px;
  width: 70px;
  right: 5px;
  appearance: none;
  background: lightblue;
  padding: 10px;
  color: #000;
  font-weight: 600;
  border: 0;
  cursor: pointer;
  z-index: 10;
  font-size: 0.8em;
}
.error {
  position: absolute;
  font-size: 0.8em;
  bottom: 5px;
  left: 5px;
  flex: none;
  background: rgba(255, 0, 0, 0.2);
  color: red;
  width: calc(100% - 85px);
  padding: 10px;
  /* line-height: 40px; */
}
@media only screen and (max-width: 960px) {
  .flex-row {
    display: block;
    width: 100vw;
  }
  .flex-col {
    width: 100%;
  }
  code {
    height: 200px;
  }
}
@media (max-width: 959px) {
  .flex-row {
    margin-left: -2rem;
  }
}
@media (max-width: 419px) {
  .flex-row {
    margin-left: -1.5rem;
  }
}
</style>
<style>
.CodeMirror {
  font-size: 0.85em;
  line-height: 150%;
}
.CodeMirror-lines {
  padding: 20px;
}
</style>
