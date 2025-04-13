import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface MenuItemProps {
  onClick?: () => void;
  catalog: string;
  listItems: Array<{
    isLink: boolean;
    url?: string;
    icon: IconType;
    label: string;
    onClick?: () => void;
  }>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  catalog,
  listItems,
}) => {
  return (
    <div className="w-full flex flex-col items-stretch gap-1">
      <span className="hidden xl:block px-2 text-xs uppercase font-medium text-base-content/70">
        {catalog}
      </span>
      {listItems.map((listItem, index) => {
        if (listItem.isLink) {
          return (
            <NavLink
              key={index}
              onClick={onClick}
              to={listItem.url || ''}
              className={({ isActive }) =>
                isActive
                  ? 'btn h-auto min-h-[40px] 2xl:min-h-[42px] 3xl:min-h-[48px] py-1 btn-active btn-ghost btn-block justify-start'
                  : 'btn h-auto min-h-[40px] 2xl:min-h-[42px] 3xl:min-h-[48px] py-1 btn-ghost btn-block justify-start'
              }
            >
              <listItem.icon className="text-lg xl:text-xl 2xl:text-2xl" />
              <span className="text-xs xl:text-sm 2xl:text-base capitalize">
                {listItem.label}
              </span>
            </NavLink>
          );
        } else {
          return (
            <button
              key={index}
              onClick={listItem.onClick}
              className="btn h-auto min-h-[40px] 2xl:min-h-[42px] 3xl:min-h-[48px] py-1 btn-ghost btn-block justify-start"
            >
              <listItem.icon className="text-lg xl:text-xl 2xl:text-2xl" />
              <span className="text-xs xl:text-sm 2xl:text-base capitalize">
                {listItem.label}
              </span>
            </button>
          );
        }
      })}
    </div>
  );
};

export default MenuItem;
