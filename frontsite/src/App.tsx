import React from 'react';
import * as Calcurate from './view/calcurate/index';
import * as Weapon from './view/weapon/index';
import * as Skill from './view/skill/index';
import * as Effect from './view/effect/index';
import * as EffectLevel from './view/effectlevel/index';
import * as Category from './view/category/index';
import { useSelectedPage } from './state/page/selector';

const App = () => {
  const selectedPage = useSelectedPage();
  console.log(selectedPage)

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
      return <EffectLevel.Index />
    case 6:
      return <Category.Index />
  };

  return <Calcurate.Index />

}

export default App;
