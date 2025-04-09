import { defineStore } from "pinia";
import {ref} from "vue";

export const useIsMobileStore = defineStore(
    'isMobile',
    ()=> {
        const match = window.matchMedia('(max-width: 830px)');
        const isMobile = ref(match.matches);

        match.addEventListener('change', () => {
            isMobile.value = match.matches;
        })

        return { isMobile };
    },
    {
        persist: true,
    },
);
