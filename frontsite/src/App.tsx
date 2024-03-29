import React from 'react';
import * as Calcurate from './view/calculate/index';
import * as Weapon from './view/weapon/index';
import * as Skill from './view/skill/index';
import * as Effect from './view/effect/index';
import * as Calculation from './view/calculation/index';
import * as Phantom from './view/phantom/index';
import { useSelectedPage } from './state/page/selector';

const App = () => {
  const selectedPage = useSelectedPage();
  switch(selectedPage.id)
  {
    case 1:
      return <Calcurate.Index />
    case 2:
      return <Weapon.Index />
    case 3:
      return <Skill.Index />
    case 4:
      return <Effect.Index />
    case 5:
      return <Calculation.Index />
    case 7:
      return <Phantom.Index />
  };

  return <Calcurate.Index />

}

export default App;
