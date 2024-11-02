import { FC } from "react";
import { Tab } from "rizzui";

export type TabItemType = {
  label: string;
  href: string;
};
interface ITopNavProps {
  items: TabItemType[];
}
const TopNav: FC<ITopNavProps> = ({ items }) => {
  return (
    <Tab
      className={
        "text-white bg-dark-card rounded-lg w-fit mx-auto border-none mb-4 lg:mb-8"
      }
    >
      <Tab.List className={"border-none rounded-md text-sm"}>
        {items.map((x) => {
          return (
            <Tab.ListItem
              key={x.label}
              className={"hover:bg-dark-orange hover:text-white font-semibold"}
              activeClassName="text-dark-orange"
            >
              {x.label}
            </Tab.ListItem>
          );
        })}
      </Tab.List>
      {1}
    </Tab>
  );
};
export default TopNav;
