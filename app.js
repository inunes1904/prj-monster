function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            gameIsRunning: false,
            logMessages: [],
            currentRound: 0,
            result: ''
        }
    },
  watch:{

      playerHealth(value){
        if(value <= 0 && this.monsterHealth<=0 ){
          this.result = 'DRAW';
        }else if(value<=0){
          this.result = 'LOSE';
        }
        },
      monsterHealth(value){
        if(value <= 0 && this.playerHealth<=0 ){
          this.result = 'DRAW';
        }else if(value<=0){
          this.result = 'WIN';
        }
      }

  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return {width: '0%'}
      }
      return {width: this.monsterHealth + '%'}
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return {width: '0%'}
      }
      return {width: this.playerHealth + '%'}
    },
    mayUseSpecialAttack(){
      console.log((this.currentRound % 3 !== 0) && (this.currentRound === 0));
      return (this.currentRound % 3 !== 0) || (this.currentRound === 0);
    },
    mayUseHeal(){
      return this.currentRound % 5 !== 0 || this.currentRound === 0;
    }
    },
    methods: {
      attackMonster() {
        const attackValue = getRandomValue(5, 12)
        if (this.monsterHealth - attackValue < 0){
          this.monsterHealth = 0;
        }else{
          this.monsterHealth -= attackValue;
        }
        this.addLogMessage('Player','Attack', attackValue);
        this.attackPlayer();
        this.currentRound++;
      },
      attackPlayer() {
        const attackValue = getRandomValue(8, 15);
        if (this.playerHealth - attackValue<0){
          this.playerHealth = 0;
        }else{
          this.playerHealth -= attackValue;
        }
        this.addLogMessage('Monster','Attack', attackValue);
      },
      specialAttackMonster(){
        const attackValue = getRandomValue(10,25);
        if (this.monsterHealth - attackValue < 0){
          this.monsterHealth = 0;
        }else{
          this.monsterHealth -= attackValue;
        }
        this.addLogMessage('Player','Special Attack', attackValue);
        this.attackPlayer();
        this.currentRound++;
      },
      healPlayer(){
        const healValue = getRandomValue(8,20);
        if (this.playerHealth + healValue > 100){
          this.playerHealth = 100;
        } else {
          this.playerHealth += healValue;
        }
        this.addLogMessage('Player','Healed', healValue);
        this.attackPlayer();
        this.currentRound++;
      },
      startGame(){
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.result = '';
        this.currentRound = 0;
      },
      surrender(){
        this.result = 'LOSE';
      },
      addLogMessage(whoDid, whatHappen, value){
        this.logMessages.unshift(
          {actionBy:whoDid, actionType:whatHappen, valueNumber:value}
        )
      }
    }
  });

app.mount('#game')
