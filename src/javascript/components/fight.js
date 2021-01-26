import {
  controls
} from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const stateFirst = {
      fighter: firstFighter,
      currentHealth: firstFighter.health,
      healthBar: document.querySelector('#left-fighter-indicator'),
      critical: false
    };
    const stateSecond = {
      fighter: secondFighter,
      currentHealth: secondFighter.health,
      healthBar: document.querySelector('#right-fighter-indicator'),
      critical: false
    }
    let pressed = new Set();

    document.addEventListener('keydown', (e) => {

      pressed.add(e.code);

      if (e.code === controls.PlayerOneAttack) {
        if (!pressed.has(controls.PlayerOneBlock) && !pressed.has(controls.PlayerTwoBlock)) {
          stateSecond.currentHealth -= firstFighter.attack;
          changeHealthBar(stateSecond);
        }
        if (pressed.has(controls.PlayerTwoBlock)) {
          const damage = getDamage(firstFighter, secondFighter);
          if (damage) {
            stateFirst.currentHealth -= damage;
            changeHealthBar(stateSecond);
          }
        }
      }
      if (e.code === controls.PlayerTwoAttack) {
        if (!pressed.has(controls.PlayerOneBlock) && !pressed.has(controls.PlayerTwoBlock)) {
          stateFirst.currentHealth -= secondFighter.attack;
          changeHealthBar(stateFirst);
        }
        if (pressed.has(controls.PlayerOneBlock)) {
          const damage = getDamage(secondFighter, firstFighter);
          if (damage) {
            stateSecond.currentHealth -= damage;
            changeHealthBar(stateFirst);
          }
        }
      }

      if (!stateFirst.critical && hitCritical(controls.PlayerOneCriticalHitCombination)) {
        stateSecond.currentHealth -= 2 * stateFirst.fighter.attack;
        changeHealthBar(stateSecond);
        stateFirst.critical = true;
        setTimeout(() => stateFirst.critical = false, 10000)
      }

      if (!stateSecond.critical && hitCritical(controls.PlayerTwoCriticalHitCombination)) {
        stateFirst.currentHealth -= 2 * stateSecond.fighter.attack;
        changeHealthBar(stateFirst);
        stateSecond.critical = true;
        setTimeout(() => stateSecond.critical = false, 10000)
      }
      checkWinner();
    });

    document.addEventListener('keyup', function (e) {
      pressed.delete(e.code);
    });


    function changeHealthBar(defender) {
      let barWidth = defender.currentHealth * 100 / defender.fighter.health;
      if (barWidth < 0) {
        barWidth = 0
      }
      defender.healthBar.style.width = `${barWidth}%`
    }

    function hitCritical(codes) {
      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }
      return true
    }

    function checkWinner() {
      return stateSecond.currentHealth <= 0 ? resolve(firstFighter) : stateFirst.currentHealth <= 0 ? resolve(secondFighter) : null
    }
  });
}

export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  return Math.max(0, hitPower - blockPower);
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}