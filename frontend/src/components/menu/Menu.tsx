// import React from 'react';
import { menu } from './data';
import MenuItem from './MenuItem';

const Menu = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-2 max-h-[calc(100vh-120px)] py-2">
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            catalog={item.catalog}
            listItems={item.listItems}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
