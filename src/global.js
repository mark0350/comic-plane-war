const Global = {
  shootSpeed: 0.2,
  bulletSpeed: 5,
  createEnemySpeed: (type) => {
    switch (type) {
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 5;
      default:
        return 5;

    }
  },
  enemyHp: (type) => {
    switch (type) {
      case 1:
        return 3;
      case 2:
        return 8;
      case 3:
        return 15;
      default:
        return 10;

    }
  },
  enemySpeed: (type) => {
    switch (type) {
      case 1:
        return 3;
      case 2:
        return 2;
      case 3:
        return 1;
      default:
        return 5;
    }
  }
};