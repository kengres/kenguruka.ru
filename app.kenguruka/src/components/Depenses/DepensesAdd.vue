<template>
  <div class="depenses-add">
    <div class="depenses-add__item">
      <my-input v-model="form.title" />
    </div>
    <div class="depenses-add__item">
      <my-input type="number" v-model="form.price" />
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/Reusable/Input";
import LF from "localforage";
export default {
  name: "DepensesAdd",
  components: {
    MyInput
  },
  data() {
    return {
      form: {
        title: "",
        price: 0
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(`title: `, this.form);
      let arr = [];
      LF.getItem("depenses").then(val => {
        console.log(`depenses: `, val);
        if (val) arr = val;
        const newItem = {
          ...this.form,
          id: Date.now(),
          price: +this.form.price,
          createdAt: new Date().toISOString()
        };
        arr.unshift(newItem);
        LF.setItem("depenses", arr).then(() => {
          console.log(`success`);
          this.$emit("close");
        });
      });
    }
  }
};
</script>

<style lang="scss">
.depenses-add {
  position: relative;
  &__item {
    margin-bottom: 1rem;
  }
}
</style>
