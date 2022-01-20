import Vue from "vue";

// Reusable
import AddButton from "@/components/Reusable/AddButton";
import KaAppEmpty from "@/components/Reusable/AppEmpty";
import KaAppLoader from "@/components/Reusable/AppLoader";
import KaButton from "@/components/Reusable/Button";
import KaIcon from "@/components/Reusable/Icon";
import KaInput from "@/components/Reusable/Input";
import KaModal from "@/components/Reusable/Modal";
import KaPopup from "@/components/Reusable/Popup";
import KaSelect from "@/components/Reusable/Select";
import KaTextarea from "@/components/Reusable/Textarea";

const Components = {
  // Reusable
  AddButton,
  KaAppEmpty,
  KaAppLoader,
  KaButton,
  KaIcon,
  KaInput,
  KaModal,
  KaPopup,
  KaSelect,
  KaTextarea,
};

Object.keys(Components).forEach((key) => {
  Vue.component(key, Components[key]);
});
