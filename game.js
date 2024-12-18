// game.js

class Game {
    constructor() {
        this.playerId = null;
        this.nickname = '';
        this.gameHistory = null;
        this.initializeGame();
    }

    // 初始化游戏
    initializeGame() {
        // 尝试从 localStorage 中恢复玩家数据
        const savedPlayerData = this.loadPlayerData();
        
        if (savedPlayerData) {
            // 如果有历史数据，恢复玩家信息
            this.playerId = savedPlayerData.playerId;
            this.nickname = savedPlayerData.nickname;
            this.gameHistory = savedPlayerData.gameHistory;
            console.log('恢复玩家数据:', savedPlayerData);
        } else {
            // 如果没有历史数据，初始化新的玩家
            this.playerId = this.generatePlayerId();
            this.nickname = '玩家_' + this.playerId;
            this.gameHistory = [];
            console.log('新玩家创建:', this.playerId, this.nickname);
        }

        // 渲染玩家信息到页面
        this.renderPlayerInfo();
    }

    // 加载玩家数据（从 localStorage）
    loadPlayerData() {
        const data = localStorage.getItem('playerData');
        return data ? JSON.parse(data) : null;
    }

    // 保存玩家数据到 localStorage
    savePlayerData() {
        const playerData = {
            playerId: this.playerId,
            nickname: this.nickname,
            gameHistory: this.gameHistory
        };
        localStorage.setItem('playerData', JSON.stringify(playerData));
        console.log('玩家数据已保存');
    }

    // 生成唯一的玩家ID
    generatePlayerId() {
        return Date.now() + Math.floor(Math.random() * 1000);  // 使用时间戳和随机数生成ID
    }

    // 更新玩家昵称
    updateNickname(newNickname) {
        this.nickname = newNickname;
        this.savePlayerData();  // 每次更新后保存数据
    }

    // 更新游戏历史
    updateGameHistory(newHistory) {
        this.gameHistory.push(newHistory);
        this.savePlayerData();  // 每次更新游戏历史后保存数据
    }

    // 渲染玩家信息
    renderPlayerInfo() {
        // 假设页面上有一个显示玩家信息的区域
        const playerInfoElement = document.getElementById('playerInfo');
        if (playerInfoElement) {
            playerInfoElement.innerHTML = `
                <p>玩家ID: ${this.playerId}</p>
                <p>昵称: ${this.nickname}</p>
                <p>游戏历史: ${JSON.stringify(this.gameHistory)}</p>
            `;
        }
    }

    // 启动游戏
    startGame() {
        console.log('游戏开始！');
        // 在这里初始化游戏逻辑
    }
}

// 初始化游戏
const game = new Game();

// 示例：更新玩家昵称和游戏历史
document.getElementById('updateNicknameBtn').addEventListener('click', () => {
    const newNickname = prompt('请输入新昵称:');
    game.updateNickname(newNickname);
});

document.getElementById('updateGameHistoryBtn').addEventListener('click', () => {
    const newHistory = prompt('请输入新的游戏历史记录:');
    game.updateGameHistory(newHistory);
});
