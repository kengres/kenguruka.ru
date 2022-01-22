import Vue from 'vue'

import { formatGraphqlError } from "../utils/filters";

const Filters = {
  formatGraphqlError,
};

Object.keys(Filters).forEach((key) => {
  Vue.filter(key, Filters[key]);
});
