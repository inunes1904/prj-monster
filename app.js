function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            gameIsRunning: false,
            turns: [],
            currentRound: 0
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
    }
    },
    methods: {
      attackMonster() {
        const attackValue = getRandomValue(5, 12);
        this.monsterHealth -= attackValue;
        this.turns.unshift({
          isPlayer: true,
          text: 'Player hits Monster for ' + attackValue
        });
        this.attackPlayer();
        this.currentRound++;
      },
      attackPlayer() {
        const attackValue = getRandomValue(8, 15);
        this.playerHealth -= attackValue;
        this.turns.unshift({
          isPlayer: false,
          text: 'Monster hits Player for ' + attackValue
        });
      },
      specialAttackMonster(){
        const attackValue = getRandomValue(10,25);
        this.monsterHealth -= attackValue;
        this.turns.unshift({
          isPlayer: true,
          text: 'Player hits Monster hard for ' + attackValue
        });
        this.attackPlayer();
        this.currentRound++;
      }
    }
  });

app.mount('#game')
