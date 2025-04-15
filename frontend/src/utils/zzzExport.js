import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import {useZzzAchievementStore} from "@/stores/zzzAchievementsStore";
import {showError} from "@/utils/notification";

export const zzzExport = async () => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('ZZZ Achievements');

        // 表头
        const columns = [
            {header: '成就ID', key: 'achievement_id', width: 15},
            {header: '类别', key: 'class_id', width: 10},
            {header: '名称', key: 'name', width: 20},
            {header: '描述', key: 'description', width: 40},
            {header: '奖励等级', key: 'reward_level', width: 15},
            {header: '是否隐藏', key: 'hidden', width: 10},
            {header: '版本', key: 'game_version', width: 12},
            {header: '状态', key: 'complete', width: 10}
        ];

        worksheet.columns = columns;

        // 获取数据
        const achievementStore = useZzzAchievementStore();
        const json_data = achievementStore.achievements

        // 添加数据行
        json_data.forEach(item => {
            worksheet.addRow(item);
        });

        // 创建 blob 并下载
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        saveAs(blob, '绝区零成就表格.xlsx');
    } catch (error) {
        console.error(error);
        showError('成就表格导出失败')
    }
}