import { defineStore } from 'pinia';
import { ref } from 'vue';
import {zzzGetAll, zzzUpdateAchievement} from '@/api/zzz';

export const useZzzAchievementStore = defineStore(
    'zzz-achievements',
    ()=> {
        const achievements = ref([]);
        const length = ref(0);
        const currentUser = ref(null);
        const isMale = ref(true);
        const isCompleteFirst = ref(false);

        // Get achievements for current user
        async function fetchAchievements() {
            // 强制更新，忽略本地数据
            try {
                const response = await zzzGetAll();
                achievements.value = response.achievements;
            } catch (error) {
                console.error('Fail to get achievements:', error);
                achievements.value = [];
            }

            // 更新用户信息用于比对
            currentUser.value = localStorage.getItem("user")

            // 储存条目数，做简单的验证
            length.value = achievements.value.length;
        }

        // Update achievement
        async function updateAchievements() {
            const user = localStorage.getItem('user');

            // 如果本地数据是空的或者有异常，获取新的数据
            if (achievements.value.length === 0 || achievements.value.length !== length.value) {
                await fetchAchievements();
            } else if (currentUser.value !== user) {
                // 如果用户变更，则立刻更新数据
                await fetchAchievements();
            }
        }

        async function completeAchievement(achievementId, complete) {
            await updateAchievements();

            const user = localStorage.getItem('user');

            // 获取本地的成就数据
            const target = achievements.value.find(item => item.achievement_id === achievementId);
            if (!target) { console.error('Fail to get achievements:', achievementId); return; }

            // 忽略未更改数据
            if (target.complete === complete) {
                return;
            }

            // 如果是本地用户，直接更新，否则更新后端数据库
            if (!user) {
                target.complete = complete;
            } else {
                // 尝试更新，如果更新失败，重新获取所有数据
                try {
                    const response = await zzzUpdateAchievement({ achievement_id: `${achievementId}`, complete: `${complete}` });
                    target.complete = complete;
                } catch (error) {
                    console.error('Fail to update achievements:', error);
                    await fetchAchievements();
                }
            }
        }

        return { achievements, isMale, isCompleteFirst, currentUser, length, fetchAchievements, updateAchievements, completeAchievement };
    },
    {
        persist: true,
    },
);
